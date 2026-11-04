# Cómo le pusimos ojos a EnrollmentHub

> Versión con formato (diagrama, tablas, tipografía): https://claude.ai/code/artifact/4adc4d3b-5f97-4851-8011-ab08c936774a
> Esta copia en Markdown es la versión versionada en el repo; el contenido es el mismo.

Guía técnica de la instrumentación con Prometheus y Grafana del lab 16: qué se construyó, por qué cada pieza está donde está, y cómo se comprobó que mide algo real.

**Autor:** Daniel · **Fecha:** 2026-08-27 · **Stack:** .NET 10, FastAPI, Prometheus 3.7, Grafana 12.3

## 1. El problema que esto resuelve

Antes de este lab, la única forma de saber si `enrollmenthub-api` o el servicio de `items` en FastAPI estaban lentos, fallando, o recibiendo tráfico raro, era mirar logs sueltos o probar a mano. Eso sirve para depurar un incidente puntual, pero no responde preguntas operativas básicas: ¿cuántas peticiones por segundo recibe `/users`? ¿cuánto tardan? ¿cuántos logins están fallando ahora mismo?

La instrumentación con Prometheus resuelve eso: cada servicio expone sus propios números en un endpoint HTTP plano, un recolector los va guardando cada pocos segundos, y un panel permite mirarlos en el tiempo sin tocar el código de nuevo.

## 2. Cómo funciona el mecanismo

Cuatro piezas, un solo patrón: **pull**, no **push**. Los servicios nunca le mandan nada a nadie; Prometheus es quien va a buscar los datos.

```text
[API .NET :5080/metrics]  --GET cada 5s-->  \
                                              >  [Prometheus :9090] --PromQL--> [Grafana :3001]
[API FastAPI :8001/metrics] --GET cada 5s--> /
```

**Por qué "pull" y no "push":** si la app tuviera que mandar sus métricas a algún lado, un servicio caído sería invisible. Con "pull", si Prometheus deja de poder scrapear un servicio, esa ausencia *es en sí misma* la señal de que algo falla (`up == 0`), en vez de silencio.

## 3. Instrumentar la API .NET

`templates/dotnet10-api` · paquete `prometheus-net.AspNetCore`

1. Se agrega el paquete NuGet: `dotnet add package prometheus-net.AspNetCore --version 8.2.1`.
2. En `Program.cs`, dos líneas activan las métricas HTTP genéricas (duración, tamaño y conteo por endpoint/código):

   ```csharp
   app.UseHttpMetrics();   // antes de auth: así también mide 401/403
   app.UseAuthentication();
   app.UseAuthorization();

   app.MapMetrics();       // expone GET /metrics
   ```

3. El orden de `UseHttpMetrics()` importa: puesto **antes** de `UseAuthentication`, un request que recibe `401` queda igual contado. La mayoría de los tutoriales lo ponen después "porque sí", y esa señal se pierde justo cuando más importa (un pico de 401 suele ser el primer síntoma de un cliente mal configurado o un ataque de fuerza bruta).
4. Encima de eso se agregan dos contadores propios del negocio:

   ```csharp
   var usersCreatedTotal = Metrics.CreateCounter(
       "enrollmenthub_users_created_total",
       "Total de usuarios creados via POST /users.");

   var loginAttemptsTotal = Metrics.CreateCounter(
       "enrollmenthub_login_attempts_total",
       "Intentos de login por resultado.",
       new CounterConfiguration { LabelNames = new[] { "result" } });
   ```

   incrementados en el lugar exacto del dominio: `usersCreatedTotal.Inc()` tras un alta exitosa, `loginAttemptsTotal.WithLabels("success"|"failure").Inc()` en cada intento de login.

## 4. Instrumentar la API FastAPI

`templates/fastapi` · paquete `prometheus-fastapi-instrumentator`

1. Se agrega la dependencia a `requirements.txt`: `prometheus-fastapi-instrumentator==8.1.0`.
2. En `src/app.py`, el equivalente Python es una línea encadenada:

   ```python
   Instrumentator().instrument(app).expose(
       app, endpoint="/metrics", include_in_schema=False
   )

   items_created_total = Counter(
       "enrollmenthub_items_created_total",
       "Total de items creados via POST /items.",
   )
   ```

3. Igual que del lado .NET, la métrica de negocio se incrementa en el punto exacto: `items_created_total.inc()` justo después de guardar el item nuevo en `POST /items`.

**Por qué dos stacks, no uno:** el lab solo pedía instrumentar "el backend". Se hicieron los dos a propósito: demuestra que el patrón (exponer `/metrics`, contadores de negocio, mismo formato de datos) es igual de válido en .NET que en Python — no es un truco de una librería, es una convención que cualquier stack puede hablar.

## 5. Configurar Prometheus

`observabilidad/prometheus-grafana/prometheus.yml`

```yaml
scrape_configs:
  - job_name: "dotnet-api"
    metrics_path: /metrics
    static_configs:
      - targets: ["host.docker.internal:5080"]

  - job_name: "fastapi"
    metrics_path: /metrics
    static_configs:
      - targets: ["host.docker.internal:8001"]
```

**El obstáculo real de esta parte:** Prometheus corre *dentro* de un contenedor Docker, pero las APIs corren en el host. `host.docker.internal` normalmente resuelve solo con Docker Desktop, pero en esta máquina no lo hacía por defecto y los dos targets quedaban `down`. Solución: declarar el mapeo a mano en el compose:

```yaml
prometheus:
  extra_hosts:
    - "host.docker.internal:host-gateway"
```

## 6. Crear el dashboard en Grafana

Sin navegador disponible en esta sesión, todo el dashboard se armó y verificó por API HTTP.

1. Registrar Prometheus como fuente de datos: `POST /api/datasources` con `{"name":"Prometheus","type":"prometheus","url":"http://prometheus:9090","access":"proxy"}`.
2. Publicar el dashboard (8 paneles — requests/seg, latencia p95 y métricas de negocio para cada API): `POST /api/dashboards/db` con el JSON del dashboard.
3. Confirmar que lee datos reales consultando la misma métrica *a través del proxy de Grafana* (el camino exacto que usa cada panel al dibujarse): `GET /api/datasources/proxy/uid/<uid>/api/v1/query?query=enrollmenthub_users_created_total` → devolvió `8`, igual que la consulta directa a Prometheus.

## 7. Qué pregunta responde cada métrica

**Genéricas HTTP** (vienen con la librería, mismo concepto en ambos stacks):

| Métrica | Tipo | Qué responde |
|---|---|---|
| `http_request_duration_seconds` | histograma | ¿Cuánto tarda cada endpoint? (p50/p95/p99 por ruta) |
| `http_requests_received_total` (.NET) | counter | Cuántas peticiones llegaron, por endpoint y código |
| `http_requests_total` (FastAPI) | counter | Equivalente Python, por `handler` y `status` |

**De negocio** (escritas para este dominio):

| Métrica | Qué responde |
|---|---|
| `enrollmenthub_users_created_total` | Altas de usuario reales — señal de producto, no de infra |
| `enrollmenthub_login_attempts_total{result}` | Un salto sostenido en `result="failure"` es la primera pista de fuerza bruta o un cliente roto, sin grepear logs |
| `enrollmenthub_items_created_total` | Altas de items en el catálogo de FastAPI |

## 8. Cómo se comprobó que no es humo

Se generó tráfico real y controlado, con éxitos y errores a propósito, y se comparó el número esperado contra el que realmente aparece en Prometheus:

| Acción | Veces | Métrica | Valor real |
|---|---|---|---|
| `GET /health` (.NET) | 20 | `http_requests_received_total{endpoint="/health"}` | 21 (+1 scrape) |
| `POST /users` exitoso | 8 | `enrollmenthub_users_created_total` | 8 |
| `GET /users/999999` (404) | 6 | `http_requests_received_total{code="404"}` | 6 |
| Login con password incorrecta | 5 | `enrollmenthub_login_attempts_total{result="failure"}` | 5 |
| `POST /items` exitoso (FastAPI) | 8 | `enrollmenthub_items_created_total` | 8 |

El dato de `enrollmenthub_users_created_total = 8` se contrastó además contra la base de datos directamente (`SELECT count(*) FROM "Users" WHERE "Email" LIKE 'lab16-user-%'` → **8**) — tres caminos distintos (carga generada, Prometheus, Postgres) dando el mismo número.

## 9. Correrlo vos mismo

```bash
# 1. Postgres compartido
docker start infra-postgres-1

# 2. Las dos APIs, cada una en su puerto
cd templates/dotnet10-api/src
ASPNETCORE_URLS="http://localhost:5080" dotnet run

cd templates/fastapi
DATABASE_URL="postgresql+psycopg://postgres:example@localhost:5432/enrollmenthub" \
  python -m uvicorn src.app:app --port 8001

# 3. El stack de observabilidad
cd observabilidad/prometheus-grafana
docker compose up -d
# Prometheus: http://localhost:9090
# Grafana:    http://localhost:3001  (admin / admin)
```

El dashboard `lab16-globaledb` queda guardado en el volumen de Grafana; no hace falta recrearlo a mano si el contenedor no se borró (`docker compose stop`, no `down -v`).

## 10. Límites y qué falta

- **Sin verificación visual real:** esta sesión no tuvo navegador disponible. Los 8 paneles se comprobaron por API (Grafana → Prometheus → valor real), pero nadie los vio renderizados todavía. Es el primer paso pendiente.
- **Buckets de latencia por defecto:** el histograma usa los rangos de fábrica de cada librería, no unos pensados para los SLO reales de EnrollmentHub.
- **Sin alertas:** hay dashboard, no reglas de alerta. Ver un gráfico rojo todavía depende de que alguien lo esté mirando.
- **`/metrics` sin autenticar:** correcto para scrapeo interno; si la API se expone a internet, hay que restringir el acceso por red, no por login de aplicación.

---
Evidencia completa de ejecución: [EVIDENCIAS.md](EVIDENCIAS.md)

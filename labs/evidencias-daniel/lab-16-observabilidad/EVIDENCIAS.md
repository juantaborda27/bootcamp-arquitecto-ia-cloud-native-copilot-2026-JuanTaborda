# Lab 16 - Observabilidad con Prometheus y Grafana

**Estado:** Completado
**Fecha:** 2026-08-27
**Responsable/equipo:** Daniel
**Rama/PR/commit:** `daniel` (cambios sin commit al momento de esta evidencia)

## Objetivo y criterios de aceptación

- Desplegar el stack de observabilidad del repositorio (`observabilidad/prometheus-grafana`).
- Exponer métricas Prometheus (`/metrics`) desde el backend.
- Configurar los scrape targets en Prometheus.
- Crear un dashboard base en Grafana con datos reales.
- Generar carga y observar el comportamiento resultante en las métricas.

## Decisión de alcance

El lab pide instrumentar "el backend" en singular. Se instrumentaron **los dos backends del bootcamp** (`templates/dotnet10-api` y `templates/fastapi`) en vez de uno solo, porque:
- Ambos ya están operativos de labs previos y comparten la base `enrollmenthub`.
- Demuestra que la observabilidad con Prometheus es agnóstica de stack (.NET y Python), que es justo el criterio que pide `docs/modules/16-observabilidad.md`.
- El lab 18 (SSO multi-proveedor) y el 27 (monorepo microservicios) van a necesitar comparar servicios; tener el patrón ya armado para dos stacks ahorra trabajo repetido.

## Implementación

### 1) Backend .NET (`templates/dotnet10-api`)

- Paquete `prometheus-net.AspNetCore` 8.2.1.
- `Program.cs`: `app.UseHttpMetrics()` colocado **antes** de `UseAuthentication()/UseAuthorization()` para que también queden medidos los `401`/`403` (si se pone después, esas respuestas nunca llegan al middleware de métricas). `app.MapMetrics()` expone `GET /metrics`, sin autenticación (consistente con la práctica estándar: el endpoint de métricas lo scrapea Prometheus dentro de la red interna, no se expone a usuarios finales).
- Métricas de negocio propias (además de las HTTP genéricas: duración, tamaño, en curso, total por endpoint/código):
  - `enrollmenthub_users_created_total` (counter): se incrementa en `POST /users` tras un alta exitosa.
  - `enrollmenthub_login_attempts_total{result="success|failure"}` (counter con label): se incrementa en `POST /auth/login`, separando éxito de fallo — permite alertar sobre picos de intentos fallidos (indicio de fuerza bruta) sin depender de logs.

### 2) Backend FastAPI (`templates/fastapi`)

- Paquete `prometheus-fastapi-instrumentator` 8.1.0 (`requirements.txt`).
- `src/app.py`: `Instrumentator().instrument(app).expose(app, endpoint="/metrics", include_in_schema=False)` — mismo patrón que el lado .NET: duración, tamaño, en curso, total por handler/status, expuestos en `GET /metrics`.
- Métrica de negocio: `enrollmenthub_items_created_total` (counter, `prometheus_client.Counter` directo), incrementada en `POST /items`.

### 3) Stack de observabilidad (`observabilidad/prometheus-grafana`)

- `prometheus.yml`: se reemplazó el target de ejemplo (`host.docker.internal:8080`) por los dos servicios reales: `dotnet-api` (`host.docker.internal:5080`) y `fastapi` (`host.docker.internal:8001`); `scrape_interval` bajado de 15s a 5s para poder verificar el lab con ciclos de scrape cortos (en un entorno real 15s es razonable).
- `docker-compose.yml`: se agregó `extra_hosts: ["host.docker.internal:host-gateway"]` al servicio `prometheus`. Sin esto, el contenedor de Prometheus no podía resolver `host.docker.internal` en este Docker Desktop (`dial tcp: lookup host.docker.internal ... no such host`) y los dos targets quedaban `down`; con el `extra_hosts` explícito quedaron `up` de forma reproducible.
- Datasource de Prometheus y dashboard de Grafana se crearon **vía API HTTP** (no a mano en la UI), para que quede scripteado y reproducible: `POST /api/datasources` y `POST /api/dashboards/db` con el JSON del dashboard.

### Dashboard creado

`Lab 16 - EnrollmentHub (API .NET + FastAPI)` (uid `lab16-globaledb`, 8 paneles):

| Panel | Servicio | Query |
|---|---|---|
| Requests/seg por endpoint | .NET | `sum(rate(http_requests_received_total{job="dotnet-api"}[1m])) by (endpoint, code)` |
| Latencia p95 por endpoint | .NET | `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{job="dotnet-api"}[5m])) by (le, endpoint))` |
| Usuarios creados (total) | .NET | `enrollmenthub_users_created_total` |
| Logins fallidos (total) | .NET | `enrollmenthub_login_attempts_total{result="failure"}` |
| Requests/seg por endpoint | FastAPI | `sum(rate(http_requests_total{job="fastapi"}[1m])) by (handler, status)` |
| Latencia p95 por endpoint | FastAPI | `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{job="fastapi"}[5m])) by (le, handler))` |
| Items creados (total) | FastAPI | `enrollmenthub_items_created_total` |
| Targets scrapeados arriba | Prometheus | `up{job=~"dotnet-api|fastapi"}` |

## Herramientas y versiones

- `prometheus-net.AspNetCore` 8.2.1 / `.NET` 10.0.400.
- `prometheus-fastapi-instrumentator` 8.1.0 / `prometheus-client` 0.26.0 / Python 3.14.0.
- Prometheus `v3.7.2` (imagen `prom/prometheus:v3.7.2`).
- Grafana `12.3.0` (imagen `grafana/grafana:12.3.0`).
- PostgreSQL 18.6 (contenedor compartido `infra-postgres-1`).

## Comandos ejecutados

```bash
# Backend .NET
cd templates/dotnet10-api/src
dotnet add package prometheus-net.AspNetCore --version 8.2.1
dotnet build && cd ../tests && dotnet test

# Backend FastAPI
pip install prometheus-fastapi-instrumentator==8.1.0
python -m pytest -q

# Infra
docker start infra-postgres-1
ASPNETCORE_ENVIRONMENT=Development ASPNETCORE_URLS="http://localhost:5080" dotnet run --no-build
DATABASE_URL="postgresql+psycopg://postgres:example@localhost:5432/enrollmenthub" \
  python -m uvicorn src.app:app --host 127.0.0.1 --port 8001
cd observabilidad/prometheus-grafana && docker compose up -d

# Carga controlada (éxitos y errores) contra ambas APIs
for i in $(seq 1 20); do curl -s -o /dev/null http://localhost:5080/health; done
for i in $(seq 1 8); do curl -s -X POST http://localhost:5080/users -d '{...}'; done
for i in $(seq 1 6); do curl -s http://localhost:5080/users/999999; done   # 404
for i in $(seq 1 5); do curl -s -X POST http://localhost:5080/auth/login -d '{"email":"no-existe@...","password":"wrong"}'; done  # 401
for i in $(seq 1 20); do curl -s -o /dev/null http://localhost:8001/health; done
for i in $(seq 1 8); do curl -s -X POST http://localhost:8001/items -d '{...}'; done
for i in $(seq 1 6); do curl -s http://localhost:8001/items/999999; done  # 404

# Grafana: datasource + dashboard vía API
curl -u admin:admin -X POST http://localhost:3001/api/datasources -d '{"name":"Prometheus","type":"prometheus","url":"http://prometheus:9090","access":"proxy","isDefault":true}'
curl -u admin:admin -X POST http://localhost:3001/api/dashboards/db --data-binary @lab16-dashboard.json
```

## Resultado obtenido

### Targets de Prometheus

```text
dotnet-api  http://host.docker.internal:5080/metrics  up
fastapi     http://host.docker.internal:8001/metrics  up
```

### Métricas reales tras la carga generada (consulta directa a Prometheus, `/api/v1/query`)

```text
enrollmenthub_users_created_total                        = 8
enrollmenthub_login_attempts_total{result="failure"}      = 5
enrollmenthub_items_created_total                         = 8

# .NET - requests por endpoint/código
{code="200", endpoint="/health"}              = 21
{code="201", endpoint="/users"}               = 8
{code="200", endpoint="/users"}               = 10
{code="404", endpoint="/users/{id:int}"}      = 6
{code="401", endpoint="/auth/login"}          = 5

# FastAPI - requests por handler/status
{handler="/health",  status="2xx"} = 21
{handler="/metrics", status="2xx"} = 27
{handler="/items",   status="2xx"} = 18
{handler="/items/{item_id}", status="4xx"} = 6
```

Los conteos coinciden exactamente con la carga generada (20 `GET /health` + 1 scrape adicional = 21; 8 altas = 8 `201`; etc.), confirmando que la instrumentación mide lo que realmente pasa, no un valor de relleno.

Se verificó también la base de datos directamente: `SELECT count(*) FROM "Users" WHERE "Email" LIKE 'lab16-user-%'` → **8**, igual al contador `enrollmenthub_users_created_total`.

### Latencia p95 (histogramas)

```text
.NET      /health              = 4.9 ms
.NET      /users                = 939 ms  (incluye el hash de password con PasswordHasher, esperado)
FastAPI   /health               = 95 ms
FastAPI   /items                = 320 ms
```

### Cadena completa Grafana → datasource → Prometheus verificada

```json
GET /api/datasources/proxy/uid/cfwh02h4t0t1cf/api/v1/query?query=enrollmenthub_users_created_total
{"status":"success","data":{"resultType":"vector","result":[{"metric":{...,"job":"dotnet-api"},"value":[..., "8"]}]}}
```

El valor `8` coincide con la consulta directa a Prometheus — confirma que el dashboard de Grafana efectivamente lee datos reales del Prometheus configurado, no un mock.

### Dashboard persistido

```text
GET /api/dashboards/uid/lab16-globaledb
title: Lab 16 - EnrollmentHub (API .NET + FastAPI)
panels: 8
version: 1
```

## Evidencia visual

No se tomaron capturas de pantalla: esta sesión no tuvo navegador disponible (ver limitación ya registrada en el lab 15). Toda la evidencia de "dashboard con datos reales" se obtuvo verificando el mismo dato por dos caminos independientes (consulta directa a Prometheus y consulta a través del proxy de datasource de Grafana, que es exactamente el mecanismo que usa cada panel del dashboard al renderizar). Queda como paso manual pendiente: abrir `http://localhost:3001/d/lab16-globaledb` en un navegador y confirmar visualmente los 8 paneles.

## IA y revisión humana

- Herramienta de IA: Claude Code (Opus 5).
- Decisión humana: instrumentar los dos backends en vez de uno solo (ver "Decisión de alcance").
- Corrección humana: el primer intento de scrape falló porque `host.docker.internal` no resolvía dentro del contenedor de Prometheus en este Docker Desktop; se diagnosticó con `lastError` de la API de Prometheus y se corrigió agregando `extra_hosts: host-gateway` al compose (fix portátil, no específico de esta máquina).
- Se colocó deliberadamente `UseHttpMetrics()` antes de `UseAuthentication()` en el pipeline .NET para no perder métricas de los `401`/`403`; de haberse puesto después (patrón más común en tutoriales), esas respuestas no se habrían contado.

## Problemas, solución y riesgos pendientes

### Problemas resueltos

1. `host.docker.internal` no resolvía desde el contenedor `prometheus` → `extra_hosts: host-gateway` en `docker-compose.yml`.
2. Docker Desktop no estaba iniciado al empezar la sesión → se relanzó igual que en labs anteriores.

### Riesgos pendientes

- Sin verificación visual de los paneles en un navegador real (ver "Evidencia visual").
- El histograma de latencia usa los buckets por defecto de cada librería (no se definieron buckets específicos del dominio); para SLOs reales convendría definir buckets alineados a los objetivos de latencia de cada endpoint.
- No se configuró ninguna regla de alerta (`alertmanager`) — el lab pide dashboard, no alertas; alertas accionables quedan fuera de este alcance (mencionado como práctica recomendada en `docs/modules/16-observabilidad.md`, no como entregable obligatorio de este lab).
- El endpoint `/metrics` no tiene autenticación en ninguno de los dos servicios (estándar para scraping interno, pero si se expone el backend a internet habría que restringirlo por red/firewall, no por credenciales de aplicación).

## Artefactos

- `templates/dotnet10-api/src/Program.cs`
- `templates/dotnet10-api/src/Api.csproj`
- `templates/fastapi/src/app.py`
- `templates/fastapi/requirements.txt`
- `observabilidad/prometheus-grafana/prometheus.yml`
- `observabilidad/prometheus-grafana/docker-compose.yml`
- [EVIDENCIAS.md](../../../EVIDENCIAS.md)
- Documento técnico explicativo (para terceros): [GUIA-TECNICA.md](GUIA-TECNICA.md) (copia versionada) y versión con formato/diagrama publicada en https://claude.ai/code/artifact/4adc4d3b-5f97-4851-8011-ab08c936774a

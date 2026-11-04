# Evidencia Lab 16 - Observabilidad con Prometheus y Grafana

**Fecha:** 2026-08-25  
**Rama:** `Diego-Tique`  
**Objetivo:** Obtener visibilidad operativa completa de la aplicación mediante la instrumentación de métricas de arquitectura RED (Requests, Errors, Duration), recolección periódica en Prometheus y visualización ejecutiva en dashboards de Grafana.

---

## 1. Despliegue del Stack de Observabilidad en Docker Desktop (Windows PowerShell)

Comandos ejecutados para iniciar los contenedores de Prometheus y Grafana:

```powershell
# 1. Iniciar el contenedor de Prometheus (Scraping de métricas en puerto 9090):
docker run -d -p 9090:9090 --name prometheus -v "${PWD}\infra\observability\prometheus.yml:/etc/prometheus/prometheus.yml" prom/prometheus

# 2. Iniciar el contenedor de Grafana (Visualización e interfaz web en puerto 3000):
docker run -d -p 3000:3000 --name grafana grafana/grafana
```

- **Prometheus UI:** `http://localhost:9090`
- **Grafana UI:** `http://localhost:3000` (Credenciales por defecto: `admin` / `admin`)

---

## 2. Instrumentación de Métricas en Backend (`/metrics`)

- **Endpoint expuesto:** `http://localhost:8000/metrics`
- **Métricas exportadas en formato estándar de Prometheus:**
  - `http_requests_total`: Contador acumulado de peticiones etiquetado por método HTTP, manejador y código de estado.
  - `http_request_duration_seconds`: Histograma de distribución de latencia y tiempos de respuesta.

---

## 3. Configuración de Prometheus Scrape Target (`infra/observability/prometheus.yml`)

```yaml
scrape_configs:
  - job_name: "enrollmenthub-fastapi"
    static_configs:
      - targets: ["localhost:8000"]
    metrics_path: "/metrics"
```

- **Frecuencia de scraping:** Cada 15 segundos.

---

## 4. Dashboard Declarativo de Grafana (`infra/observability/grafana-dashboard.json`)

- **UID:** `enrollmenthub-red-metrics`
- **Paneles RED configurados:**
  1. **Tasa de Peticiones HTTP (RPS):** `rate(http_requests_total[1m])`
  2. **Latencia Promedio en ms:** `rate(http_request_duration_seconds_sum[1m]) / rate(http_request_duration_seconds_count[1m]) * 1000`
  3. **Tasa de Errores (HTTP 4xx/5xx):** `sum(http_requests_total{status=~"4..|5.."})`

---

## 5. Conclusión
El sistema cuenta con telemetría unificada en tiempo real, permitiendo detectar cuellos de botella de latencia y picos de errores HTTP antes de que impacten la experiencia de los usuarios.

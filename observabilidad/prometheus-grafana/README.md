# Observabilidad mínima

Uso rápido (Opción 2, local con Docker):
```bash
cd observabilidad/prometheus-grafana
docker compose up -d
```
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (usuario `admin`, password `admin`)

Edita `prometheus.yml` para apuntar el `target` a donde expongas `/metrics` en tu backend (Lab 16).

Opciones para el Lab 16:
- Opción 1: `kube-prometheus-stack` (Helm) si ya desplegaste en K8s (Lab 09).
- Opción 2: Prometheus + Grafana con el `docker-compose.yml` de esta carpeta (más simple para empezar).
- En ambos casos, añade el `ServiceMonitor` o el scrape config para tu endpoint `/metrics`.

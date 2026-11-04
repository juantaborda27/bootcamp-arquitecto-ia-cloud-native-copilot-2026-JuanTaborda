# Módulo 16 - Observabilidad y operación

## Objetivo

Instrumentar servicios y clientes para diagnosticar comportamiento mediante métricas, logs y correlación, no solo visualizar dashboards.

## Capacidades

- Métricas de latencia, errores, throughput y saturación.
- Logs estructurados con `correlationId` y sin secretos.
- Health/readiness checks separados de métricas de negocio.
- Prometheus 3.7 y Grafana 12.3 como stack local de referencia.
- Alertas vinculadas a síntomas y SLO, no a ruido de infraestructura.

## Flujo recomendado

1. Definir qué pregunta operativa debe responder cada señal.
2. Instrumentar un flujo E2E.
3. Generar carga controlada y capturar baseline.
4. Crear dashboard y una alerta accionable.
5. Documentar diagnóstico y limitaciones de la señal.

**Ver `labs/16-observabilidad.md` y `observabilidad/prometheus-grafana/README.md`.**

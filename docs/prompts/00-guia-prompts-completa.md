# Guía de prompts portables para IA de desarrollo

## Objetivo
Estandarizar el uso verificable de GitHub Copilot, Claude Code u otra IA aprobada por Global EDB, distinguiendo prompts didácticos de instrucciones y Agent Skills ejecutables.

## Capa operativa obligatoria

Antes de copiar una plantilla de esta carpeta:

1. Confirma que el agente cargó `AGENTS.md` o la instrucción equivalente.
2. Inicia la historia con `/globaledb-implement-story`.
3. Usa el prompt temático de esta guía como contexto especializado, no como sustituto del skill.
4. Cierra con `/globaledb-review-change`.
5. Para elecciones de arquitectura, ejecuta `/globaledb-create-adr`.

Los prompts invocables de VS Code están en `.github/prompts/`; los procedimientos canónicos portables están en `.claude/skills/`.

Cada skill contiene `evals/evals.json`. Antes de cambiar sus instrucciones, compara al menos un caso con skill y sin skill en sesiones limpias y registra assertions, duración y consumo. No se aprueba un skill solo porque fue invocado.

## Como usar esta guia
1. Abre Copilot Chat o Claude Code en VS Code para el laboratorio actual.
2. Copia la plantilla del prompt correspondiente.
3. Ajusta nombres de carpetas, puertos y recursos.
4. Pide siempre salida en markdown con checklist verificable.
5. Guarda en evidencias el prompt final y su resultado.

## Mapa rapido por laboratorio
- Labs 01-02: `copilot-general.md`
- Lab 03: `copilot-dotnet.md`
- Lab 04: `copilot-fastapi.md`
- Lab 05: `copilot-next.md`
- Lab 06: `copilot-angular.md`
- Labs 07-11: `copilot-ci-k8s.md`, `ci-k8s-oidc-data.md`
- Labs 12-18: `ci-k8s-oidc-data.md`, `oidc-nextauth-dotnet.md`
- Lab 19: `nestjs11.md`
- Lab 20: `ai-agents-semantic-kernel.md`
- Lab 21: `ai-agents-langgraph.md`
- Lab 22: `mobile-reactnative-expo.md`
- Lab 23: `mobile-kotlin-swift.md`
- Labs 24-25: `mensajeria-eventos.md`
- Lab 26: `api-management.md`
- Lab 27: `nestjs11.md`, `copilot-next.md`, `copilot-ci-k8s.md`
- Lab 28: `nestjs11.md`, `ci-k8s-oidc-data.md`
- Lab 99: `proyecto-integrador-e2e.md`

## Tabla oficial: Lab -> Prompt -> Evidencia minima

| Lab | Prompt exacto recomendado | Evidencia minima requerida |
|---|---|---|
| 01-ia-desarrollo | `copilot-general.md` | Comparación de herramientas + pruebas + ajuste manual aplicado |
| 02-codespaces | `copilot-general.md` | Entorno levantado + validacion de herramientas |
| 03-dotnet10-api | `copilot-dotnet.md` | Endpoints CRUD + auth JWT + pruebas |
| 04-fastapi | `copilot-fastapi.md` | Endpoints funcionales + OpenAPI + pruebas |
| 05-next16 | `copilot-next.md` | UI conectada a backend + manejo de errores |
| 06-angular22 | `copilot-angular.md` | Componentes/servicios + consumo API + validaciones |
| 07-docker-ghcr | `copilot-ci-k8s.md` | Dockerfile funcionando + imagen publicada |
| 08-actions | `copilot-ci-k8s.md`, `ci-k8s-oidc-data.md` | Workflow CI/release en verde |
| 09-k8s-helm | `copilot-ci-k8s.md`, `ci-k8s-oidc-data.md` | Deploy en cluster + health checks |
| 10-argocd | `copilot-ci-k8s.md` | App Synced/Healthy en Argo CD |
| 11-oidc | `ci-k8s-oidc-data.md`, `oidc-nextauth-dotnet.md` | Login + autorizacion por rol |
| 12-data-at-scale | `ci-k8s-oidc-data.md` | Baseline vs mejora documentada |
| 13-efcore-migrations | `copilot-dotnet.md` | Migraciones creadas y aplicadas |
| 14-alembic-fastapi | `copilot-fastapi.md` | Revisiones/upgrade reproducibles |
| 15-nextauth-oidc | `oidc-nextauth-dotnet.md`, `copilot-next.md` | Sesion OIDC + rutas protegidas |
| 16-observabilidad | `observabilidad.md` | Dashboard con metricas reales |
| 17-reusables-environments | `copilot-ci-k8s.md` | Reusable workflows + entornos |
| 18-sso-oidc-entra-google-keycloak | `oidc-nextauth-dotnet.md`, `ci-k8s-oidc-data.md` | SSO multi-proveedor validado |
| 19-nestjs-api | `nestjs11.md` | CRUD + JWT + tests + contenedor |
| 20-ai-agents-microsoft | `ai-agents-semantic-kernel.md` | Endpoint agente + logs de tool calling |
| 21-ai-agents-langgraph | `ai-agents-langgraph.md` | Grafo funcional + endpoint operativo |
| 22-mobile-reactnative | `mobile-reactnative-expo.md` | Login OIDC + consumo API en emulador |
| 23-mobile-native-kotlin-swift | `mobile-kotlin-swift.md` | App Android conectada a backend |
| 24-mensajeria-redis-azure-queue | `mensajeria-eventos.md` | Productor/consumidor + retry/idempotencia |
| 25-kafka-event-streaming | `mensajeria-eventos.md` | Topic + producer/consumer + trazabilidad |
| 26-azure-apim | `api-management.md` | APIs publicadas + politicas activas |
| 27-nx-monorepo-microservicios | `nestjs11.md`, `copilot-next.md`, `copilot-ci-k8s.md` | Grafo + límites + historia E2E + affected |
| 28-oracle-xe-nestjs | `nestjs11.md`, `ci-k8s-oidc-data.md` | Migraciones + pruebas + medición + ADR |
| azdo-01-repos-policies | `copilot-general.md` | Politicas de rama/PR configuradas |
| azdo-02-pipelines-ci | `copilot-ci-k8s.md` | Pipeline CI ejecutando correctamente |
| azdo-03-acr-images | `copilot-ci-k8s.md` | Imagen publicada en ACR |
| azdo-04-cd-k8s-approvals | `copilot-ci-k8s.md` | CD con aprobaciones por ambiente |
| azdo-05-boards-traceability | `copilot-general.md` | Trazabilidad Work Item -> PR -> Deploy |
| 99-proyecto-integrador | `proyecto-integrador-e2e.md` | Flujo E2E completo + evidencia integral |

## Cuando usar prompts (regla simple)
1. En cada modulo/lab: usa primero el prompt del tema.
2. Al cerrar cada bloque: usa prompt de hardening/revision para consolidar calidad.
3. En el Lab 99: usa prompts de arquitectura final, checklist de cierre y demo final.

## Flujo estandar por laboratorio
1. Invoca `/globaledb-implement-story` con el objetivo del lab.
2. Selecciona el prompt temático de la tabla y adapta solo el contexto necesario.
3. Ejecuta cambios y validaciones técnicas.
4. Invoca `/globaledb-review-change` y resuelve hallazgos válidos.
5. Guarda en `EVIDENCIAS.md` skill, prompt, ajuste humano y resultados.
6. Si el resultado no es verificable, corrige código o prueba; reformular el prompt por sí solo no cierra el gap.

## Convencion de calidad para todos los prompts
Incluye siempre estas lineas al final del prompt:

```text
Return:
1) Changes by file
2) Commands to run
3) Validation checklist
4) Risks and next steps
```

## Regla de oro del curso
Si una respuesta de IA no está respaldada por validación técnica ejecutada y revisión humana, no se considera terminada.

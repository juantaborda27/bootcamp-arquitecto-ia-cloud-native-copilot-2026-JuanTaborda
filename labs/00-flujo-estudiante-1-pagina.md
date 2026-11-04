# Flujo Estudiante 1 Pagina (Resumen Operativo)

## Objetivo
Ejecutar el bootcamp con una rutina semanal simple:
1. Hacer labs en orden.
2. Usar el prompt correcto en cada bloque.
3. Subir evidencia diaria verificable.

## Regla diaria (siempre)
1. Revisar el lab del dia.
2. Usar el prompt indicado.
3. Ejecutar y validar.
4. Registrar evidencia en `EVIDENCIAS.md`.
5. Hacer commit del avance.

## Semana 1 - Core del producto

| Dia | Labs | Prompt recomendado | Evidencia minima del dia |
|---|---|---|---|
| 1 | `00-setup-y-ruta.md`, `01-copilot.md`, `02-codespaces.md` | `copilot-general.md` | Copilot o Claude Code listo, comparación y entorno validados |
| 2 | `03-dotnet10-api.md`, `04-fastapi.md` | `dotnet10.md`, `copilot-dotnet.md`, `fastapi.md`, `copilot-fastapi.md` | APIs corriendo, endpoints probados, pruebas basicas en verde |
| 3 | `05-next16.md`, `06-angular22.md` | `next16-react19.md`, `copilot-next.md`, `angular22.md`, `copilot-angular.md` | Frontend conectado a backend con manejo de errores |
| 4 | `07-docker-ghcr.md`, `08-actions.md` | `copilot-ci-k8s.md`, `ci-k8s-oidc-data.md` | Imagen publicada y pipeline CI/release exitoso |
| 5 | `09-k8s-helm.md`, `10-argocd.md` | `copilot-ci-k8s.md` | Deploy en K8s y Argo CD Synced/Healthy |

## Semana 2 - Seguridad y operacion

| Dia | Labs | Prompt recomendado | Evidencia minima del dia |
|---|---|---|---|
| 6 | `11-oidc.md`, `15-nextauth-oidc.md`, `18-sso-oidc-entra-google-keycloak.md` | `oidc-nextauth-dotnet.md`, `ci-k8s-oidc-data.md` | Login/SSO funcionando y control de roles validado |
| 7 | `12-data-at-scale.md`, `13-efcore-migrations.md`, `14-alembic-fastapi.md` | `ci-k8s-oidc-data.md`, `dotnet10.md`, `fastapi.md` | Migraciones aplicadas + medicion antes/despues |
| 8 | `16-observabilidad.md`, `17-reusables-environments.md` | `observabilidad.md`, `copilot-ci-k8s.md` | Dashboard con metricas reales + reusable workflows |

## Semana 3 - Capacidades avanzadas y cierre

| Dia | Labs | Prompt recomendado | Evidencia minima del dia |
|---|---|---|---|
| 9 | `19-nestjs-api.md`, un lab de agentes (20 o 21) | `nestjs11.md`, prompt del agente elegido | API Nest + un agente evaluado con tool calling real |
| 10 | `22-mobile-reactnative.md`, `27-nx-monorepo-microservicios.md` | `mobile-reactnative-expo.md`, `nestjs11.md`, `copilot-next.md` | React Native + historia vertical en Nx |
| 11 | Una especialización: 23, 24-26 o 28 | Prompt del área elegida | Capacidad especializada con ADR y pruebas |
| 12-14 | `99-proyecto-integrador.md` | `proyecto-integrador-e2e.md` | Núcleo E2E completo + especialización |

## Entregables minimos por dia
1. `EVIDENCIAS.md` actualizado.
2. Captura o log de validacion tecnica.
3. Comandos ejecutados.
4. Problema encontrado y solucion aplicada (si hubo).
5. Commit en rama del lab.

## Verificacion final (antes de presentar)
1. Ejecutar autoevaluacion con `labs/99-rubrica-evaluacion-instructor.md`.
2. Corregir gaps criticos.
3. Preparar demo final con `docs/prompts/proyecto-integrador-e2e.md`.

## Referencias clave
1. Tabla completa Lab -> Prompt -> Evidencia: `docs/prompts/00-guia-prompts-completa.md`.
2. Ruta detallada por escenario: `labs/00-ruta-ejecucion-dia-a-dia.md`.
3. Integrador obligatorio: `labs/99-proyecto-integrador.md`.

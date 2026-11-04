# Global EDB | Bootcamp de Arquitectura e Ingeniería de Software con IA (2026)

Programa profesional de formación técnica de **[Global EDB](https://www.globaledb.com/)** para desarrolladores fullstack con experiencia heterogénea que necesitan ampliar su dominio de arquitectura, IA y entrega cloud native para incorporarse con rapidez a proyectos reales.

No es un curso de iniciación a la programación. Requiere experiencia construyendo aplicaciones web y nociones de frontend, backend, APIs, Git, SQL y contenedores. Los diagnósticos iniciales permiten asignar refuerzo o retos de profundización sin reducir el nivel común.

> La IA acelera el trabajo; la responsabilidad sobre diseño, seguridad, pruebas y operación permanece en el ingeniero.

## Empieza aquí

Este `README.md` es la **puerta de entrada canónica**. Los demás documentos tienen responsabilidades distintas y no deben competir como rutas alternativas:

1. Lee el [plan maestro](docs/modules/00-plan-del-curso.md) para conocer perfil, alcance y evaluación.
2. Completa el [setup detallado](labs/00-setup-y-ruta.md) o el [checklist express](labs/00-checklist-30min.md).
3. Elige una ruta de plataforma y las especializaciones con tu líder o instructor.
4. Ejecuta los laboratorios según la [guía operacional](labs/README.md).
5. Registra comandos y resultados reales en [EVIDENCIAS.md](EVIDENCIAS.md).
6. Cierra con el [proyecto integrador](labs/99-proyecto-integrador.md) y su [rúbrica](labs/99-rubrica-evaluacion-instructor.md).

Para planificación temporal usa una sola vista: [ruta detallada por días](labs/00-ruta-ejecucion-dia-a-dia.md) o [resumen de una página](labs/00-flujo-estudiante-1-pagina.md).

## IA: Copilot o Claude Code

**Claude Code no es requisito para construir ni completar el bootcamp.** GitHub Copilot en VS Code puede ejecutar la ruta completa, incluidos los Agent Skills de `.claude/skills/` y los prompts de `.github/prompts/`.

- Si ya tienes GitHub Copilot, úsalo como herramienta principal; no necesitas comprar Claude Code.
- Si tienes Claude Code, puedes usarlo como alternativa para flujos agénticos de terminal y comparar resultados.
- Si no tienes acceso a la segunda herramienta, la comparación del Lab 01 se realiza con sesiones nuevas, modos/modelos disponibles o una línea base manual; no se penaliza no adquirir otra licencia.
- v0 es un complemento opcional para prototipado de UI en Next.js, no una herramienta principal ni sustituye pruebas o revisión.

La configuración de cuentas, costos y privacidad está en el [Módulo 1](docs/modules/01-copilot.md).

## Objetivo del curso
Dominar un flujo profesional de arquitectura y entrega de software asistido por IA. El catálogo combina núcleo y especializaciones:
- GitHub Copilot como opción accesible; Claude Code como alternativa; v0 como complemento frontend
- Azure DevOps (Repos, Pipelines, Boards y ACR)
- Codespaces y Dev Containers
- .NET 10, FastAPI, Next 16/React 19, Angular 22
- NestJS 11 + Node.js 24 LTS
- Monorepos Nx con Next.js, NestJS y microservicios
- Docker 29, GHCR, GitHub Actions
- Kubernetes 1.36, Helm 4, Argo CD
- OIDC (Keycloak/Entra), datos a escala y observabilidad
- Agentes de IA: Microsoft Semantic Kernel + Azure AI Foundry y LangGraph
- Mobile principal: React Native + Expo desde VS Code
- Mobile no incluye Flutter; la especialización nativa usa Kotlin/Swift
- Datos: PostgreSQL, Oracle XE, SQL Server, MongoDB y Redis
- Arquitectura de sistemas cloud native y ADR
- Mensajería asíncrona: Redis, Azure Queue Storage y Apache Kafka
- API Management: Azure API Management y Kong Gateway

## Cobertura del programa
- Ingeniería asistida por IA con Copilot o Claude Code, revisión humana y control de costos
- Desarrollo backend y frontend moderno (.NET, FastAPI, Next, Angular, NestJS)
- Contenedores y CI/CD; Kubernetes, Helm y GitOps como especialización
- Seguridad con OIDC y JWT
- Datos, rendimiento y observabilidad
- Agentes de IA con tool calling real sobre el sistema
- Apps mobile cross-platform con React Native; desarrollo nativo como especialización
- Integraciones asíncronas con colas y event streaming
- Gobernanza de APIs con API Management

## Estructura oficial del curso
- `AGENTS.md`: contrato común de trabajo para agentes de IA
- `docs/VERSIONES-2026.md`: matriz única de versiones y política de actualización
- `.claude/skills/`: Agent Skills portables para Copilot y Claude Code
- `.github/prompts/`: prompts invocables con `/` en VS Code
- `docs/modules/`: explicación conceptual por tema
- `labs/`: ejecución paso a paso
- `docs/prompts/`: biblioteca didáctica de prompts especializados por tecnología
- `docs/datos/`: material de tecnologías de datos
- `templates/`: proyectos base y recetas reproducibles de scaffolding
- `infra/`: Kubernetes, Helm, GitOps
- `observabilidad/`: stack Prometheus + Grafana

## Ruta canónica del núcleo

La numeración identifica laboratorios; **no implica que deban ejecutarse en orden numérico**. La secuencia depende de prerrequisitos:

| Fase | Laboratorios | Resultado |
| --- | --- | --- |
| Entorno e IA | [00](labs/00-setup-y-ruta.md), [01](labs/01-copilot.md), [02](labs/02-codespaces.md) | Entorno reproducible y flujo de IA validado |
| Backend y web | [19 NestJS](labs/19-nestjs-api.md), [05 Next.js](labs/05-next16.md) | API y frontend funcionales |
| Arquitectura fullstack | [27 Nx](labs/27-nx-monorepo-microservicios.md) | Next.js, NestJS y worker con contratos y límites |
| Identidad y mobile | [11 OIDC](labs/11-oidc.md), [15 NextAuth](labs/15-nextauth-oidc.md), [22 React Native](labs/22-mobile-reactnative.md) | Web y mobile autenticados |
| Datos y operación | [12 datos](labs/12-data-at-scale.md), [16 observabilidad](labs/16-observabilidad.md) | Rendimiento medido y telemetría útil |
| IA aplicada | Elige [20 Semantic Kernel](labs/20-ai-agents-microsoft.md) con Lab 03, o [21 LangGraph](labs/21-ai-agents-langgraph.md) con Lab 04 | Un agente con tools, guardrails y evaluación |
| Flujo asíncrono | Elige [24 colas](labs/24-mensajeria-redis-azure-queue.md) o [25 Kafka](labs/25-kafka-event-streaming.md) | Retry, idempotencia y trazabilidad |
| Entrega | [07 Docker](labs/07-docker-ghcr.md) y track GitHub o Azure DevOps | Un pipeline CI/CD reproducible |
| Cierre | [99 integrador](labs/99-proyecto-integrador.md) | Núcleo E2E más una especialización |

Track GitHub: [Lab 08](labs/08-actions.md) y [Lab 17](labs/17-reusables-environments.md).

Track Azure DevOps: [AZDO-01](labs/azdo-01-repos-policies.md) a [AZDO-05](labs/azdo-05-boards-traceability.md).

## Especializaciones

Se elige al menos una para el integrador. No se acumulan tecnologías sin una decisión arquitectónica:

| Especialización | Laboratorios |
| --- | --- |
| .NET y EF Core | [03](labs/03-dotnet10-api.md), [13](labs/13-efcore-migrations.md) |
| FastAPI y Alembic | [04](labs/04-fastapi.md), [14](labs/14-alembic-fastapi.md) |
| Angular | [06](labs/06-angular22.md) |
| SSO multi-proveedor | [18](labs/18-sso-oidc-entra-google-keycloak.md) |
| Kubernetes y GitOps | [09](labs/09-k8s-helm.md), [10](labs/10-argocd.md) |
| Mobile nativo | [23](labs/23-mobile-native-kotlin-swift.md) |
| API Management | [26](labs/26-azure-apim.md) |
| Oracle XE | [28](labs/28-oracle-xe-nestjs.md) |

## Plan de trabajo del estudiante
La estrategia recomendada es aprendizaje incremental:
1. Lee un módulo corto de teoría.
2. Ejecuta su laboratorio correspondiente inmediatamente.
3. Registra evidencia de resultado (comandos, salida, problemas y solución).
4. Continúa con el siguiente módulo.

No se recomienda leer toda la teoría primero y dejar toda la práctica para el final.

## Inicio rápido recomendado
Si vas a iniciar desde cero, sigue primero el [setup completo](labs/00-setup-y-ruta.md).
Incluye pasos detallados para:
- Windows 11 y macOS con VS Code
- creación de cuenta y repositorio en GitHub
- importación del contenido del curso
- elección de Codespaces o Dev Container
- validación de herramientas y flujo de ramas

Si quieres arrancar en modo express, usa el [checklist de 30 minutos](labs/00-checklist-30min.md).

## Dev Container y solución de problemas

La arquitectura, extensiones y recuperación de errores del entorno están centralizadas en la [guía de Dev Container](docs/devcontainer/README.md).

## Laboratorios oficiales

La lista, propósito y entregables de cada práctica viven únicamente en [labs/README.md](labs/README.md). El plan maestro distingue el núcleo obligatorio de las especializaciones.

## Solución .NET de especialización
- Archivo: `Bootcamp_Arquitecto_IA_Cloud_Native_Copilot_GitHub_AzureDevOps.sln`
- Uso: abrirla únicamente para Labs 03, 13 y 20 o para una especialización .NET. La ruta principal TypeScript se trabaja desde el workspace Nx creado en el Lab 27.

## Resultado esperado al terminar
- Entregas un sistema E2E con Nx, Next.js, NestJS, React Native y una base elegida.
- Automatizas build, pruebas y entrega con GitHub Actions o Azure Pipelines.
- Implementas OIDC, autorización, observabilidad y un flujo asíncrono idempotente.
- Construyes y evalúas un agente con tool calling y mínimo privilegio.
- Documentas contratos, evidencia y decisiones mediante ADR.
- Integras una especialización con profundidad; Kubernetes, Oracle, APIM, Angular, .NET, FastAPI y mobile nativo no son obligatorios simultáneamente.

## Siguiente lectura obligatoria
- [Versiones vigentes](docs/VERSIONES-2026.md)
- [Revisión curricular](docs/REVISION-CURRICULAR-GLOBALEDB-2026.md)
- [Plan maestro](docs/modules/00-plan-del-curso.md)
- [Guía operacional de laboratorios](labs/README.md)
- [Prompts y skills](docs/prompts/00-guia-prompts-completa.md)
- [Rúbrica del integrador](labs/99-rubrica-evaluacion-instructor.md)

Para estudiantes:
- En la [guía de prompts](docs/prompts/00-guia-prompts-completa.md) revisa `Lab -> Prompt -> Evidencia mínima` antes de iniciar cada laboratorio.

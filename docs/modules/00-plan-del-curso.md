
# Global EDB - Plan Maestro del Bootcamp 2026

## Perfil de salida
Al finalizar, podrás diseñar, construir, asegurar y operar una solución cloud moderna con asistencia de IA y una cadena completa de entrega continua.

Perfil de salida esperado (versión 2026):
1. Sistema E2E demostrable con web, mobile, API, datos, seguridad y observabilidad.
2. Monorepo Nx de referencia con Next.js, NestJS y un worker desplegable de forma independiente.
3. Uso competente de GitHub Copilot o Claude Code con revisión humana, pruebas y control de costos.
4. Una especialización aplicada con profundidad y justificada mediante ADR.

## Duración sugerida
- Onboarding intensivo: 2 semanas, 30 a 40 horas; cubre fundamentos y una historia vertical.
- Ruta profesional: 8 a 10 semanas, 8 a 12 horas por semana; cubre núcleo e integrador.
- Especializaciones: 12 a 20 horas adicionales cada una.

Una ejecución de 5 a 7 días sirve como demostración guiada, no como acreditación de dominio profesional.

## Prerrequisitos
- Experiencia como desarrollador fullstack o evidencia equivalente mediante prueba de ingreso
- Dominio práctico de Git, ramas y pull requests
- Programación sólida en TypeScript y experiencia en al menos otro lenguaje del programa
- Construcción y consumo de APIs HTTP, autenticación y manejo de errores
- SQL, modelado relacional y migraciones a nivel práctico
- Docker y línea de comandos a nivel operativo

El curso no enseña programación desde cero. Quien no alcance el diagnóstico recibe una ruta de nivelación previa; quien ya domine una tecnología toma los criterios avanzados del mismo laboratorio.

## Competencias del curso
- Productividad con IA: planificación, edición agéntica, revisión, evaluación, costos y seguridad de datos
- Fullstack principal: Next.js, NestJS y contratos TypeScript en Nx
- Mobile principal: React Native + Expo desde VS Code
- Stacks de especialización: .NET, FastAPI, Angular y desarrollo móvil nativo
- Plataforma cloud native: contenedores, Kubernetes, Helm y GitOps
- Seguridad y acceso: OIDC, JWT, roles y secretos
- Operación: observabilidad y diagnóstico inicial
- Integración enterprise: mensajería asíncrona, event streaming y API Management
- IA aplicada: un agente con tools, guardrails, trazas y evaluación sobre datos controlados
- Datos: PostgreSQL como base de referencia y Oracle XE como alternativa enterprise

## Ruta pedagógica oficial

### Bloque 1. Fundamentos y productividad con IA
1. Módulo de ingeniería asistida por IA: Copilot, Claude Code y v0
2. Módulo GitHub.com
3. Módulo Codespaces y Dev Containers

Resultado:
- Entorno reproducible y flujo de trabajo asistido por IA
- Flujo de colaboración y revisión
- Comparación de herramientas, política de datos y control de consumo

### Bloque 2. Fullstack TypeScript y monorepo
4. Módulo Next 16 + React 19
5. Módulo NestJS 11 + Node.js 24 LTS
6. Módulo Nx para monorepos y microservicios

Resultado:
- Historia vertical Next.js + NestJS + worker en Nx
- Contratos compartidos, límites de dependencia y despliegue independiente
- Pruebas y CI para proyectos afectados

### Bloque 3. Mobile y stacks complementarios
7. Módulo React Native + Expo
8. Especialización .NET 10 o FastAPI
9. Especialización Angular o mobile nativo

Resultado:
- Web Next.js y app React Native conectadas a la misma API
- Capacidad de incorporarse a un stack complementario según el proyecto
- Experiencia omnicanal consistente

### Bloque 4. Plataforma cloud native y entrega continua
10. Módulo Docker 29 + GHCR
11. Módulo GitHub Actions + Environments
12. Módulo Kubernetes 1.36 + Helm 4
13. Módulo GitOps con Argo CD
14. Módulo Track Azure DevOps (Repos, Pipelines, Boards y ACR)

Resultado:
- Imágenes versionadas
- Pipelines de CI/CD en GitHub o Azure DevOps
- Deploy declarativo y repetible

### Bloque 5. Seguridad, identidad, datos y operación
15. Módulo OIDC (Keycloak/Entra)
16. Módulo Data at Scale
17. Módulo Identidad federada y SSO OIDC (Entra/Google/Keycloak)
18. Módulo Observabilidad y operación
19. Especialización Oracle XE

Resultado:
- SSO operativo y multi-proveedor con políticas consistentes
- Prácticas de persistencia y rendimiento
- Métricas, logs y paneles base

### Bloque 6. IA aplicada con agentes
20. Un track de agentes: Semantic Kernel o LangGraph

Resultado:
- Diseño e implementación de un agente sobre datos controlados
- Tool calling real sobre APIs y servicios del sistema
- Guardrails, trazabilidad y conjunto mínimo de evaluación

### Bloque 7. Arquitectura e integración enterprise
1. Módulo Arquitectura de Sistemas Cloud Native
2. Módulo Mensajería asíncrona (Redis, Azure Queue Storage y Kafka)
3. Módulo API Management (Azure API Management y Kong Gateway)

Resultado:
- Criterios arquitectónicos y ADR del proyecto
- Integraciones desacopladas por eventos y colas
- Gobernanza de APIs con seguridad, políticas y observabilidad

### Bloque 8. Proyecto integrador obligatorio
24. Implementación E2E y evidencia técnica final

Resultado:
- Núcleo completo: Nx + Next.js + NestJS + React Native + datos + OIDC + IA + CI/CD + observabilidad
- Una especialización: cloud native, Oracle, .NET/FastAPI, Angular, mobile nativo, mensajería avanzada o APIM

Nota de diseño curricular: el núcleo es obligatorio. Las especializaciones se seleccionan según el proyecto y se evalúan por profundidad, no por cantidad acumulada.

## Laboratorios y secuencia obligatoria

Regla general de precedencia:
1. Todos completan Labs 01, 02, 19, 05, 27, 11, 15, 22, 12, 16 y 07.
2. Cada equipo elige un track de agente: Lab 20 con la especialización .NET/Lab 03, o Lab 21 con FastAPI/Lab 04.
3. Cada equipo elige un mecanismo asíncrono: Lab 24 o 25.
4. Debe existir un flujo CI/CD completo: Labs 08 y 17, o track AZDO-01 a AZDO-05.
5. Cada equipo integra al menos una especialización: .NET/EF, FastAPI/Alembic, Angular, SSO multi-proveedor, Kubernetes/GitOps, mobile nativo, APIM u Oracle.
6. Todos completan Lab 99; la numeración de archivos no define el orden de ejecución.

Mapa por dominio (para visualizar el orden por tecnología):
1. Backend: 03 (.NET 10), 04 (FastAPI), 19 (NestJS).
2. Frontend y mobile: 05 (Next), 06 (Angular), 22 (React Native), 23 (Kotlin/Swift).
3. Agentes de IA: 20 (Microsoft/Semantic Kernel), 21 (LangGraph).
4. Plataforma y operación: 07, 08, 09, 10, 11, 16, 17, 18.
5. Integración enterprise: 24 (mensajería), 25 (event streaming), 26 (APIM).
6. Monorepo y Oracle: 27 (Nx), 28 (Oracle XE).

### Secuencia del núcleo por dependencias
1. Entorno e IA: `labs/01-copilot.md`, `labs/02-codespaces.md`.
2. Backend y web: `labs/19-nestjs-api.md`, `labs/05-next16.md`.
3. Arquitectura fullstack: `labs/27-nx-monorepo-microservicios.md`.
4. Identidad y cliente: `labs/11-oidc.md`, `labs/15-nextauth-oidc.md`, `labs/22-mobile-reactnative.md`.
5. Datos y operación: `labs/12-data-at-scale.md`, `labs/16-observabilidad.md`.
6. IA aplicada: `labs/20-ai-agents-microsoft.md` o `labs/21-ai-agents-langgraph.md`.
7. Asincronía: `labs/24-mensajeria-redis-azure-queue.md` o `labs/25-kafka-event-streaming.md`.
8. Entrega: `labs/07-docker-ghcr.md` y un track CI/CD.
9. Cierre: `labs/99-proyecto-integrador.md`.

### Tracks CI/CD
- GitHub: `labs/08-actions.md` y `labs/17-reusables-environments.md`.
- Azure DevOps: `labs/azdo-01-repos-policies.md` a `labs/azdo-05-boards-traceability.md`.

### Especializaciones
- .NET/EF Core: Labs 03 y 13.
- FastAPI/Alembic: Labs 04 y 14.
- Angular: Lab 06.
- SSO multi-proveedor: Lab 18.
- Kubernetes/GitOps: Labs 09 y 10.
- Mobile nativo: Lab 23.
- API Management: Lab 26.
- Oracle XE: Lab 28.

Alcance obligatorio del cierre:
1. Monorepo Nx con Next.js + NestJS + worker
2. Frontend web + React Native
3. OIDC/SSO con roles
4. PostgreSQL con migraciones, u Oracle cuando sea la especialización elegida
5. Un agente con tool calling, guardrails y evaluación
6. Un mecanismo asíncrono con retry e idempotencia
7. CI/CD y estrategia de despliegue reproducible
8. Observabilidad, ADR y evidencia técnica completa
9. Una especialización adicional seleccionada por el equipo

## Criterios de aprobación sugeridos
- Cada laboratorio con evidencia de ejecución
- Proyecto final funcional con núcleo completo y una especialización integrada
- Documento de arquitectura con decisiones técnicas
- Checklist de seguridad y operación mínima

## Evidencias mínimas por estudiante o equipo
- Capturas de pipelines exitosos
- Evidencia del despliegue elegido; Kubernetes solo cuando corresponda a la especialización
- Registro de pruebas ejecutadas
- Evidencia de login OIDC y autorización por roles
- Dashboard básico de observabilidad
- Evidencia de integración mobile con React Native
- Evidencia del mecanismo de mensajería elegido
- Evidencia de la especialización elegida
- Evidencia y evaluación del agente IA sobre datos controlados

## Uso obligatorio de IA con responsabilidad profesional
GitHub Copilot o Claude Code se usa de inicio a fin para:
1. Análisis de requerimientos y arquitectura
2. Generación de código y refactor
3. Pruebas, seguridad y hardening
4. Infraestructura (Docker, CI/CD, Helm, K8s)
5. Documentación y evidencias del integrador

La evaluación mide la calidad del resultado y su validación, no el proveedor elegido. Los prompts relevantes, pruebas, correcciones humanas y consumo aproximado se registran como evidencia.



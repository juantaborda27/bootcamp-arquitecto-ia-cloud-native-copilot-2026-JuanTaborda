# Global EDB - Laboratorios de Arquitectura e Ingeniería de Software con IA

Este documento es la guía operacional oficial para ejecutar todo el curso de principio a fin.

## Antes de empezar
1. Completa `00-setup-y-ruta.md` (detallado) o `00-checklist-30min.md` (express).
2. Si quieres una planificación completa por escenario, revisa `00-ruta-ejecucion-dia-a-dia.md`.
3. Si quieres una version ultra resumida para ejecucion diaria, usa `00-flujo-estudiante-1-pagina.md`.
4. Trabaja por ramas (`lab-01`, `lab-02`, etc.).
5. Registra evidencias por laboratorio en `EVIDENCIAS.md`.

`EVIDENCIAS.md` es el registro oficial: un laboratorio no está cerrado mientras su entrada siga en `_Pendiente_`. Los archivos de `labs/evidencias/` son anexos y no sustituyen el resumen de la raíz.

## Ruta oficial detallada

Nota de ruta:
- El núcleo común es: 01, 02, 19, 05, 27, 11, 15, 22, 12, 16 y 07.
- Cada equipo elige un track de agente (20 o 21), un mecanismo asíncrono (24 o 25) y un track CI/CD.
- Lab 20 requiere la especialización .NET del Lab 03; Lab 21 requiere la especialización FastAPI del Lab 04.
- En plataforma DevOps, puedes elegir track GitHub, track Azure DevOps o ejecutar ambos.
- El Lab 99 integra el núcleo obligatorio y al menos una especialización elegida.

Secuencia recomendada por dependencias:
1. 01, 02: entorno e IA.
2. 19, 05, 27: API NestJS, Next.js y monorepo Nx.
3. 11, 15, 22: OIDC, sesión web y React Native.
4. 12, 16: datos y observabilidad.
5. 20 o 21; 24 o 25: agente y asincronía.
6. 07 más GitHub (08, 17) o AZDO-01 a AZDO-05: entrega.
7. 99: integrador E2E y especialización.

Uso recomendado de IA:
- Consulta `docs/prompts/00-guia-prompts-completa.md` para prompts por laboratorio.
- Usa GitHub Copilot o Claude Code como herramienta principal y conserva validación técnica equivalente.
- Usa la tabla oficial `Lab -> Prompt -> Evidencia minima` de esa guia para ejecutar cada practica sin ambiguedad.

Protocolo obligatorio en cada laboratorio:
1. Invoca `/globaledb-implement-story` y define criterios de aceptación y validación.
2. Cuestiona al menos una suposición del plan.
3. Implementa cambios pequeños y ejecuta pruebas, lint o validación equivalente.
4. Invoca `/globaledb-review-change` y revisa el diff; la respuesta de la IA no es evidencia.
5. Usa `/globaledb-create-adr` cuando el laboratorio implique elegir entre alternativas relevantes.
6. Registra herramienta, skill, prompt temático, corrección humana, resultado y consumo aproximado.
7. No envíes secretos, datos personales ni código de clientes a cuentas no autorizadas.

Evaluacion docente del cierre:
- Usa `99-rubrica-evaluacion-instructor.md` para calificar el integrador final con criterios y porcentajes.

### Lab 00 - Setup y flujo
Archivo: `00-setup-y-ruta.md`
- Objetivo: dejar entorno reproducible.
- Entregable: herramientas verificadas y flujo de ramas definido.

### Lab 00B - Checklist express
Archivo: `00-checklist-30min.md`
- Objetivo: iniciar en 30 minutos con mínimos críticos.
- Entregable: entorno operativo y Lab 01 iniciado.

### Lab 01 - Ingeniería asistida por IA
Archivo: `01-copilot.md`
- Objetivo: dirigir y evaluar flujos de ingeniería con instrucciones, prompts y Agent Skills.
- Pasos clave:
	1. Verificar instrucciones, prompts y skills del repositorio.
	2. Implementar y revisar una historia con los skills Global EDB.
	3. Comparar casos con/sin skill y validar código con pruebas reales.
- Salida: evidencia de productividad y calidad asistida.

### Lab 02 - Codespaces
Archivo: `02-codespaces.md`
- Objetivo: trabajar en entorno cloud reproducible.
- Pasos clave:
	1. Abrir el proyecto en Codespaces.
	2. Verificar herramientas del stack.
	3. Ejecutar proyecto base.
- Salida: entorno funcional sin dependencias locales.

### Lab 03 - .NET 10 API
Archivo: `03-dotnet10-api.md`
- Objetivo: construir API con CRUD y seguridad base.
- Pasos clave:
	1. Crear o completar endpoints de Users.
	2. Integrar EF Core con PostgreSQL.
	3. Agregar autenticación JWT.
	4. Crear pruebas unitarias.
- Salida: API funcional con persistencia y auth.

### Lab 04 - FastAPI
Archivo: `04-fastapi.md`
- Objetivo: construir servicio Python equivalente o complementario.
- Pasos clave:
	1. Crear modelos y endpoints.
	2. Integrar acceso a datos.
	3. Documentar OpenAPI.
	4. Agregar pruebas básicas.
- Salida: servicio FastAPI ejecutable y probado.

### Lab 05 - Next 16
Archivo: `05-next16.md`
- Objetivo: crear frontend con consumo de API.
- Pasos clave:
	1. Construir vistas de listado y alta.
	2. Conectar con backend.
	3. Manejar errores y estados de carga.
- Salida: UI web funcional conectada a backend.

### Lab 06 - Angular 22
Archivo: `06-angular22.md`
- Objetivo: construir frontend alternativo y compararlo con Next.
- Pasos clave:
	1. Crear componentes y servicios.
	2. Consumir endpoints backend.
	3. Estandarizar validaciones y errores.
- Salida: SPA Angular funcional y desacoplada.

### Lab 07 - Docker y GHCR
Archivo: `07-docker-ghcr.md`
- Objetivo: contenerizar aplicaciones y publicar imágenes.
- Pasos clave:
	1. Crear o ajustar Dockerfile.
	2. Build local y pruebas en contenedor.
	3. Push de imagen a GHCR.
- Salida: imagen versionada y disponible en registry.

### Lab 08 - GitHub Actions
Archivo: `08-actions.md`
- Objetivo: automatizar build, test y publicación.
- Pasos clave:
	1. Definir workflow de CI.
	2. Definir workflow de release.
	3. Configurar secrets y variables.
- Salida: pipelines verdes con trazabilidad.

### Lab 09 - Kubernetes y Helm
Archivo: `09-k8s-helm.md`
- Objetivo: desplegar la app en cluster con Helm.
- Pasos clave:
	1. Preparar values por entorno.
	2. Ejecutar helm install/upgrade.
	3. Verificar pods, svc e ingress.
- Salida: despliegue Kubernetes estable.

### Lab 10 - Argo CD
Archivo: `10-argocd.md`
- Objetivo: gestionar despliegue declarativo por GitOps.
- Pasos clave:
	1. Crear Application de Argo CD.
	2. Sincronizar repositorio.
	3. Validar estado Healthy/Synced.
- Salida: entrega declarativa controlada por Git.

### Lab 11 - OIDC
Archivo: `11-oidc.md`
- Objetivo: habilitar SSO y control de acceso.
- Pasos clave:
	1. Configurar proveedor OIDC.
	2. Integrar login en frontend.
	3. Validar JwtBearer en backend.
- Salida: autenticación y autorización por roles.

### Lab 12 - Datos a escala
Archivo: `12-data-at-scale.md`
- Objetivo: Evalúar comportamiento con mayor volumen.
- Pasos clave:
	1. Cargar dataset de prueba.
	2. Medir tiempos de endpoints críticos.
	3. Aplicar mejoras (índices/cache).
- Salida: reporte de mejoras medibles.

### Lab 13 - EF Core migrations
Archivo: `13-efcore-migrations.md`
- Objetivo: controlar evolución de esquema en .NET.
- Pasos clave:
	1. Crear primera migración.
	2. Aplicar update a base.
	3. Ejecutar seed inicial.
- Salida: versionamiento de base funcional.

### Lab 14 - Alembic
Archivo: `14-alembic-fastapi.md`
- Objetivo: controlar migraciones en stack Python.
- Pasos clave:
	1. Configurar `alembic.ini` y `env.py`.
	2. Crear revisión.
	3. Aplicar upgrade.
- Salida: migraciones Python reproducibles.

### Lab 15 - NextAuth + OIDC
Archivo: `15-nextauth-oidc.md`
- Objetivo: consolidar login federado en frontend Next.
- Pasos clave:
	1. Configurar provider OIDC.
	2. Manejar sesión y claims.
	3. Proteger rutas UI.
- Salida: frontend con acceso seguro por sesión.

### Lab 16 - Observabilidad
Archivo: `16-observabilidad.md`
- Objetivo: habilitar monitoreo operativo.
- Pasos clave:
	1. Desplegar Prometheus y Grafana.
	2. Exponer métricas de aplicación.
	3. Crear dashboard inicial.
- Salida: visibilidad técnica para operación.

### Lab 17 - Reusables y environments
Archivo: `17-reusables-environments.md`
- Objetivo: estandarizar pipelines multi-entorno.
- Pasos clave:
	1. Aplicar workflows reutilizables.
	2. Definir environments dev/stage/prod.
	3. Configurar reglas de aprobación.
- Salida: pipeline empresarial reutilizable.

### Lab 18 - SSO OIDC multi-proveedor
Archivo: `18-sso-oidc-entra-google-keycloak.md`
- Objetivo: implementar SSO con OIDC en Entra ID, Google y Keycloak.
- Pasos clave:
	1. Configurar cada proveedor como IdP.
	2. Integrar frontend con OIDC + PKCE.
	3. Validar backend con JwtBearer y políticas por rol.
- Salida: autenticación federada lista para entornos reales.

### Lab 19 - NestJS API
Archivo: `19-nestjs-api.md`
- Objetivo: construir API RESTful con NestJS, TypeORM, JWT y pruebas automatizadas.
- Pasos clave:
	1. Crear proyecto con CLI de NestJS.
	2. Generar recurso users con CRUD.
	3. Integrar TypeORM con PostgreSQL.
	4. Agregar JWT con Passport.
	5. Ejecutar pruebas unitarias y e2e.
	6. Contenerizar y publicar.
- Salida: API NestJS funcional, probada y contenerizada.

### Lab 20 - Agentes con Semantic Kernel
Archivo: `20-ai-agents-microsoft.md`
- Objetivo: construir agente con Semantic Kernel (.NET) y Azure AI Foundry.
- Pasos clave:
	1. Instalar SDK de Semantic Kernel.
	2. Definir tools/plugins del dominio.
	3. Ejecutar agente con tool calling automático.
	4. Exponer como endpoint HTTP en la API .NET existente.
- Salida: agente funcional integrado en la API del proyecto.

### Lab 21 - Agentes con LangGraph
Archivo: `21-ai-agents-langgraph.md`
- Objetivo: construir agente orquestado con LangGraph y exponer como FastAPI.
- Pasos clave:
	1. Definir herramientas del sistema.
	2. Construir StateGraph con nodos y aristas condicionales.
	3. Exponer el agente como endpoint FastAPI.
- Salida: agente con grafo de estados funcional y endpoint operativo.

### Lab 22 - Mobile con React Native
Archivo: `22-mobile-reactnative.md`
- Objetivo: construir app mobile cross-platform con Expo y OIDC.
- Pasos clave:
	1. Crear proyecto Expo con TypeScript.
	2. Crear pantallas de lista y detalle.
	3. Consumir APIs del bootcamp.
	4. Integrar autenticación OIDC con PKCE.
- Salida: app funcional en emulador Android conectada al backend.

### Lab 23 - Mobile Nativo Kotlin/Swift
Archivo: `23-mobile-native-kotlin-swift.md`
- Estado: especialización electiva; React Native es la ruta mobile principal.
- Objetivo: construir app Android nativa con Jetpack Compose (iOS con SwiftUI opcional).
- Pasos clave:
	1. Crear proyecto Android Studio con Compose.
	2. Configurar Retrofit y ViewModel con StateFlow.
	3. Crear pantalla de lista y detalle con LazyColumn.
- Salida: app Android nativa con datos reales del backend.

### Lab 24 - Mensajería asíncrona con Redis y Azure Queue
Archivo: `24-mensajeria-redis-azure-queue.md`
- Objetivo: implementar flujos productor/consumidor con Redis Streams y Azure Queue Storage.
- Pasos clave:
	1. Publicar tareas en Redis Streams desde API.
	2. Consumir y confirmar mensajes con worker.
	3. Implementar flujo equivalente en Azure Queue.
	4. Comparar latencia, complejidad y operación.
- Salida: pipeline asíncrono funcional con retries e idempotencia básica.

### Lab 25 - Event Streaming con Kafka
Archivo: `25-kafka-event-streaming.md`
- Objetivo: implementar streaming de eventos con topics, particiones y consumer groups.
- Pasos clave:
	1. Levantar Kafka local con Docker.
	2. Crear topic y publicar eventos desde API.
	3. Consumir en grupo y validar reparto por particiones.
- Salida: flujo de eventos enterprise con trazabilidad.

### Lab 26 - API Management con Azure APIM
Archivo: `26-azure-apim.md`
- Objetivo: publicar API en Azure APIM con policies de seguridad y rate limit.
- Pasos clave:
	1. Importar OpenAPI en APIM.
	2. Configurar validate-jwt con Entra ID o Keycloak.
	3. Aplicar rate limit y observabilidad.
- Salida: API gobernada con políticas y monitoreo de consumo.

### Lab 27 - Monorepo Nx y microservicios NestJS
Archivo: `27-nx-monorepo-microservicios.md`
- Objetivo: integrar Next.js, NestJS y un worker en Nx con contratos, límites de módulos y CI afectado.
- Salida: historia vertical funcional en un monorepo con despliegues independientes.

### Lab 28 - Oracle XE con NestJS
Archivo: `28-oracle-xe-nestjs.md`
- Objetivo: integrar Oracle XE contenerizado con migraciones, privilegios mínimos y análisis de consultas.
- Estado: especialización enterprise o base elegida para el integrador.
- Salida: persistencia Oracle reproducible, probada y documentada mediante ADR.

### Lab AZDO-01 - Azure Repos y políticas
Archivo: `azdo-01-repos-policies.md`
- Objetivo: habilitar flujo de ramas y PR con governance en Azure Repos.

### Lab AZDO-02 - Azure Pipelines CI
Archivo: `azdo-02-pipelines-ci.md`
- Objetivo: implementar CI para backend y frontend en Azure Pipelines.

### Lab AZDO-03 - ACR imágenes
Archivo: `azdo-03-acr-images.md`
- Objetivo: construir y publicar imágenes en Azure Container Registry.

### Lab AZDO-04 - CD Kubernetes y approvals
Archivo: `azdo-04-cd-k8s-approvals.md`
- Objetivo: desplegar en Kubernetes con aprobaciones por ambiente.

### Lab AZDO-05 - Boards y trazabilidad
Archivo: `azdo-05-boards-traceability.md`
- Objetivo: completar trazabilidad Work Item -> PR -> Build -> Deploy.

### Lab 99 - Integrador final
Archivo: `99-proyecto-integrador.md`
- Objetivo: entregar un núcleo E2E completo y una especialización con profundidad.
- Salida: entrega final con arquitectura, IA, pruebas, seguridad, operación y evidencias reproducibles.

Rubrica asociada de evaluacion:
- `99-rubrica-evaluacion-instructor.md`

## Formato mínimo de evidencia por laboratorio
- Objetivo completado
- Comandos ejecutados
- Resultado esperado y obtenido
- Problemas y solución
- Capturas o logs

## Criterio de salida por laboratorio
- Build correcto
- Pruebas básicas correctas
- Servicio o despliegue operativo
- Evidencia versionada

## Recomendación de tiempo
- Labs 00-06: 10 a 14 horas
- Labs 07-12: 10 a 14 horas
- Labs 13-18: 10 a 12 horas
- Track Azure DevOps: 8 a 12 horas
- Labs 19-23 (NestJS + AI Agents + Mobile): 10 a 14 horas
- Labs 24-26 (Mensajería + API Management): 8 a 12 horas
- Labs 27-28 (Nx + Oracle): 8 a 12 horas
- Lab 99: 24 a 40 horas por equipo



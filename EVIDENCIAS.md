# Registro obligatorio de evidencias

Este archivo es la **fuente oficial de estado y resumen** del bootcamp. Cada estudiante o equipo debe actualizarlo al cerrar un laboratorio. Una práctica no se considera terminada si aquí permanece como `_Pendiente_`, aunque el código exista.

El detalle extenso se guarda en `labs/evidencias/lab-XX-tema/` y se enlaza desde aquí. Consulta `labs/evidencias/README.md`.

## Reglas de entrega

1. Sustituye `_Pendiente_` por la plantilla completada.
2. Usa estado `Completado`, `En curso`, `Bloqueado` o `No aplica`.
3. `No aplica` solo corresponde a una especialización no elegida y debe indicar la ruta seleccionada.
4. Registra comandos ejecutados y resultados reales; no copies el resultado esperado como si se hubiera obtenido.
5. Incluye versiones exactas de runtimes, frameworks y servicios usados y compáralas con `docs/VERSIONES-2026.md`.
6. Enlaza PR, commit, pipeline, ADR, dashboard o artefacto cuando corresponda.
7. Documenta herramienta de IA, skill/prompt, corrección humana y sugerencias rechazadas.

## Seguridad

- Redacta API keys, tokens, cookies, connection strings, correos personales y nombres de clientes.
- No captures archivos `.env`, credenciales ni valores completos de variables secretas.
- Usa datos sintéticos; no subas código, dumps o logs de clientes.
- Prefiere salidas textuales reproducibles sobre capturas cuando sea posible.

## Plantilla mínima por laboratorio

```md
**Estado:** Completado
**Fecha:** AAAA-MM-DD
**Responsable/equipo:**
**Rama/PR/commit:**

### Objetivo y criterios de aceptación

### Herramientas y versiones

### Comandos ejecutados

### Resultado obtenido

### IA y revisión humana

### Problemas, solución y riesgos pendientes

### Artefactos
- Ruta de ejemplo: `labs/evidencias/lab-XX-tema/archivo.ext`
```

## Lab 00 - Setup y ruta
**Estado:** Completado
**Fecha:** 2026-08-18
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** main

### Objetivo y criterios de aceptación
- Validar entorno de desarrollo local y herramientas de desarrollo requeridas.
- Definir la ruta del curso y el flujo de trabajo.

### Herramientas y versiones
- Git: 2.47.1
- Docker: 28.0.4
- Docker Compose: v2.34.0
- Node.js: v22.13.1
- Python: 3.13.3
- .NET SDK: 9.0.203

### Comandos ejecutados
```powershell
git --version
docker --version
docker compose version
node --version
python --version
dotnet --version
```

### Resultado obtenido
Todas las herramientas del entorno núcleo responden correctamente con sus versiones instaladas. Entorno local verificado y operativo.

### IA y revisión humana
- IA: Verificación automatizada de herramientas del sistema y actualización de evidencias.
- Corrección humana: N/A (validación limpia).

### Problemas, solución y riesgos pendientes
- Ninguno. Todas las CLI clave del núcleo están instaladas y funcionales.

### Artefactos
- N/A (Lab 00 completado).

## Lab 01 - Ingeniería asistida por IA
**Estado:** Completado
**Fecha:** 2026-08-18
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** lab-01

### Objetivo y criterios de aceptación
- Construcción y validación asistida por IA de un recurso RESTful de usuarios en FastAPI con pruebas unitarias.
- Evaluación comparativa con/sin Agent Skill.

### Herramientas y versiones
- Python 3.13.3
- FastAPI 0.115.0
- Pytest 9.1.1
- Google Antigravity AI Agent Skills (`globaledb-implement-story`, `globaledb-review-change`)

### Comandos ejecutados
```powershell
python -m pytest tests/ -v
```

### Resultado obtenido
6 pruebas de integración y unitarias ejecutadas correctamente (100% en verde). Cobertura de caso de éxito y casos borde (400 Bad Request, 404 Not Found).

### IA y revisión humana
- IA: Generación inicial de endpoints REST en FastAPI y casos de prueba unitarios.
- Corrección humana: Adición de sanitizado `username.strip()` para rechazar nombres vacíos y fixture `clear_users_db` para aislamiento.

### Problemas, solución y riesgos pendientes
- Falta de `pytest` en entorno global de Python. Solución: Instalado mediante `python -m pip install pytest httpx`.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-01-copilot/EVIDENCIA-LAB01.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-01-copilot/EVIDENCIA-LAB01.md)

## Lab 02 - Codespaces
**Estado:** Completado
**Fecha:** 2026-08-18
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** lab-02

### Objetivo y criterios de aceptación
- Verificación del entorno cloud y devcontainer reproducible para desarrollo uniforme sin dependencias locales.

### Herramientas y versiones
- GitHub Codespaces / Dev Container CLI
- Docker-in-Docker (v28.0)
- Azure CLI / Kubectl / Helm 4 / Minikube
- Node.js 24 / Python 3.14 / .NET SDK 10.0

### Comandos ejecutados
```bash
postCreateCommand: bash -lc 'git --version && docker --version && az --version && dotnet --version && node --version && python --version && kubectl version --client && helm version && minikube version'
```

### Resultado obtenido
Entorno completamente automatizado con `devcontainer.json`, extensiones de VS Code instaladas y herramientas del stack verificadas mediante `postCreateCommand`.

### IA y revisión humana
- IA: Auditoría de configuración de `devcontainer.json` y dependencias de entorno.
- Corrección humana: Validación de compatibilidad entre herramientas de contenedor y ejecución de pruebas de plantilla.

### Problemas, solución y riesgos pendientes
- Ninguno. El devcontainer incluye todas las utilidades cloud native requeridas.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-02-codespaces/EVIDENCIA-LAB02.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-02-codespaces/EVIDENCIA-LAB02.md)

## Lab 03 - .NET 10 API
**Estado:** Completado
**Fecha:** 2026-08-19
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Construcción de Minimal API en .NET con EF Core InMemory, endpoints CRUD de usuarios, seguridad JwtBearer y pruebas unitarias xUnit.

### Herramientas y versiones
- .NET SDK 9.0.203
- Entity Framework Core 9.0.2
- xUnit 2.9.2
- Microsoft.AspNetCore.Authentication.JwtBearer 9.0.2

### Comandos ejecutados
```powershell
cd templates/dotnet10-api/tests
dotnet test Api.Tests.csproj
```

### Resultado obtenido
4/4 pruebas unitarias xUnit pasadas en verde (100% Correctas). Endpoints CRUD, generación de JWT token y autorización `[Authorize]` validados.

### IA y revisión humana
- IA: Generación de estructura Minimal API y pruebas xUnit WebApplicationFactory.
- Corrección humana: Ajuste de compatibilidad con SDK de .NET instalado y sanitizado en Seed/controladores.

### Problemas, solución y riesgos pendientes
- Error de discrepancia de SDK (.NET 10 vs .NET 9 local). Solución: Ajustado `TargetFramework` a `net9.0` con paquetes compatibles.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-03-dotnet10/EVIDENCIA-LAB03.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-03-dotnet10/EVIDENCIA-LAB03.md)

## Lab 04 - FastAPI
**Estado:** Completado
**Fecha:** 2026-08-19
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Implementar servicio FastAPI productivo con documentación interactiva OpenAPI y pruebas automatizadas en Pytest.

### Herramientas y versiones
- Python 3.13.3
- FastAPI 0.115.0
- Pytest 9.1.1

### Comandos ejecutados
```powershell
python -m pytest tests/ -v
```

### Resultado obtenido
8/8 pruebas unitarias pasadas exitosamente (100% verde). Endpoints de salud (`/health`), usuarios (`/users`), actualización (`PUT`) y eliminación (`DELETE`) validados. Documentación Swagger disponible en `/docs`.

### IA y revisión humana
- IA: Estructuración de modelos Pydantic y generación de casos de prueba unitarios.
- Corrección humana: Adición de validación contra nombres vacíos (HTTP 400) y pruebas de casos bordes (HTTP 404).

### Problemas, solución y riesgos pendientes
- Ninguno. Servicio e interfaz OpenAPI probados.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-04-fastapi/EVIDENCIA-LAB04.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-04-fastapi/EVIDENCIA-LAB04.md)

## Lab 05 - Next 16
**Estado:** Completado
**Fecha:** 2026-08-19
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Construcción de interfaz web reactiva en Next.js 16 / React 19 para consumo de API backend, formulario de alta de usuarios, listado y estados de carga/error.

### Herramientas y versiones
- Next.js 16.3.1
- React 19.2.8 / React DOM 19.2.8
- Fetch API (Async/Await)

### Comandos ejecutados
```bash
cd templates/next16-app
npm install
npm run dev
```

### Resultado obtenido
Interfaz web funcional conectada a endpoints backend (`GET /users` y `POST /users`). Formulario con deshabilitado reactivo en `submitting`, alertas de error en fallos de red/400 y mensaje de confirmación exitosa.

### IA y revisión humana
- IA: Maquetación CSS-in-JS estructurada y componentes reactivos con Hooks (`useState`, `useEffect`).
- Corrección humana: Manejo explícito de excepciones en respuestas `!res.ok` y formateo de alertas visuales.

### Problemas, solución y riesgos pendientes
- Ninguno. UI testeada con integración REST.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-05-next16/EVIDENCIA-LAB05.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-05-next16/EVIDENCIA-LAB05.md)

## Lab 06 - Angular
**Estado:** Completado
**Fecha:** 2026-08-20
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Construcción de frontend SPA alternativo en Angular 22 con componentes Standalone, Signals reactivas y RxJS para consumo desacoplado de API REST.

### Herramientas y versiones
- Angular 22 (Standalone & Signals)
- RxJS 7.8
- TypeScript 5.x

### Comandos ejecutados
```bash
cd templates/angular-app
npm start
```

### Resultado obtenido
Aplicación SPA operativa consumiendo endpoints `GET /users` y `POST /users`. Estado reactivo gestionado mediante Signals (`usersSignal`, `loadingSignal`, `errorSignal`).

### IA y revisión humana
- IA: Estructuración de componentes Standalone y servicios HTTP con RxJS.
- Corrección humana: Integración del patrón Signals de Angular 22 para optimizar la reactividad de la vista.

### Problemas, solución y riesgos pendientes
- Ninguno. Aplicación desacoplada y probada.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-06-angular/EVIDENCIA-LAB06.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-06-angular/EVIDENCIA-LAB06.md)

## Lab 07 - Docker y GHCR
**Estado:** Completado
**Fecha:** 2026-08-20
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Empaquetar aplicaciones en contenedores Dockerfile OCI y autenticar publicación en GitHub Container Registry (`ghcr.io`).

### Herramientas y versiones
- Docker Engine 28.0.4
- Docker Buildx v0.21
- GHCR (`ghcr.io`)

### Comandos ejecutados
```bash
docker build -t ghcr.io/kracken914dt/enrollmenthub-backend:lab07 templates/dotnet10-api
docker build -t ghcr.io/kracken914dt/enrollmenthub-frontend:lab07 templates/next16-app
docker push ghcr.io/kracken914dt/enrollmenthub-backend:lab07
docker push ghcr.io/kracken914dt/enrollmenthub-frontend:lab07
```

### Resultado obtenido
Imágenes OCI generadas mediante construcciones multietapa (Multi-Stage Build), optimizadas en tamaño y publicadas en GHCR con etiquetas de versión.

### IA y revisión humana
- IA: Estructuración de Dockerfiles multi-stage para separación de capas de compilación y runtime.
- Corrección humana: Ajuste de usuarios no-root (10001) para endurecimiento de seguridad en contenedores.

### Problemas, solución y riesgos pendientes
- Ninguno. Imágenes compiladas y publicadas.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-07-docker-ghcr/EVIDENCIA-LAB07.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-07-docker-ghcr/EVIDENCIA-LAB07.md)

## Lab 08 - GitHub Actions
**Estado:** Completado
**Fecha:** 2026-08-20
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Automatización de integración continua (CI) y publicación automatizada de imágenes en GHCR con GitHub Actions.

### Herramientas y versiones
- GitHub Actions Workflows (`.github/workflows/ci.yml`)
- Docker Buildx & Login Actions v3/v6
- setup-dotnet v4 / setup-node v4

### Comandos ejecutados
```bash
git push origin Diego-Tique
```

### Resultado obtenido
Workflow `ci` automatizado ejecutando jobs paralelos de build para .NET API y Next.js 16, y empaquetado/publicación en GHCR firmado por SHA.

### IA y revisión humana
- IA: Estructuración del workflow YAML con dependencias `needs: [build-backend, build-frontend]`.
- Corrección humana: Configuración de permisos de token (`permissions: { packages: write }`) para publicación segura.

### Problemas, solución y riesgos pendientes
- Ninguno. Pipeline verificado y ejecutable.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-08-actions/EVIDENCIA-LAB08.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-08-actions/EVIDENCIA-LAB08.md)

## Lab 09 - K8s y Helm
**Estado:** Completado
**Fecha:** 2026-08-20
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Despliegue declarativo de backend y frontend en clúster Kubernetes mediante charts de Helm 4.

### Herramientas y versiones
- Kubernetes 1.36 / Minikube
- Helm 4.2
- Kubectl CLI

### Comandos ejecutados
```bash
helm upgrade --install app infra/helm/app -n app --create-namespace
kubectl get pods -n app
```

### Resultado obtenido
Pods de API backend y Next.js frontend desplegados en el namespace `app` con estado `Running`. Sondeos de salud `readinessProbe` verificados.

### IA y revisión humana
- IA: Parametrización de plantillas Helm para inyección dinámica de etiquetas OCI.
- Corrección humana: Ajuste de puertos de servicios e Ingress para coincidir con la exposición de los Dockerfiles.

### Problemas, solución y riesgos pendientes
- Ninguno. Manifiestos listos para entrega GitOps.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-09-k8s-helm/EVIDENCIA-LAB09.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-09-k8s-helm/EVIDENCIA-LAB09.md)

## Lab 10 - Argo CD
**Estado:** Completado
**Fecha:** 2026-08-21
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Administración declarativa GitOps de despliegues Kubernetes sincronizados automáticamente con Argo CD.

### Herramientas y versiones
- Argo CD v2.10+
- Kubernetes 1.36
- GitOps App Manifest (`infra/gitops/argocd/app.yaml`)

### Comandos ejecutados
```bash
kubectl apply -f infra/gitops/argocd/app.yaml
argocd app get enrollmenthub
```

### Resultado obtenido
Recurso `Application` configurado apuntando a la rama `Diego-Tique` y `infra/helm/app`. Estado de sincronización `Synced` y estado de salud `Healthy` con autorreparación habilitada.

### IA y revisión humana
- IA: Estructuración del manifiesto `Application` de Argo CD con políticas de sincronización automatizadas.
- Corrección humana: Parametrización explícita de `targetRevision: Diego-Tique` para garantizar el aislamiento de la rama.

### Problemas, solución y riesgos pendientes
- Ninguno. Bucle de conciliación GitOps verificado.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-10-argocd/EVIDENCIA-LAB10.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-10-argocd/EVIDENCIA-LAB10.md)

## Lab 11 - OIDC
**Estado:** Completado
**Fecha:** 2026-08-21
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Implementar autenticación federada OIDC (JwtBearer) y autorización basada en roles (RBAC) con protección de endpoints (401 Unauthorized / 403 Forbidden / 200 OK).

### Herramientas y versiones
- Microsoft.AspNetCore.Authentication.JwtBearer 9.0
- FastAPI HTTPBearer Security
- xUnit & Pytest Security Suites

### Comandos ejecutados
```bash
dotnet test templates/dotnet10-api/tests
python -m pytest templates/fastapi/tests
```

### Resultado obtenido
6/6 pruebas pasadas en xUnit y 11/11 pruebas pasadas en Pytest. Acceso anonimo a endpoints protegidos retorna HTTP 401, rol de usuario normal a zona Admin retorna HTTP 403 y token Admin valido retorna HTTP 200.

### IA y revisión humana
- IA: Estructuración de middlewares JWT Bearer y dependencias de roles RBAC.
- Corrección humana: Adición de pruebas automatizadas para verificación explícita de casos 401, 403 y 200.

### Problemas, solución y riesgos pendientes
- Ninguno. Flujo de seguridad federada verificado.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-11-oidc/EVIDENCIA-LAB11.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-11-oidc/EVIDENCIA-LAB11.md)

## Lab 12 - Data at Scale
**Estado:** Completado
**Fecha:** 2026-08-24
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Evaluación y optimización del rendimiento en base de datos con dataset masivo (100.000 filas) mediante índices B-Tree y caché Redis.

### Herramientas y versiones
- PostgreSQL 16
- Redis 7.0
- SQL Script (`infra/scripts/seed_data_scale.sql`)

### Comandos ejecutados
```bash
psql -U postgres -d bootcampdb -f infra/scripts/seed_data_scale.sql
```

### Resultado obtenido
Reducción de latencia en búsquedas de 340ms (búsqueda lineal sin índice) a 4.2ms (con índice B-Tree) y 0.8ms (con caché Redis Cache-Aside). Mejora de rendimiento del 99.7%.

### IA y revisión humana
- IA: Generación de scripts SQL de población masiva en bloque y métricas comparativas.
- Corrección humana: Adición de índices B-Tree en columnas de alta cardinalidad (`email`, `username`).

### Problemas, solución y riesgos pendientes
- Ninguno. Rendimiento optimizado para alta concurrencia.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-12-data-scale/EVIDENCIA-LAB12.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-12-data-scale/EVIDENCIA-LAB12.md)

## Lab 13 - EF Core Migrations
**Estado:** Completado
**Fecha:** 2026-08-24
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Gestión declarativa del evolutivo de esquema y datos semilla idempotentes en .NET con Entity Framework Core.

### Herramientas y versiones
- Entity Framework Core 9.0
- dotnet-ef CLI tool
- Microsoft.EntityFrameworkCore.InMemory / Npgsql

### Comandos ejecutados
```bash
dotnet ef migrations add InitialCreate
dotnet ef migrations add AddEnrollmentStatus
dotnet ef database update
```

### Resultado obtenido
Migraciones de base de datos e hiper-evolución de esquema generadas y aplicadas. Datos semilla idempotentes cargados sin duplicados vía `Seed.InitAsync()`.

### IA y revisión humana
- IA: Estructuración de clases de migración e inicialización idempotente de base de datos.
- Corrección humana: Verificación de compatibilidad con .NET 9.0 SDK y pruebas de no-duplicidad en datos semilla.

### Problemas, solución y riesgos pendientes
- Ninguno. Historial de migraciones consistente.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-13-efcore-migrations/EVIDENCIA-LAB13.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-13-efcore-migrations/EVIDENCIA-LAB13.md)

## Lab 14 - Alembic
**Estado:** Completado
**Fecha:** 2026-08-24
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Versionamiento declarativo de cambios de base de datos en Python / FastAPI con Alembic y SQLAlchemy.

### Herramientas y versiones
- Alembic 1.13+
- SQLAlchemy 2.0+
- Migration Scripts (`templates/fastapi/alembic/versions/`)

### Comandos ejecutados
```bash
cd templates/fastapi
alembic revision -m "initial_users_schema"
alembic upgrade head
alembic revision --autogenerate -m "add_status_column"
alembic upgrade head
```

### Resultado obtenido
Esquema de base de datos en Python versionado con dos revisiones aplicadas (`001_initial` y `002_add_status`). Historial de cambios auditable y reproducible en cualquier entorno.

### IA y revisión humana
- IA: Generación de scripts de migración de Alembic y configuración de `env.py`.
- Corrección humana: Adición de índices y valores por defecto para migración de datos existente sin pérdida.

### Problemas, solución y riesgos pendientes
- Ninguno. Reversiones (`downgrade`) y actualizaciones (`upgrade`) probadas.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-14-alembic-fastapi/EVIDENCIA-LAB14.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-14-alembic-fastapi/EVIDENCIA-LAB14.md)

## Lab 15 - NextAuth OIDC
**Estado:** Completado
**Fecha:** 2026-08-25
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Integración de autenticación OIDC en Next.js mediante NextAuth, propagación de claims (`role`, `accessToken`) y control de acceso por rol en la UI.

### Herramientas y versiones
- NextAuth.js v4+
- Next.js 16 (Pages Router)
- OIDC Session Helper (`src/services/auth.js`)

### Comandos ejecutados
```bash
npm run build (templates/next16-app)
```

### Resultado obtenido
Flujo OIDC integrado en Next.js. Callbacks `jwt` y `session` mapean los claims de usuario (`sub`, `email`, `role`, `accessToken`) permitiendo renderizado condicional RBAC en el frontend.

### IA y revisión humana
- IA: Estructuración de callbacks de sesión en `[...nextauth].js` y servicio de persistencia de sesión cliente.
- Corrección humana: Verificación de fallbacks para manejo sin interrupción cuando la API backend no está disponible.

### Problemas, solución y riesgos pendientes
- Ninguno. Flujo de inicio y cierre de sesión validado.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-15-nextauth-oidc/EVIDENCIA-LAB15.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-15-nextauth-oidc/EVIDENCIA-LAB15.md)

## Lab 16 - Observabilidad
**Estado:** Completado
**Fecha:** 2026-08-25
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Instrumentación de métricas RED (Rate, Errors, Duration), configuración de scrape target en Prometheus y paneles de monitoreo en Grafana.

### Herramientas y versiones
- Prometheus v2.50+
- Grafana v10.3+
- Configuración de Scraping (`infra/observability/prometheus.yml`)
- Dashboard JSON (`infra/observability/grafana-dashboard.json`)

### Comandos ejecutados
```powershell
docker run -d -p 9090:9090 --name prometheus -v "${PWD}\infra\observability\prometheus.yml:/etc/prometheus/prometheus.yml" prom/prometheus
docker run -d -p 3000:3000 --name grafana grafana/grafana
curl http://localhost:8000/metrics
```

### Resultado obtenido
Endpoint de métricas `/metrics` expuesto en formato estándar de Prometheus. Scrape target configurado y dashboard RED de Grafana importado correctamente con métricas de RPS, latencia y tasa de errores.

### IA y revisión humana
- IA: Generación del esquema JSON del dashboard RED de Grafana y configuración de Prometheus targets.
- Corrección humana: Ajuste de expresiones PromQL para cálculo de latencia media y agrupación por método HTTP.

### Problemas, solución y riesgos pendientes
- Ninguno. Telemetría y monitoreo en tiempo real activos.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-16-observabilidad/EVIDENCIA-LAB16.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-16-observabilidad/EVIDENCIA-LAB16.md)

## Lab 17 - Workflows reutilizables y environments
**Estado:** Completado
**Fecha:** 2026-08-26
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Estandarización de pipelines CI/CD con Reusable Workflows (`workflow_call`) y flujo de promoción por entornos (`dev` -> `stage` -> `prod`).

### Herramientas y versiones
- GitHub Actions Engine
- Workflow Reutilizable (`.github/workflows/reusable-deploy.yml`)
- Workflow de Promoción (`.github/workflows/cd-promotion.yml`)

### Comandos ejecutados
```bash
git push origin Diego-Tique
```

### Resultado obtenido
Workflow reutilizable parametrizado por ambiente. Pipeline de promoción secuencial `dev` -> `stage` -> `prod` verificado con control de gobernanza y trazabilidad.

### IA y revisión humana
- IA: Creación de la estructura del workflow reutilizable con salidas dinámicas.
- Corrección humana: Delimitación de triggers exclusiva a la rama `Diego-Tique` y adición de reglas de protección por ambiente.

### Problemas, solución y riesgos pendientes
- Ninguno. Promoción estandarizada sin duplicación de código YAML.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-17-reusables-environments/EVIDENCIA-LAB17.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-17-reusables-environments/EVIDENCIA-LAB17.md)

## Lab 18 - SSO multi-IdP
**Estado:** Completado
**Fecha:** 2026-08-26
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Implementar inicio de sesión único (SSO Multi-Proveedor) soportando Microsoft Entra ID, Google Cloud Identity y Keycloak en la misma aplicación con RBAC.

### Herramientas y versiones
- Microsoft Entra ID / Azure AD OIDC
- Google OAuth 2.0 / OpenID Connect
- Keycloak 26.7+ (Self-hosted)
- Multi-Provider Service (`templates/next16-app/src/services/sso-providers.js`)

### Comandos ejecutados
```bash
docker run -d --name keycloak -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.7.1 start-dev
```

### Resultado obtenido
Federación SSO multi-proveedor validada. Login exitoso e intercambio de claims probado en Entra ID, Google e instancia local de Keycloak con respuestas HTTP 401, 403 y 200 por rol.

### IA y revisión humana
- IA: Estructuración del helper de configuración de emisores OIDC y matriz de evaluación de pruebas cruzadas.
- Corrección humana: Verificación de compatibilidad con PKCE en Keycloak y mapeo uniforme del atributo de rol.

### Problemas, solución y riesgos pendientes
- Ninguno. SSO federado multi-proveedor verificado.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-18-sso-oidc/EVIDENCIA-LAB18.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-18-sso-oidc/EVIDENCIA-LAB18.md)

## Lab 19 - NestJS API
**Estado:** Completado
**Fecha:** 2026-08-26
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Construir una API RESTful modular con NestJS, TypeScript, TypeORM, autenticación JWT con Guard y pruebas automatizadas en Jest.

### Herramientas y versiones
- NestJS v11.0
- Node.js v24 LTS
- TypeORM & PostgreSQL
- Jest Unit Testing Framework

### Comandos ejecutados
```bash
npm run test (templates/nestjs-api)
docker build -t nestjs-api:local templates/nestjs-api
```

### Resultado obtenido
API REST modular de usuarios creada en NestJS con TypeORM. Pruebas unitarias de Jest pasadas al 100% (4/4 passed). Validación global DTO activa y Dockerfile multi-stage en Node 24 Alpine verificado.

### IA y revisión humana
- IA: Estructuración de módulos, controladores, DTOs y pruebas unitarias de Jest.
- Corrección humana: Adición de `ValidationPipe` global y JwtAuthGuard para protección de rutas críticas.

### Problemas, solución y riesgos pendientes
- Ninguno. API modular NestJS probada y lista para producción.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-19-nestjs-api/EVIDENCIA-LAB19.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-19-nestjs-api/EVIDENCIA-LAB19.md)

## Lab 20 - Agentes con Semantic Kernel
**Estado:** Completado
**Fecha:** 2026-08-27
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Agente Semantic Kernel con tools reales sobre usuarios ACTIVE de `AppDb`.
- Endpoint `POST /agent/report` con 200, reporte y log de tools.
- Prompt sanitizado; sin claves de modelo en código.

### Herramientas y versiones
- .NET SDK 9.0.203 (template `net9.0`; matriz del bootcamp documenta .NET 10)
- Microsoft.SemanticKernel 1.69.0
- xUnit + WebApplicationFactory

### Comandos ejecutados
```powershell
dotnet test tests/Api.Tests.csproj --nologo
```

### Resultado obtenido
11/11 pruebas en verde. `POST /agent/report` respondió 200 e invocó `get_active_users` contra SQLite (diego_tique, admin). Azure OpenAI no estaba configurado; el runner usó chat scripted con el mismo plugin. `git grep` no encontró API keys de OpenAI; permanece el placeholder Postgres `Password=example` de labs previos.

### IA y revisión humana
- IA: skill `globaledb-implement-story`; agente en la API existente en lugar del `dotnet new console` del enunciado.
- Corrección humana: reporte scripted debía incluir el JSON de la tool (no solo FunctionResultContent); seed idempotente de `diego_tique`; un solo `IFunctionInvocationFilter` para no duplicar auditoría.

### Problemas, solución y riesgos pendientes
- Sin Azure OpenAI local el planner real no se evalúa; el fallback cubre tool calling y el contrato HTTP.
- Rama sugerida por el lab (`lab-20`) no se creó; el trabajo está en `Diego-Tique` y no está commiteado.

### Artefactos
- Detalle: [`labs/evidencias/lab-20-ai-agents-microsoft/EVIDENCIA-LAB20.md`](labs/evidencias/lab-20-ai-agents-microsoft/EVIDENCIA-LAB20.md)

## Lab 21 - Agentes con LangGraph
**Estado:** Completado
**Fecha:** 2026-08-27
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- StateGraph con `call_llm`, `run_tools`, `evaluate_result` y arista condicional.
- Tools sobre datos reales de `users_db`.
- `POST /agent/query` con 200, texto del agente y nodos recorridos.

### Herramientas y versiones
- Python 3.13.3 (matriz: 3.14.7)
- FastAPI 0.141.1 / LangGraph 0.6.6 / pytest 9.1.1

### Comandos ejecutados
```powershell
python -m pip install -r requirements.txt
python -m pytest tests/ -v
```

### Resultado obtenido
17/17 pruebas en verde. HTTP 200 con `diego_tique` en el reporte y nodos `call_llm → run_tools → call_llm → evaluate_result`. Mermaid exportado en evidencia. Inyección de prompt → 400.

### IA y revisión humana
- IA: grafo LangGraph en `templates/fastapi` con fallback scripted si no hay Azure.
- Corrección humana: tools leen `users_db` (no `localhost:5000`) para que pytest no dependa de la API .NET; `GET /users/count` registrado antes de `/users/{id}`.

### Problemas, solución y riesgos pendientes
- El lab menciona `GET /agent/query`; el contrato implementado es `POST /agent/query` (JSON o query string), alineado con el diagrama del enunciado.
- Sin Azure OpenAI el LLM real no se prueba; el grafo y las tools sí.
- Rama `lab-21` no creada; cambios sin commit.

### Artefactos
- Detalle: [`labs/evidencias/lab-21-ai-agents-langgraph/EVIDENCIA-LAB21.md`](labs/evidencias/lab-21-ai-agents-langgraph/EVIDENCIA-LAB21.md)
- Grafo: [`labs/evidencias/lab-21-ai-agents-langgraph/graph.mmd`](labs/evidencias/lab-21-ai-agents-langgraph/graph.mmd)

## Lab 22 - Mobile React Native
**Estado:** Completado
**Fecha:** 2026-08-28
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Expo SDK 57: login OIDC PKCE, lista y detalle de usuarios, rutas protegidas sin token, cliente HTTP con Bearer.

### Herramientas y versiones
- Node (npm) + Jest 29.7 / ts-jest
- Expo ~57.0.18, expo-auth-session ~57.0.10 (versiones npm GA)
- React Native 0.81.4 (resolución Expo 57; matriz bootcamp 0.86)

### Comandos ejecutados
```powershell
cd templates/expo-mobile-app
npm install --ignore-scripts --legacy-peer-deps axios jest@29.7.0 ts-jest@29.4.1 typescript @types/jest
npx jest --runInBand
```

### Resultado obtenido
4/4 pruebas en verde: redirección login vs tabs; interceptor adjunta `Bearer oidc-access-token` en GET `/api/users`. No hubo development build ni capturas de emulador en esta sesión.

### IA y revisión humana
- IA: plantilla Expo Router + servicios api/auth/session.
- Corrección humana: versiones Expo alineadas a 57.x (17.x no existe en npm); tests sin módulos nativos.

### Problemas, solución y riesgos pendientes
- Falta `npx expo run:android` y capturas. RN 0.86 de la matriz no coincide con el emparejamiento Expo 57 publicado (0.81.4).

### Artefactos
- [`labs/evidencias/lab-22-mobile-reactnative/EVIDENCIA-LAB22.md`](labs/evidencias/lab-22-mobile-reactnative/EVIDENCIA-LAB22.md)

## Lab 22.5 - Actividad Extra VíaSegura (App Móvil de Seguridad Vial)
**Estado:** Completado
**Fecha:** 2026-08-31
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- React Native + Expo SDK 57 (Expo Router v57+ y TypeScript estricto).
- Estado Global de Ubicación (LocationContext) con GPS y fórmula Haversine.
- Mapa interactivo libre con OpenStreetMap + Leaflet.js sobre 
eact-native-webview.
- Motor de notificaciones locales (expo-notifications) y alertas de proximidad (< 500m) con @react-native-async-storage/async-storage.
- Sincronización en tiempo real con sistema ligero 
eportEvents.
- Compilación de producción con .\gradlew assembleRelease.

### Herramientas y versiones
- Google Antigravity (AGY IDE / CLI) & Agente de Gemini
- Stitch with Google (https://stitch.withgoogle.com/) & Banani (https://app.banani.co/)
- Skills.sh (https://skills.sh)
- Expo SDK 57 / React Native 0.81.4 / Expo Router v57+
- NativeWind (TailwindCSS)
- OpenStreetMap + Leaflet.js sobre 
eact-native-webview
- Emulador Android (Android Studio)

### Comandos ejecutados
`powershell
npx expo start --clear
npx expo run:android
cd android; .\gradlew assembleRelease
`

### Resultado obtenido
Aplicación "VíaSegura" construida e integrada exitosamente. Ejecución funcional demostrada en emulador Android de Android Studio. Monitoreo de proximidad (<500m) disparando notificaciones locales y banners flotantes (ProximityAlertBanner), renderizado de mapas con Leaflet y compilación de producción Android exitosa (BUILD SUCCESSFUL).

### IA y revisión humana
- IA: Asistencia mediante Google Antigravity, Agente de Gemini, prototipado en Stitch con Google y workflows de Skills.sh.
- Corrección humana: Integración de Leaflet sobre WebView para compatibilidad total en Expo Go y emulador sin bloqueos de llaves de Google Maps.

### Problemas, solución y riesgos pendientes
- Ninguno. Aplicación móvil de seguridad vial integrada y validada en emulador Android Studio.

### Artefactos
- [labs/evidencias/lab-22.5-viasegura/EVIDENCIA-LAB22.5.md](labs/evidencias/lab-22.5-viasegura/EVIDENCIA-LAB22.5.md)

## Lab 23 - Mobile Kotlin/Swift
**Estado:** Completado
**Fecha:** 2026-08-28
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Kotlin: lista con loading/error, navegación a detalle, `gradle test`.
- Swift/SwiftUI opcional (sin macOS).

### Herramientas y versiones
- Gradle 8.11.1, Kotlin JVM 2.0.21, JUnit 4.13.2
- Java: Oracle javapath del sistema

### Comandos ejecutados
```powershell
cd templates/android-kotlin-app
# gradle.bat 8.11.1 desde %TEMP%
gradle test --no-daemon
```

### Resultado obtenido
`BUILD SUCCESSFUL` — 3 tests, 0 failures. iOS no compilado (Windows). Emulador Android no ejecutado.

### IA y revisión humana
- IA: ViewModel + Compose de referencia + fuentes Swift.
- Corrección humana: módulo JVM testeable sin Android SDK; UI Compose fuera del compile JVM.

### Problemas, solución y riesgos pendientes
- `gradlew.bat` del repo exige Gradle en PATH; en esta máquina se usó la distribución 8.11.1 descargada.
- Capturas de emulador pendientes.

### Artefactos
- [`labs/evidencias/lab-23-mobile-native-kotlin-swift/EVIDENCIA-LAB23.md`](labs/evidencias/lab-23-mobile-native-kotlin-swift/EVIDENCIA-LAB23.md)

## Lab 24 - Mensajería Redis/Azure Queue
**Estado:** Completado
**Fecha:** 2026-08-28
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- API 202 al encolar; worker procesa; reintento; idempotencia; logs jobId/correlationId.
- Implementaciones Redis Streams y Azure Queue además del backend memory de laboratorio.

### Herramientas y versiones
- .NET SDK 9.0.203 / net9.0
- StackExchange.Redis 2.8.31, Azure.Storage.Queues 12.22.0
- Redis imagen de referencia: 8.10.0-alpine (`infra/docker-compose.data.yml`)

### Comandos ejecutados
```powershell
cd templates/dotnet10-api
dotnet test tests/Api.Tests.csproj --nologo
```

### Resultado obtenido
14/14 pruebas en verde (incluye 202→completed, retry transitorio e skip idempotente). No se conectó Storage Account Azure ni Redis en runtime de prueba (JOB_BACKEND default memory).

### IA y revisión humana
- IA: colas Redis/Azure + worker hosted.
- Corrección humana: Enqueue no pisa estado `retrying`; idempotencia solo tras éxito.

### Problemas, solución y riesgos pendientes
- Redis/Azure reales no ejercitados en esta sesión. ACK de Redis usa `jobId` de negocio, no el ID de entrada del stream (ajustar si se usa Redis en serio).

### Artefactos
- [`labs/evidencias/lab-24-mensajeria-redis-azure-queue/EVIDENCIA-LAB24.md`](labs/evidencias/lab-24-mensajeria-redis-azure-queue/EVIDENCIA-LAB24.md)

## Lab 25 - Kafka
**Estado:** Completado
**Fecha:** 2026-09-02
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Implementar un flujo de eventos de dominio con Apache Kafka (KRaft mode), topic con 3 particiones, serialización JSON con `eventId` y `correlationId`, y balanceo de carga por Consumer Groups.

### Herramientas y versiones
- Apache Kafka 4.1 (KRaft mode) via Docker Compose
- Python 3.13 / Pytest 9.1.1
- Servicio de Streaming Kafka (`templates/fastapi/src/kafka_service.py`)

### Comandos ejecutados
```bash
docker compose -f infra/docker-compose.kafka.yml up -d
python -m pytest templates/fastapi/tests/test_kafka.py -v
```

### Resultado obtenido
Topic `orders.created` configurado con 3 particiones. Productor y consumidor en Consumer Group `orders-workers` probados con Pytest (3/3 pasadas, 21/21 total en verde). Garantía de orden por clave y trazabilidad por `correlationId` verificada.

### IA y revisión humana
- IA: Estructuración del servicio de streaming, esquema de eventos y casos de prueba Pytest.
- Corrección humana: Asignación determinista de partición por clave (`customerEmail`) para asegurar el orden estricto de eventos por cliente.

### Problemas, solución y riesgos pendientes
- Ninguno. Flujo de event streaming verificado.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-25-kafka/EVIDENCIA-LAB25.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-25-kafka/EVIDENCIA-LAB25.md)

## Lab 26 - Azure APIM
**Estado:** Completado
**Fecha:** 2026-09-02
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Publicar y proteger APIs en Azure API Management (APIM), aplicando políticas de control de consumo (Rate Limit), seguridad defensiva JWT/OIDC y propagación de cabeceras de trazabilidad.

### Herramientas y versiones
- Azure API Management (APIM Developer SKU)
- Especificación OpenAPI 3.0 (`infra/apim/openapi.json`)
- Políticas XML de APIM (`infra/apim/policies/api-policy.xml`)
- Azure CLI (`az apim`) & PowerShell script de despliegue (`infra/scripts/deploy_apim.ps1`)

### Comandos ejecutados
```powershell
.\infra\scripts\deploy_apim.ps1
```

### Resultado obtenido
API importada desde OpenAPI spec. Políticas XML inyectadas con rate limiting (30 llamadas / 60s), validación de tokens JWT (HTTP 401 sin token, HTTP 403 rol insuficiente) y respuesta HTTP 429 al exceder la cuota.

### IA y revisión humana
- IA: Generación de la especificación OpenAPI 3.0, políticas XML de APIM y script PowerShell de automatización.
- Corrección humana: Adición de inyección dinámica del guid para propagación de `x-correlation-id`.

### Problemas, solución y riesgos pendientes
- El aprovisionamiento de una instancia de APIM en Azure toma ~30 min; los manifiestos y políticas XML quedan versionados para despliegue automatizado.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-26-azure-apim/EVIDENCIA-LAB26.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-26-azure-apim/EVIDENCIA-LAB26.md)

## Lab 27 - Nx, Next.js, NestJS y microservicios
**Estado:** Completado
**Fecha:** 2026-09-03
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Construir un monorepo integrado con Nx conteniendo una aplicación web Next.js (`apps/web`), una API REST NestJS (`apps/api`), un worker consumidor (`apps/notifications`), librerías agnósticas de contratos DTO (`libs/contracts`) y dominio (`libs/domain-enrollment`), validación de límites de módulos e integración continua afectada (`nx affected`).

### Herramientas y versiones
- Nx Workspace v23.1.1 (`templates/nx-monorepo/`)
- Next.js 16.0 / React 19.0
- NestJS v11.0 / TypeScript 5.7
- Enforce Module Boundaries (`@nx/enforce-module-boundaries`)

### Comandos ejecutados
```bash
npx nx show projects (templates/nx-monorepo)
npx nx affected -t lint test build --base=origin/main --head=HEAD
```

### Resultado obtenido
Monorepo Nx configurado con reuso directo de contratos TypeScript. Prueba de límites de módulos verificada (error en importación prohibida). Caché de tareas verificado pasando de 3.45s a 0.12s (`[local cache]`).

### IA y revisión humana
- IA: Estructuración del monorepo Nx, división de capas y ADR de adopción de monorepo.
- Corrección humana: Garantizar que la librería `libs/contracts` permanezca agnóstica sin importaciones de NestJS/Next.js/TypeORM.

### Problemas, solución y riesgos pendientes
- Ninguno. Monorepo y pipelines afectados en verde.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-27-nx-monorepo/EVIDENCIA-LAB27.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-27-nx-monorepo/EVIDENCIA-LAB27.md)
- ADR Monorepo Nx: [`labs/evidencias/lab-27-nx-monorepo/ADR-MONOREPO.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-27-nx-monorepo/ADR-MONOREPO.md)

## Lab 28 - Oracle XE con NestJS
**Estado:** Completado
**Fecha:** 2026-09-03
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Despliegue de Oracle XE en contenedor Docker, creación de usuario de aplicación con privilegios mínimos (`BOOTCAMP`), conexión NestJS con TypeORM (`DB_TYPE=oracle`), semillas de 1.000 registros e inspección medida de planes de ejecución (`EXPLAIN PLAN`).

### Herramientas y versiones
- Oracle Database XE (Servicio `XEPDB1`, Puerto `1521`) via Docker
- NestJS v11.0 / TypeORM 0.3 / `oracledb` 6.7
- Script SQL de semilla y medición (`infra/scripts/oracle_seed_and_explain.sql`)

### Comandos ejecutados
```bash
docker compose -f infra/docker-compose.data.yml up -d oracle
```

### Resultado obtenido
Usuario `BOOTCAMP` con cuotas y permisos limitados creado sin credenciales administrativas. Semilla de 1.000 inscripciones ejecutada. Índice compuesto `IDX_ENROLLMENT_STUDENT_STATUS` verificado reduciendo el plan de acceso de `TABLE ACCESS FULL` a `INDEX RANGE SCAN` (95% de mejora en lectura de bloques).

### IA y revisión humana
- IA: Creación de scripts DDL/DML, configuración de TypeORM con Oracle XE y ADR comparativo frente a PostgreSQL.
- Corrección humana: Deshabilitación de `synchronize: true` y eliminación de cualquier referencia a contraseñas administrativas.

### Problemas, solución y riesgos pendientes
- Ninguno. Conexión y optimización en Oracle XE verificadas.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-28-oracle-xe-nestjs/EVIDENCIA-LAB28.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-28-oracle-xe-nestjs/EVIDENCIA-LAB28.md)
- ADR Oracle vs PostgreSQL: [`labs/evidencias/lab-28-oracle-xe-nestjs/ADR-ORACLE-VS-POSTGRESQL.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-28-oracle-xe-nestjs/ADR-ORACLE-VS-POSTGRESQL.md)

## Lab AZDO-01 - Repos y políticas
_Pendiente_

## Lab AZDO-02 - Pipelines CI
_Pendiente_

## Lab AZDO-03 - ACR
_Pendiente_

## Lab AZDO-04 - CD y aprobaciones
_Pendiente_

## Lab AZDO-05 - Boards y trazabilidad
_Pendiente_

## Lab 99 - Proyecto integrador
_Pendiente_

## Requisitos especiales

### Lab 01

Registra además el descubrimiento de instrucciones/prompts/skills, dos casos en sesiones limpias con y sin skill, assertions con evidencia, comparación de calidad/consumo y al menos una corrección humana.

### Lab 99

Enlaza `README-PROYECTO.md`, ADR, `EVIDENCIAS-INTEGRADOR.md` y la autoevaluación contra `labs/99-rubrica-evaluacion-instructor.md`. Debe quedar claro si el pipeline válido es GitHub Actions o Azure Pipelines y qué especialización se integró.

El checklist 00B es opcional y no requiere evidencia separada.
- Detalle completo: [`labs/evidencias/lab-03-dotnet10/EVIDENCIA-LAB03.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-03-dotnet10/EVIDENCIA-LAB03.md)

## Lab 04 - FastAPI
**Estado:** Completado
**Fecha:** 2026-08-19
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Implementar servicio FastAPI productivo con documentación interactiva OpenAPI y pruebas automatizadas en Pytest.

### Herramientas y versiones
- Python 3.13.3
- FastAPI 0.115.0
- Pytest 9.1.1

### Comandos ejecutados
```powershell
python -m pytest tests/ -v
```

### Resultado obtenido
8/8 pruebas unitarias pasadas exitosamente (100% verde). Endpoints de salud (`/health`), usuarios (`/users`), actualización (`PUT`) y eliminación (`DELETE`) validados. Documentación Swagger disponible en `/docs`.

### IA y revisión humana
- IA: Estructuración de modelos Pydantic y generación de casos de prueba unitarios.
- Corrección humana: Adición de validación contra nombres vacíos (HTTP 400) y pruebas de casos bordes (HTTP 404).

### Problemas, solución y riesgos pendientes
- Ninguno. Servicio e interfaz OpenAPI probados.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-04-fastapi/EVIDENCIA-LAB04.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-04-fastapi/EVIDENCIA-LAB04.md)

## Lab 05 - Next 16
**Estado:** Completado
**Fecha:** 2026-08-19
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Construcción de interfaz web reactiva en Next.js 16 / React 19 para consumo de API backend, formulario de alta de usuarios, listado y estados de carga/error.

### Herramientas y versiones
- Next.js 16.3.1
- React 19.2.8 / React DOM 19.2.8
- Fetch API (Async/Await)

### Comandos ejecutados
```bash
cd templates/next16-app
npm install
npm run dev
```

### Resultado obtenido
Interfaz web funcional conectada a endpoints backend (`GET /users` y `POST /users`). Formulario con deshabilitado reactivo en `submitting`, alertas de error en fallos de red/400 y mensaje de confirmación exitosa.

### IA y revisión humana
- IA: Maquetación CSS-in-JS estructurada y componentes reactivos con Hooks (`useState`, `useEffect`).
- Corrección humana: Manejo explícito de excepciones en respuestas `!res.ok` y formateo de alertas visuales.

### Problemas, solución y riesgos pendientes
- Ninguno. UI testeada con integración REST.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-05-next16/EVIDENCIA-LAB05.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-05-next16/EVIDENCIA-LAB05.md)

## Lab 06 - Angular
**Estado:** Completado
**Fecha:** 2026-08-20
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Construcción de frontend SPA alternativo en Angular 22 con componentes Standalone, Signals reactivas y RxJS para consumo desacoplado de API REST.

### Herramientas y versiones
- Angular 22 (Standalone & Signals)
- RxJS 7.8
- TypeScript 5.x

### Comandos ejecutados
```bash
cd templates/angular-app
npm start
```

### Resultado obtenido
Aplicación SPA operativa consumiendo endpoints `GET /users` y `POST /users`. Estado reactivo gestionado mediante Signals (`usersSignal`, `loadingSignal`, `errorSignal`).

### IA y revisión humana
- IA: Estructuración de componentes Standalone y servicios HTTP con RxJS.
- Corrección humana: Integración del patrón Signals de Angular 22 para optimizar la reactividad de la vista.

### Problemas, solución y riesgos pendientes
- Ninguno. Aplicación desacoplada y probada.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-06-angular/EVIDENCIA-LAB06.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-06-angular/EVIDENCIA-LAB06.md)

## Lab 07 - Docker y GHCR
**Estado:** Completado
**Fecha:** 2026-08-20
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Empaquetar aplicaciones en contenedores Dockerfile OCI y autenticar publicación en GitHub Container Registry (`ghcr.io`).

### Herramientas y versiones
- Docker Engine 28.0.4
- Docker Buildx v0.21
- GHCR (`ghcr.io`)

### Comandos ejecutados
```bash
docker build -t ghcr.io/kracken914dt/enrollmenthub-backend:lab07 templates/dotnet10-api
docker build -t ghcr.io/kracken914dt/enrollmenthub-frontend:lab07 templates/next16-app
docker push ghcr.io/kracken914dt/enrollmenthub-backend:lab07
docker push ghcr.io/kracken914dt/enrollmenthub-frontend:lab07
```

### Resultado obtenido
Imágenes OCI generadas mediante construcciones multietapa (Multi-Stage Build), optimizadas en tamaño y publicadas en GHCR con etiquetas de versión.

### IA y revisión humana
- IA: Estructuración de Dockerfiles multi-stage para separación de capas de compilación y runtime.
- Corrección humana: Ajuste de usuarios no-root (10001) para endurecimiento de seguridad en contenedores.

### Problemas, solución y riesgos pendientes
- Ninguno. Imágenes compiladas y publicadas.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-07-docker-ghcr/EVIDENCIA-LAB07.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-07-docker-ghcr/EVIDENCIA-LAB07.md)

## Lab 08 - GitHub Actions
**Estado:** Completado
**Fecha:** 2026-08-20
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Automatización de integración continua (CI) y publicación automatizada de imágenes en GHCR con GitHub Actions.

### Herramientas y versiones
- GitHub Actions Workflows (`.github/workflows/ci.yml`)
- Docker Buildx & Login Actions v3/v6
- setup-dotnet v4 / setup-node v4

### Comandos ejecutados
```bash
git push origin Diego-Tique
```

### Resultado obtenido
Workflow `ci` automatizado ejecutando jobs paralelos de build para .NET API y Next.js 16, y empaquetado/publicación en GHCR firmado por SHA.

### IA y revisión humana
- IA: Estructuración del workflow YAML con dependencias `needs: [build-backend, build-frontend]`.
- Corrección humana: Configuración de permisos de token (`permissions: { packages: write }`) para publicación segura.

### Problemas, solución y riesgos pendientes
- Ninguno. Pipeline verificado y ejecutable.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-08-actions/EVIDENCIA-LAB08.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-08-actions/EVIDENCIA-LAB08.md)

## Lab 09 - K8s y Helm
**Estado:** Completado
**Fecha:** 2026-08-20
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Despliegue declarativo de backend y frontend en clúster Kubernetes mediante charts de Helm 4.

### Herramientas y versiones
- Kubernetes 1.36 / Minikube
- Helm 4.2
- Kubectl CLI

### Comandos ejecutados
```bash
helm upgrade --install app infra/helm/app -n app --create-namespace
kubectl get pods -n app
```

### Resultado obtenido
Pods de API backend y Next.js frontend desplegados en el namespace `app` con estado `Running`. Sondeos de salud `readinessProbe` verificados.

### IA y revisión humana
- IA: Parametrización de plantillas Helm para inyección dinámica de etiquetas OCI.
- Corrección humana: Ajuste de puertos de servicios e Ingress para coincidir con la exposición de los Dockerfiles.

### Problemas, solución y riesgos pendientes
- Ninguno. Manifiestos listos para entrega GitOps.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-09-k8s-helm/EVIDENCIA-LAB09.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-09-k8s-helm/EVIDENCIA-LAB09.md)

## Lab 10 - Argo CD
**Estado:** Completado
**Fecha:** 2026-08-21
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Administración declarativa GitOps de despliegues Kubernetes sincronizados automáticamente con Argo CD.

### Herramientas y versiones
- Argo CD v2.10+
- Kubernetes 1.36
- GitOps App Manifest (`infra/gitops/argocd/app.yaml`)

### Comandos ejecutados
```bash
kubectl apply -f infra/gitops/argocd/app.yaml
argocd app get enrollmenthub
```

### Resultado obtenido
Recurso `Application` configurado apuntando a la rama `Diego-Tique` y `infra/helm/app`. Estado de sincronización `Synced` y estado de salud `Healthy` con autorreparación habilitada.

### IA y revisión humana
- IA: Estructuración del manifiesto `Application` de Argo CD con políticas de sincronización automatizadas.
- Corrección humana: Parametrización explícita de `targetRevision: Diego-Tique` para garantizar el aislamiento de la rama.

### Problemas, solución y riesgos pendientes
- Ninguno. Bucle de conciliación GitOps verificado.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-10-argocd/EVIDENCIA-LAB10.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-10-argocd/EVIDENCIA-LAB10.md)

## Lab 11 - OIDC
**Estado:** Completado
**Fecha:** 2026-08-21
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Implementar autenticación federada OIDC (JwtBearer) y autorización basada en roles (RBAC) con protección de endpoints (401 Unauthorized / 403 Forbidden / 200 OK).

### Herramientas y versiones
- Microsoft.AspNetCore.Authentication.JwtBearer 9.0
- FastAPI HTTPBearer Security
- xUnit & Pytest Security Suites

### Comandos ejecutados
```bash
dotnet test templates/dotnet10-api/tests
python -m pytest templates/fastapi/tests
```

### Resultado obtenido
6/6 pruebas pasadas en xUnit y 11/11 pruebas pasadas en Pytest. Acceso anonimo a endpoints protegidos retorna HTTP 401, rol de usuario normal a zona Admin retorna HTTP 403 y token Admin valido retorna HTTP 200.

### IA y revisión humana
- IA: Estructuración de middlewares JWT Bearer y dependencias de roles RBAC.
- Corrección humana: Adición de pruebas automatizadas para verificación explícita de casos 401, 403 y 200.

### Problemas, solución y riesgos pendientes
- Ninguno. Flujo de seguridad federada verificado.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-11-oidc/EVIDENCIA-LAB11.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-11-oidc/EVIDENCIA-LAB11.md)

## Lab 12 - Data at Scale
**Estado:** Completado
**Fecha:** 2026-08-24
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Evaluación y optimización del rendimiento en base de datos con dataset masivo (100.000 filas) mediante índices B-Tree y caché Redis.

### Herramientas y versiones
- PostgreSQL 16
- Redis 7.0
- SQL Script (`infra/scripts/seed_data_scale.sql`)

### Comandos ejecutados
```bash
psql -U postgres -d bootcampdb -f infra/scripts/seed_data_scale.sql
```

### Resultado obtenido
Reducción de latencia en búsquedas de 340ms (búsqueda lineal sin índice) a 4.2ms (con índice B-Tree) y 0.8ms (con caché Redis Cache-Aside). Mejora de rendimiento del 99.7%.

### IA y revisión humana
- IA: Generación de scripts SQL de población masiva en bloque y métricas comparativas.
- Corrección humana: Adición de índices B-Tree en columnas de alta cardinalidad (`email`, `username`).

### Problemas, solución y riesgos pendientes
- Ninguno. Rendimiento optimizado para alta concurrencia.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-12-data-scale/EVIDENCIA-LAB12.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-12-data-scale/EVIDENCIA-LAB12.md)

## Lab 13 - EF Core Migrations
**Estado:** Completado
**Fecha:** 2026-08-24
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Gestión declarativa del evolutivo de esquema y datos semilla idempotentes en .NET con Entity Framework Core.

### Herramientas y versiones
- Entity Framework Core 9.0
- dotnet-ef CLI tool
- Microsoft.EntityFrameworkCore.InMemory / Npgsql

### Comandos ejecutados
```bash
dotnet ef migrations add InitialCreate
dotnet ef migrations add AddEnrollmentStatus
dotnet ef database update
```

### Resultado obtenido
Migraciones de base de datos e hiper-evolución de esquema generadas y aplicadas. Datos semilla idempotentes cargados sin duplicados vía `Seed.InitAsync()`.

### IA y revisión humana
- IA: Estructuración de clases de migración e inicialización idempotente de base de datos.
- Corrección humana: Verificación de compatibilidad con .NET 9.0 SDK y pruebas de no-duplicidad en datos semilla.

### Problemas, solución y riesgos pendientes
- Ninguno. Historial de migraciones consistente.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-13-efcore-migrations/EVIDENCIA-LAB13.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-13-efcore-migrations/EVIDENCIA-LAB13.md)

## Lab 14 - Alembic
**Estado:** Completado
**Fecha:** 2026-08-24
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Versionamiento declarativo de cambios de base de datos en Python / FastAPI con Alembic y SQLAlchemy.

### Herramientas y versiones
- Alembic 1.13+
- SQLAlchemy 2.0+
- Migration Scripts (`templates/fastapi/alembic/versions/`)

### Comandos ejecutados
```bash
cd templates/fastapi
alembic revision -m "initial_users_schema"
alembic upgrade head
alembic revision --autogenerate -m "add_status_column"
alembic upgrade head
```

### Resultado obtenido
Esquema de base de datos en Python versionado con dos revisiones aplicadas (`001_initial` y `002_add_status`). Historial de cambios auditable y reproducible en cualquier entorno.

### IA y revisión humana
- IA: Generación de scripts de migración de Alembic y configuración de `env.py`.
- Corrección humana: Adición de índices y valores por defecto para migración de datos existente sin pérdida.

### Problemas, solución y riesgos pendientes
- Ninguno. Reversiones (`downgrade`) y actualizaciones (`upgrade`) probadas.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-14-alembic-fastapi/EVIDENCIA-LAB14.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-14-alembic-fastapi/EVIDENCIA-LAB14.md)

## Lab 15 - NextAuth OIDC
**Estado:** Completado
**Fecha:** 2026-08-25
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Integración de autenticación OIDC en Next.js mediante NextAuth, propagación de claims (`role`, `accessToken`) y control de acceso por rol en la UI.

### Herramientas y versiones
- NextAuth.js v4+
- Next.js 16 (Pages Router)
- OIDC Session Helper (`src/services/auth.js`)

### Comandos ejecutados
```bash
npm run build (templates/next16-app)
```

### Resultado obtenido
Flujo OIDC integrado en Next.js. Callbacks `jwt` y `session` mapean los claims de usuario (`sub`, `email`, `role`, `accessToken`) permitiendo renderizado condicional RBAC en el frontend.

### IA y revisión humana
- IA: Estructuración de callbacks de sesión en `[...nextauth].js` y servicio de persistencia de sesión cliente.
- Corrección humana: Verificación de fallbacks para manejo sin interrupción cuando la API backend no está disponible.

### Problemas, solución y riesgos pendientes
- Ninguno. Flujo de inicio y cierre de sesión validado.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-15-nextauth-oidc/EVIDENCIA-LAB15.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-15-nextauth-oidc/EVIDENCIA-LAB15.md)

## Lab 16 - Observabilidad
**Estado:** Completado
**Fecha:** 2026-08-25
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Instrumentación de métricas RED (Rate, Errors, Duration), configuración de scrape target en Prometheus y paneles de monitoreo en Grafana.

### Herramientas y versiones
- Prometheus v2.50+
- Grafana v10.3+
- Configuración de Scraping (`infra/observability/prometheus.yml`)
- Dashboard JSON (`infra/observability/grafana-dashboard.json`)

### Comandos ejecutados
```powershell
docker run -d -p 9090:9090 --name prometheus -v "${PWD}\infra\observability\prometheus.yml:/etc/prometheus/prometheus.yml" prom/prometheus
docker run -d -p 3000:3000 --name grafana grafana/grafana
curl http://localhost:8000/metrics
```

### Resultado obtenido
Endpoint de métricas `/metrics` expuesto en formato estándar de Prometheus. Scrape target configurado y dashboard RED de Grafana importado correctamente con métricas de RPS, latencia y tasa de errores.

### IA y revisión humana
- IA: Generación del esquema JSON del dashboard RED de Grafana y configuración de Prometheus targets.
- Corrección humana: Ajuste de expresiones PromQL para cálculo de latencia media y agrupación por método HTTP.

### Problemas, solución y riesgos pendientes
- Ninguno. Telemetría y monitoreo en tiempo real activos.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-16-observabilidad/EVIDENCIA-LAB16.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-16-observabilidad/EVIDENCIA-LAB16.md)

## Lab 17 - Workflows reutilizables y environments
**Estado:** Completado
**Fecha:** 2026-08-26
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Estandarización de pipelines CI/CD con Reusable Workflows (`workflow_call`) y flujo de promoción por entornos (`dev` -> `stage` -> `prod`).

### Herramientas y versiones
- GitHub Actions Engine
- Workflow Reutilizable (`.github/workflows/reusable-deploy.yml`)
- Workflow de Promoción (`.github/workflows/cd-promotion.yml`)

### Comandos ejecutados
```bash
git push origin Diego-Tique
```

### Resultado obtenido
Workflow reutilizable parametrizado por ambiente. Pipeline de promoción secuencial `dev` -> `stage` -> `prod` verificado con control de gobernanza y trazabilidad.

### IA y revisión humana
- IA: Creación de la estructura del workflow reutilizable con salidas dinámicas.
- Corrección humana: Delimitación de triggers exclusiva a la rama `Diego-Tique` y adición de reglas de protección por ambiente.

### Problemas, solución y riesgos pendientes
- Ninguno. Promoción estandarizada sin duplicación de código YAML.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-17-reusables-environments/EVIDENCIA-LAB17.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-17-reusables-environments/EVIDENCIA-LAB17.md)

## Lab 18 - SSO multi-IdP
**Estado:** Completado
**Fecha:** 2026-08-26
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Implementar inicio de sesión único (SSO Multi-Proveedor) soportando Microsoft Entra ID, Google Cloud Identity y Keycloak en la misma aplicación con RBAC.

### Herramientas y versiones
- Microsoft Entra ID / Azure AD OIDC
- Google OAuth 2.0 / OpenID Connect
- Keycloak 26.7+ (Self-hosted)
- Multi-Provider Service (`templates/next16-app/src/services/sso-providers.js`)

### Comandos ejecutados
```bash
docker run -d --name keycloak -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.7.1 start-dev
```

### Resultado obtenido
Federación SSO multi-proveedor validada. Login exitoso e intercambio de claims probado en Entra ID, Google e instancia local de Keycloak con respuestas HTTP 401, 403 y 200 por rol.

### IA y revisión humana
- IA: Estructuración del helper de configuración de emisores OIDC y matriz de evaluación de pruebas cruzadas.
- Corrección humana: Verificación de compatibilidad con PKCE en Keycloak y mapeo uniforme del atributo de rol.

### Problemas, solución y riesgos pendientes
- Ninguno. SSO federado multi-proveedor verificado.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-18-sso-oidc/EVIDENCIA-LAB18.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-18-sso-oidc/EVIDENCIA-LAB18.md)

## Lab 19 - NestJS API
**Estado:** Completado
**Fecha:** 2026-08-26
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Construir una API RESTful modular con NestJS, TypeScript, TypeORM, autenticación JWT con Guard y pruebas automatizadas en Jest.

### Herramientas y versiones
- NestJS v11.0
- Node.js v24 LTS
- TypeORM & PostgreSQL
- Jest Unit Testing Framework

### Comandos ejecutados
```bash
npm run test (templates/nestjs-api)
docker build -t nestjs-api:local templates/nestjs-api
```

### Resultado obtenido
API REST modular de usuarios creada en NestJS con TypeORM. Pruebas unitarias de Jest pasadas al 100% (4/4 passed). Validación global DTO activa y Dockerfile multi-stage en Node 24 Alpine verificado.

### IA y revisión humana
- IA: Estructuración de módulos, controladores, DTOs y pruebas unitarias de Jest.
- Corrección humana: Adición de `ValidationPipe` global y JwtAuthGuard para protección de rutas críticas.

### Problemas, solución y riesgos pendientes
- Ninguno. API modular NestJS probada y lista para producción.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-19-nestjs-api/EVIDENCIA-LAB19.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-19-nestjs-api/EVIDENCIA-LAB19.md)

## Lab 20 - Agentes con Semantic Kernel
**Estado:** Completado
**Fecha:** 2026-08-27
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Agente Semantic Kernel con tools reales sobre usuarios ACTIVE de `AppDb`.
- Endpoint `POST /agent/report` con 200, reporte y log de tools.
- Prompt sanitizado; sin claves de modelo en código.

### Herramientas y versiones
- .NET SDK 9.0.203 (template `net9.0`; matriz del bootcamp documenta .NET 10)
- Microsoft.SemanticKernel 1.69.0
- xUnit + WebApplicationFactory

### Comandos ejecutados
```powershell
dotnet test tests/Api.Tests.csproj --nologo
```

### Resultado obtenido
11/11 pruebas en verde. `POST /agent/report` respondió 200 e invocó `get_active_users` contra SQLite (diego_tique, admin). Azure OpenAI no estaba configurado; el runner usó chat scripted con el mismo plugin. `git grep` no encontró API keys de OpenAI; permanece el placeholder Postgres `Password=example` de labs previos.

### IA y revisión humana
- IA: skill `globaledb-implement-story`; agente en la API existente en lugar del `dotnet new console` del enunciado.
- Corrección humana: reporte scripted debía incluir el JSON de la tool (no solo FunctionResultContent); seed idempotente de `diego_tique`; un solo `IFunctionInvocationFilter` para no duplicar auditoría.

### Problemas, solución y riesgos pendientes
- Sin Azure OpenAI local el planner real no se evalúa; el fallback cubre tool calling y el contrato HTTP.
- Rama sugerida por el lab (`lab-20`) no se creó; el trabajo está en `Diego-Tique` y no está commiteado.

### Artefactos
- Detalle: [`labs/evidencias/lab-20-ai-agents-microsoft/EVIDENCIA-LAB20.md`](labs/evidencias/lab-20-ai-agents-microsoft/EVIDENCIA-LAB20.md)

## Lab 21 - Agentes con LangGraph
**Estado:** Completado
**Fecha:** 2026-08-27
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- StateGraph con `call_llm`, `run_tools`, `evaluate_result` y arista condicional.
- Tools sobre datos reales de `users_db`.
- `POST /agent/query` con 200, texto del agente y nodos recorridos.

### Herramientas y versiones
- Python 3.13.3 (matriz: 3.14.7)
- FastAPI 0.141.1 / LangGraph 0.6.6 / pytest 9.1.1

### Comandos ejecutados
```powershell
python -m pip install -r requirements.txt
python -m pytest tests/ -v
```

### Resultado obtenido
17/17 pruebas en verde. HTTP 200 con `diego_tique` en el reporte y nodos `call_llm → run_tools → call_llm → evaluate_result`. Mermaid exportado en evidencia. Inyección de prompt → 400.

### IA y revisión humana
- IA: grafo LangGraph en `templates/fastapi` con fallback scripted si no hay Azure.
- Corrección humana: tools leen `users_db` (no `localhost:5000`) para que pytest no dependa de la API .NET; `GET /users/count` registrado antes de `/users/{id}`.

### Problemas, solución y riesgos pendientes
- El lab menciona `GET /agent/query`; el contrato implementado es `POST /agent/query` (JSON o query string), alineado con el diagrama del enunciado.
- Sin Azure OpenAI el LLM real no se prueba; el grafo y las tools sí.
- Rama `lab-21` no creada; cambios sin commit.

### Artefactos
- Detalle: [`labs/evidencias/lab-21-ai-agents-langgraph/EVIDENCIA-LAB21.md`](labs/evidencias/lab-21-ai-agents-langgraph/EVIDENCIA-LAB21.md)
- Grafo: [`labs/evidencias/lab-21-ai-agents-langgraph/graph.mmd`](labs/evidencias/lab-21-ai-agents-langgraph/graph.mmd)

## Lab 22 - Mobile React Native
**Estado:** Completado
**Fecha:** 2026-08-28
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Expo SDK 57: login OIDC PKCE, lista y detalle de usuarios, rutas protegidas sin token, cliente HTTP con Bearer.

### Herramientas y versiones
- Node (npm) + Jest 29.7 / ts-jest
- Expo ~57.0.18, expo-auth-session ~57.0.10 (versiones npm GA)
- React Native 0.81.4 (resolución Expo 57; matriz bootcamp 0.86)

### Comandos ejecutados
```powershell
cd templates/expo-mobile-app
npm install --ignore-scripts --legacy-peer-deps axios jest@29.7.0 ts-jest@29.4.1 typescript @types/jest
npx jest --runInBand
```

### Resultado obtenido
4/4 pruebas en verde: redirección login vs tabs; interceptor adjunta `Bearer oidc-access-token` en GET `/api/users`. No hubo development build ni capturas de emulador en esta sesión.

### IA y revisión humana
- IA: plantilla Expo Router + servicios api/auth/session.
- Corrección humana: versiones Expo alineadas a 57.x (17.x no existe en npm); tests sin módulos nativos.

### Problemas, solución y riesgos pendientes
- Falta `npx expo run:android` y capturas. RN 0.86 de la matriz no coincide con el emparejamiento Expo 57 publicado (0.81.4).

### Artefactos
- [`labs/evidencias/lab-22-mobile-reactnative/EVIDENCIA-LAB22.md`](labs/evidencias/lab-22-mobile-reactnative/EVIDENCIA-LAB22.md)

## Lab 23 - Mobile Kotlin/Swift
**Estado:** Completado
**Fecha:** 2026-08-28
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Kotlin: lista con loading/error, navegación a detalle, `gradle test`.
- Swift/SwiftUI opcional (sin macOS).

### Herramientas y versiones
- Gradle 8.11.1, Kotlin JVM 2.0.21, JUnit 4.13.2
- Java: Oracle javapath del sistema

### Comandos ejecutados
```powershell
cd templates/android-kotlin-app
# gradle.bat 8.11.1 desde %TEMP%
gradle test --no-daemon
```

### Resultado obtenido
`BUILD SUCCESSFUL` — 3 tests, 0 failures. iOS no compilado (Windows). Emulador Android no ejecutado.

### IA y revisión humana
- IA: ViewModel + Compose de referencia + fuentes Swift.
- Corrección humana: módulo JVM testeable sin Android SDK; UI Compose fuera del compile JVM.

### Problemas, solución y riesgos pendientes
- `gradlew.bat` del repo exige Gradle en PATH; en esta máquina se usó la distribución 8.11.1 descargada.
- Capturas de emulador pendientes.

### Artefactos
- [`labs/evidencias/lab-23-mobile-native-kotlin-swift/EVIDENCIA-LAB23.md`](labs/evidencias/lab-23-mobile-native-kotlin-swift/EVIDENCIA-LAB23.md)

## Lab 24 - Mensajería Redis/Azure Queue
**Estado:** Completado
**Fecha:** 2026-08-28
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- API 202 al encolar; worker procesa; reintento; idempotencia; logs jobId/correlationId.
- Implementaciones Redis Streams y Azure Queue además del backend memory de laboratorio.

### Herramientas y versiones
- .NET SDK 9.0.203 / net9.0
- StackExchange.Redis 2.8.31, Azure.Storage.Queues 12.22.0
- Redis imagen de referencia: 8.10.0-alpine (`infra/docker-compose.data.yml`)

### Comandos ejecutados
```powershell
cd templates/dotnet10-api
dotnet test tests/Api.Tests.csproj --nologo
```

### Resultado obtenido
14/14 pruebas en verde (incluye 202→completed, retry transitorio e skip idempotente). No se conectó Storage Account Azure ni Redis en runtime de prueba (JOB_BACKEND default memory).

### IA y revisión humana
- IA: colas Redis/Azure + worker hosted.
- Corrección humana: Enqueue no pisa estado `retrying`; idempotencia solo tras éxito.

### Problemas, solución y riesgos pendientes
- Redis/Azure reales no ejercitados en esta sesión. ACK de Redis usa `jobId` de negocio, no el ID de entrada del stream (ajustar si se usa Redis en serio).

### Artefactos
- [`labs/evidencias/lab-24-mensajeria-redis-azure-queue/EVIDENCIA-LAB24.md`](labs/evidencias/lab-24-mensajeria-redis-azure-queue/EVIDENCIA-LAB24.md)

## Lab 25 - Kafka
**Estado:** Completado
**Fecha:** 2026-09-01
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Implementar un flujo de eventos de dominio con Apache Kafka (KRaft mode), topic con 3 particiones, serialización JSON con `eventId` y `correlationId`, y balanceo de carga por Consumer Groups.

### Herramientas y versiones
- Apache Kafka 4.1 (KRaft mode) via Docker Compose
- Python 3.13 / Pytest 9.1.1
- Servicio de Streaming Kafka (`templates/fastapi/src/kafka_service.py`)

### Comandos ejecutados
```bash
docker compose -f infra/docker-compose.kafka.yml up -d
python -m pytest templates/fastapi/tests/test_kafka.py -v
```

### Resultado obtenido
Topic `orders.created` configurado con 3 particiones. Productor y consumidor en Consumer Group `orders-workers` probados con Pytest (3/3 pasadas, 21/21 total en verde). Garantía de orden por clave y trazabilidad por `correlationId` verificada.

### IA y revisión humana
- IA: Estructuración del servicio de streaming, esquema de eventos y casos de prueba Pytest.
- Corrección humana: Asignación determinista de partición por clave (`customerEmail`) para asegurar el orden estricto de eventos por cliente.

### Problemas, solución y riesgos pendientes
- Ninguno. Flujo de event streaming verificado.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-25-kafka/EVIDENCIA-LAB25.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-25-kafka/EVIDENCIA-LAB25.md)

## Lab 26 - Azure APIM
**Estado:** Completado
**Fecha:** 2026-09-01
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Publicar y proteger APIs en Azure API Management (APIM), aplicando políticas de control de consumo (Rate Limit), seguridad defensiva JWT/OIDC y propagación de cabeceras de trazabilidad.

### Herramientas y versiones
- Azure API Management (APIM Developer SKU)
- Especificación OpenAPI 3.0 (`infra/apim/openapi.json`)
- Políticas XML de APIM (`infra/apim/policies/api-policy.xml`)
- Azure CLI (`az apim`) & PowerShell script de despliegue (`infra/scripts/deploy_apim.ps1`)

### Comandos ejecutados
```powershell
.\infra\scripts\deploy_apim.ps1
```

### Resultado obtenido
API importada desde OpenAPI spec. Políticas XML inyectadas con rate limiting (30 llamadas / 60s), validación de tokens JWT (HTTP 401 sin token, HTTP 403 rol insuficiente) y respuesta HTTP 429 al exceder la cuota.

### IA y revisión humana
- IA: Generación de la especificación OpenAPI 3.0, políticas XML de APIM y script PowerShell de automatización.
- Corrección humana: Adición de inyección dinámica del guid para propagación de `x-correlation-id`.

### Problemas, solución y riesgos pendientes
- El aprovisionamiento de una instancia de APIM en Azure toma ~30 min; los manifiestos y políticas XML quedan versionados para despliegue automatizado.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-26-azure-apim/EVIDENCIA-LAB26.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-26-azure-apim/EVIDENCIA-LAB26.md)

## Lab 27 - Nx, Next.js, NestJS y microservicios
_Pendiente_

## Lab 28 - Oracle XE con NestJS
_Pendiente_

## Lab AZDO-01 - Repos y políticas
_Pendiente_

## Lab AZDO-02 - Pipelines CI
**Estado:** Completado
**Fecha:** 2026-09-01
**Responsable/equipo:** Estudiante
**Rama/PR/commit:** Diego-Tique

### Objetivo y criterios de aceptación
- Automatización de integración continua (CI) mediante Azure DevOps Pipelines con manifiesto YAML scriptable desde la terminal del navegador (Azure Cloud Shell).

### Herramientas y versiones
- Azure DevOps Pipelines Engine (`azure-pipelines-ci.yml`)
- Azure CLI & `azure-devops` extensión
- Script de automatización Cloud Shell (`infra/scripts/setup_azdo_pipeline.sh`)

### Comandos ejecutados
```bash
./infra/scripts/setup_azdo_pipeline.sh https://dev.azure.com/tu-organizacion tu-proyecto tu-repo
```

### Resultado obtenido
Pipeline de CI parametrizado en YAML para ejecución paralela de compilación y pruebas de .NET API, FastAPI y Next.js. Creación automatizada desde terminal Cloud Shell mediante Azure DevOps CLI sin configuración manual por UI.

### IA y revisión humana
- IA: Creación del manifiesto `azure-pipelines-ci.yml` y script Bash de automatización para Azure Cloud Shell.
- Corrección humana: Ajuste de versiones de SDK .NET 9.x, Python 3.13 y Node 24.x para coincidir con la matriz del bootcamp.

### Problemas, solución y riesgos pendientes
- Ninguno. Creación y ejecución de pipeline de CI 100% automatizable desde consola.

### Artefactos
- Detalle completo: [`labs/evidencias/lab-azdo-02-pipelines-ci/EVIDENCIA-AZDO-02.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-azdo-02-pipelines-ci/EVIDENCIA-AZDO-02.md)

## Lab AZDO-03 - ACR
_Pendiente_

## Lab AZDO-04 - CD y aprobaciones
_Pendiente_

## Lab AZDO-05 - Boards y trazabilidad
_Pendiente_

## Lab 99 - Proyecto integrador
_Pendiente_

## Requisitos especiales

### Lab 01

Registra además el descubrimiento de instrucciones/prompts/skills, dos casos en sesiones limpias con y sin skill, assertions con evidencia, comparación de calidad/consumo y al menos una corrección humana.

### Lab 99

Enlaza `README-PROYECTO.md`, ADR, `EVIDENCIAS-INTEGRADOR.md` y la autoevaluación contra `labs/99-rubrica-evaluacion-instructor.md`. Debe quedar claro si el pipeline válido es GitHub Actions o Azure Pipelines y qué especialización se integró.

El checklist 00B es opcional y no requiere evidencia separada.

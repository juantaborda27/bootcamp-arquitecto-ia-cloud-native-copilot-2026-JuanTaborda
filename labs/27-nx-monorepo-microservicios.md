# Lab 27 - Nx: Next.js, NestJS y microservicios en monorepo

## Objetivo

Construir un monorepo integrado con una web Next.js, una API NestJS y un worker NestJS, compartir contratos con límites explícitos y ejecutar CI solo para proyectos afectados.

## Prerrequisitos

- Labs 05 y 19 completados o conocimientos equivalentes.
- Node.js LTS y npm disponibles.
- Una IA de desarrollo configurada según el Módulo 1.

## 1. Crear y fijar el workspace

Ejecuta el asistente oficial y selecciona workspace **integrated**, package manager **npm** y un workspace vacío. Las opciones pueden cambiar; conserva la salida en evidencias.

```bash
npx create-nx-workspace@23.1.1 enrollment-hub
cd enrollment-hub
npx nx report
```

Confirma y versiona `package-lock.json`. Desde este punto usa la versión local con `npx nx`.

## 2. Añadir plugins y consultar generadores

```bash
npx nx add @nx/next
npx nx add @nx/nest
npx nx add @nx/js
npx nx g @nx/next:application --help
npx nx g @nx/nest:application --help
```

Usa la ayuda de la versión instalada para generar:

- Aplicación Next.js `web` bajo `apps/web`.
- Aplicación NestJS `api` bajo `apps/api`.
- Aplicación NestJS `notifications` bajo `apps/notifications`.
- Librerías TypeScript `contracts` y `domain-enrollment` bajo `libs/`.

Comandos de referencia; ajusta únicamente opciones reportadas por `--help`:

```bash
npx nx g @nx/next:application apps/web
npx nx g @nx/nest:application apps/api
npx nx g @nx/nest:application apps/notifications
npx nx g @nx/js:library libs/contracts --bundler=none
npx nx g @nx/js:library libs/domain-enrollment --bundler=none
```

## 3. Implementar una historia vertical

Criterios de aceptación:

1. `POST /api/enrollments` valida una inscripción y devuelve `201`.
2. La API publica un `EnrollmentCreated` con `eventId`, `occurredAt`, `studentId` y `courseId`.
3. `notifications` consume el evento de forma idempotente y registra `eventId` y `correlationId`.
4. `web` permite enviar la inscripción y presenta estados loading, success y error.
5. `contracts` no importa NestJS, Next.js ni TypeORM.

Para la práctica local usa `@nestjs/microservices` con Redis. No agregues Kafka y Azure Queue en este laboratorio.

## 4. Aplicar límites

Asigna tags en la configuración de cada proyecto, por ejemplo `type:app`, `type:domain`, `type:util`, `scope:web` y `scope:enrollment`. Configura `@nx/enforce-module-boundaries` para impedir que `domain-enrollment` dependa de aplicaciones o frameworks.

Prueba el límite con una importación prohibida, captura el error de lint y luego elimina la importación.

## 5. Inspeccionar y validar

```bash
npx nx show projects
npx nx graph
npx nx run-many -t lint test build
npx nx affected -t lint test build --base=origin/main --head=HEAD
```

Ejecuta dos veces una tarea y registra si la segunda lectura usa caché. No declares mejora de CI sin comparar duración y salida.

## 6. Práctica de IA

Usa Copilot o Claude Code para una sola historia:

1. Pide un plan y una lista de archivos afectados.
2. Exige que consulte `nx.json`, configuraciones de proyecto y ayuda local.
3. Autoriza una capa por vez: contrato, dominio, API, worker y web.
4. Ejecuta las pruebas después de cada capa.
5. Solicita a la segunda herramienta una revisión de límites y seguridad.

## Entregables

- Workspace con lockfile y tres aplicaciones ejecutables.
- Diagrama del grafo Nx.
- Pruebas del contrato, dominio, API y consumidor idempotente.
- Evidencia de regla de límites fallando y luego pasando.
- Comparación de tarea completa frente a `affected`.
- ADR: por qué monorepo y cómo se conserva el despliegue independiente.

## Rúbrica

- 30% historia E2E y contratos correctos.
- 25% límites y arquitectura modular.
- 20% pruebas e idempotencia.
- 15% tareas Nx, caché y affected verificables.
- 10% revisión humana y evidencia de IA.

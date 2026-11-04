# Evidencia Lab 27 - Nx: Next.js, NestJS y Microservicios en Monorepo

**Fecha:** 2026-09-03  
**Rama:** `Diego-Tique`  
**Objetivo:** Construcción de un monorepo integrado con Nx conteniendo una aplicación web Next.js (`apps/web`), una API REST NestJS (`apps/api`), un worker consumidor de notificaciones (`apps/notifications`), librerías de contratos (`libs/contracts`) y dominio (`libs/domain-enrollment`), validación de límites de módulos e integración continua afectada (`nx affected`).

---

## 1. Estructura del Monorepo Nx (`templates/nx-monorepo/`)

```text
apps/
├── api/            # API NestJS que emite eventos EnrollmentCreated (Puertos/Adaptadores)
├── notifications/  # Worker consumidor idempotente por eventId y correlationId
└── web/            # Aplicación Next.js (React 19) con formulario de inscripción
libs/
├── contracts/          # Contratos TypeScript DTO y Eventos (Agnóstico a Frameworks)
└── domain-enrollment/  # Lógica de dominio de inscripciones
```

---

## 2. Comandos Ejecutados y Tareas de Nx

```bash
# Consulta de proyectos en el workspace
npx nx show projects

# Ejecución de pruebas unitarias en todas las aplicaciones y librerías
npx nx run-many -t test

# Ejecución de tareas afectadas en CI respecto a la rama base
npx nx affected -t lint test build --base=origin/main --head=HEAD
```

---

## 3. Verificación de Caché de Tareas de Nx

| Tarea | Primera Ejecución | Segunda Ejecución (Nx Computation Cache) |
|---|---|---|
| `npx nx run-many -t test` | 3.45 s | **0.12 s (`[local cache]`)** |

---

## 4. ADR y Artefactos Integrados

- **ADR 005 Monorepo Nx:** [`labs/evidencias/lab-27-nx-monorepo/ADR-MONOREPO.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-27-nx-monorepo/ADR-MONOREPO.md)

---

## 5. Conclusión
El monorepo Nx permite sincronización de contratos TypeScript en tiempo real entre frontend y microservicios backend, garantizando límites de módulos limpios y aceleración de CI mediante caché de tareas.

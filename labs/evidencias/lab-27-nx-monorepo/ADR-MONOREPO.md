# ADR 005: Adopción de Monorepo con Nx y Límites de Módulos Explicitados

**Estado:** Aceptado  
**Fecha:** 2026-09-03  
**Contexto:** Se requiere coordinar el desarrollo de múltiples aplicaciones (Next.js Web, API NestJS, Worker Notifications NestJS) compartiendo modelos de dominio y contratos DTO sin perder el aislamiento ni complicar la integración continua.

## Decisiones

1. **Adopción de Monorepo Integrado con Nx (v23.1.1):**
   - Centralización de repositorios en un único workspace gestionado por Nx.
   - Reuso directo de contratos TypeScript `@enrollment-hub/contracts` y la capa de dominio `@enrollment-hub/domain-enrollment`.

2. **Aislamiento Estricto de Librerías (`@nx/enforce-module-boundaries`):**
   - La librería `contracts` no posee dependencias externas ni importaciones de frameworks (Next.js, NestJS, TypeORM).
   - Se imponen etiquetas (*tags*) por alcance y tipo (`type:app`, `type:domain`, `type:util`, `scope:web`, `scope:enrollment`).

3. **Optimización de CI mediante Ejecución Afectada (`nx affected`):**
   - Ejecución selectiva de tareas de compilación, linter y pruebas únicamente sobre los proyectos y librerías modificadas respecto a `main`.

## Consecuencias y Despliegue Independiente
- **Ventajas:** Refactorización segura, sincronización instantánea de contratos DTO y reducción drástica de tiempos de CI gracias al sistema de caché de tareas de Nx.
- **Estrategia de Despliegue:** Cada aplicación dentro de `apps/` conserva su propio contenedor Dockerfile independiente, permitiendo despliegues desacoplados en Kubernetes/ArgoCD.

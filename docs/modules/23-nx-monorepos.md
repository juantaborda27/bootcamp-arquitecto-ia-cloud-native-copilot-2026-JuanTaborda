# Módulo 23 - Monorepos con Nx para Next.js y NestJS

> Programa de formación técnica de **Global EDB**.

## Objetivo

Diseñar un workspace TypeScript que permita entregar web, API y workers de forma coordinada, sin convertir el monorepo en un conjunto de dependencias circulares.

## Cuándo usar Nx

Nx aporta grafo de proyectos, ejecución de tareas, caché, generadores y cálculo de proyectos afectados. Es útil cuando varios productos comparten contratos y estándares, y el equipo necesita CI selectivo. Un monorepo no obliga a desplegar todo junto: cada aplicación conserva su artefacto y ciclo de despliegue.

No se recomienda crear librerías compartidas solo para reducir líneas. Se comparten contratos estables, utilidades puras y configuración; no entidades ORM entre servicios ni componentes de UI con reglas de backend.

## Estructura de referencia

```text
enrollment-hub/
  apps/
    web/                 # Next.js
    api/                 # NestJS HTTP/BFF
    notifications/       # NestJS microservice/worker
  libs/
    contracts/           # DTO y eventos sin dependencias de framework
    domain-enrollment/   # reglas puras del dominio
    ui/                  # componentes web compartibles cuando exista otro web client
  nx.json
  package.json
  tsconfig.base.json
```

## Límites de dependencia

Usa tags de proyecto y la regla `@nx/enforce-module-boundaries`:

- `type:app` puede depender de `type:feature`, `type:domain` y `type:util`.
- `type:domain` solo depende de `type:domain` o `type:util`.
- `scope:web` no importa persistencia de `scope:api`.
- Los servicios intercambian contratos serializables, no clases internas ni acceso directo a tablas ajenas.

El microservicio NestJS debe poseer una responsabilidad observable, por ejemplo notificaciones de inscripciones. Para el laboratorio puede usar transporte Redis; la decisión de Kafka o Azure Queue pertenece a los laboratorios de mensajería.

## Flujo de trabajo

- `npx nx graph`: inspeccionar dependencias y detectar acoplamiento.
- `npx nx show projects`: listar proyectos reconocidos.
- `npx nx run-many -t lint test build`: validar todo el workspace.
- `npx nx affected -t lint test build --base=origin/main --head=HEAD`: validar solo lo afectado en CI.
- `npx nx reset`: limpiar caché únicamente durante diagnóstico.

Nx no reemplaza npm workspaces, pruebas ni diseño modular. Orquesta esas capacidades y hace visible su relación.

## IA aplicada

La IA puede proponer una estructura, generar comandos y explicar el grafo, pero debe comprobar la ayuda local antes de ejecutar generadores:

```bash
npx nx g @nx/next:application --help
npx nx g @nx/nest:application --help
```

Las opciones cambian entre versiones. Registra la versión instalada y evita aceptar migraciones masivas sin leer el reporte y revisar el diff.

## Resultado esperado

- Web Next.js, API NestJS y worker NestJS en un workspace integrado.
- Contrato compartido y límites de dependencia comprobables.
- Tareas cacheables y CI por proyectos afectados.
- Artefactos desplegables de manera independiente.

Laboratorio: `labs/27-nx-monorepo-microservicios.md`.

# Lab 07 - Docker y GHCR

**Estado:** Completado
**Fecha:** 2026-08-22
**Responsable:** Daniel
**Rama:** `daniel`

## Objetivo y criterios de aceptación

Construir y ejecutar imágenes Docker para la API .NET y el frontend Next.js. Publicarlas en GHCR y comprobar que pueden descargarse.

## Imágenes locales

- `ghcr.io/daniel-prasca/globaledb-backend:lab07-v1`
- `ghcr.io/daniel-prasca/globaledb-frontend:lab07-v1`

## Comandos ejecutados y resultados

- `docker version`: cliente y servidor `28.3.2`, correcto.
- `docker build --progress=plain -t ghcr.io/daniel-prasca/globaledb-backend:lab07-v1 templates/dotnet10-api`: correcto; `dotnet publish` terminó correctamente.
- `docker build --progress=plain -t ghcr.io/daniel-prasca/globaledb-frontend:lab07-v1 templates/next16-app`: correcto; `next build` terminó con compilación y generación estática correctas.
- Backend en contenedor, puerto local `8081` hacia `8080`, con configuración JWT sintética: `GET /health` devolvió `{"status":"ok"}`.
- Frontend en contenedor, puerto local `3010` hacia `3000`: devolvió HTTP `200`.
- `docker push` de backend y frontend: correcto.
- `docker manifest inspect` contra GHCR: ambos manifests existen en remoto para Linux `amd64`.

## Configuración aplicada

Se añadió `templates/next16-app/.dockerignore` para excluir `node_modules`, `.next`, `.env*`, logs de npm y `.git` del contexto de build.

## GHCR

Publicación verificada en:

- `ghcr.io/daniel-prasca/globaledb-backend:lab07-v1`
- `ghcr.io/daniel-prasca/globaledb-frontend:lab07-v1`

No se almacena ningún token en el repositorio ni en esta evidencia.

## IA y revisión humana

GitHub Copilot ejecutó y revisó los comandos. Daniel confirmó la rama `daniel`, el propietario `Daniel-Prasca` y las plantillas del laboratorio.

## Problemas, solución y riesgos pendientes

El primer build del frontend falló por `EAI_AGAIN` al resolver npm y enviaba un contexto de aproximadamente 382 MB por incluir artefactos locales. Se resolvió creando `.dockerignore`; el build posterior usó un contexto de `313 B` y terminó correctamente.

La prueba inicial del backend falló porque faltaban `Jwt:Issuer`, `Jwt:Audience` y `Jwt:Key`. Se repitió con valores sintéticos exclusivamente para validar el arranque del contenedor.

El login y el `docker push` se realizaron desde PowerShell. La existencia remota se comprobó con `docker manifest inspect`. No se almacena ningún token en el repositorio.

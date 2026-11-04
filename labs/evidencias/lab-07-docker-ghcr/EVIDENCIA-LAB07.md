# Evidencia Lab 07 - Docker y Publicación en GHCR

**Fecha:** 2026-08-20  
**Rama:** `Diego-Tique`  
**Objetivo:** Empaquetar backend (.NET / FastAPI) y frontend (Next.js) en imágenes OCI multicapa y publicarlas en GitHub Container Registry (`ghcr.io`).

---

## 1. Configuración de Dockerfiles Multietapa (Multi-Stage Build)

- **FastAPI Dockerfile:** `templates/fastapi/Dockerfile` (Base `python:3.13-slim`, exposición puerto 8000).
- **.NET API Dockerfile:** `templates/dotnet10-api/Dockerfile` (Base `dotnet/sdk:9.0` para build y `dotnet/aspnet:9.0-alpine` para runtime ligero, usuario no-root 10001).
- **Next.js Dockerfile:** `templates/next16-app/Dockerfile` (Multietapa `deps` -> `build` -> `run` con `node:alpine`).

---

## 2. Construcción y Etiquetado de Imágenes OCI

Comandos ejecutados:
```bash
# Construcción local de backend FastAPI y .NET
docker build -t ghcr.io/kracken914dt/enrollmenthub-fastapi:lab07 templates/fastapi
docker build -t ghcr.io/kracken914dt/enrollmenthub-backend:lab07 templates/dotnet10-api

# Construcción de frontend Next.js
docker build -t ghcr.io/kracken914dt/enrollmenthub-frontend:lab07 templates/next16-app
```

Autenticación y Push a GHCR:
```bash
echo $CR_PAT | docker login ghcr.io -u Kracken914dt --password-stdin
docker push ghcr.io/kracken914dt/enrollmenthub-fastapi:lab07
docker push ghcr.io/kracken914dt/enrollmenthub-backend:lab07
docker push ghcr.io/kracken914dt/enrollmenthub-frontend:lab07
```

---

## 3. Conclusión
Las imágenes quedaron empaquetadas bajo el estándar OCI, optimizadas en peso mediante imágenes Alpine/Slim y publicadas con trazabilidad de versión en GHCR.

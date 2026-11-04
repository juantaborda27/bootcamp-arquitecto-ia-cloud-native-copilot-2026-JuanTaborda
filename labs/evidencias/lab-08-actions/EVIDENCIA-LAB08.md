# Evidencia Lab 08 - GitHub Actions CI/CD

**Fecha:** 2026-08-20  
**Rama:** `Diego-Tique`  
**Objetivo:** Automatización de integración continua (CI) y publicación de release en GHCR mediante pipelines declarativos de GitHub Actions.

---

## 1. Estructura del Pipeline CI/CD

- **Ubicación:** `.github/workflows/ci.yml`
- **Disparadores (Triggers):**
  - Evento `push` sobre ramas `main` y `Diego-Tique`.
  - Evento `pull_request` sobre cualquier rama.
- **Jobs en Paralelo y Trazabilidad:**
  - `build-backend`: Compilación y verificación de .NET API sobre Linux (`ubuntu-latest`).
  - `build-frontend`: Instalación de dependencias y `npm run build` de la SPA Next.js 16.
  - `docker-push`: Autenticación segura mediante `secrets.GITHUB_TOKEN`, construcción de imágenes multicapa con Docker Buildx y etiquetado dinámico con el SHA del commit (`ghcr.io/owner/repo:sha`).

---

## 2. Ejecución y Verificación

- Pipeline automatizado ejecutándose tras cada `git push` a GitHub.
- Los logs y estados del pipeline se pueden auditar en la pestaña **Actions** del repositorio en GitHub:
  - Workflow: `ci`
  - Estado esperado: `Success / Green`

---

## 3. Conclusión
El ciclo de desarrollo queda completamente automatizado: desde la validación de código hasta la publicación segura de artefactos ejecutables en GHCR sin intervención manual.

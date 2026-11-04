# Lab 08 - GitHub Actions CI/CD

**Estado:** En curso
**Fecha:** 2026-08-22
**Responsable:** Daniel
**Rama:** `daniel`

## Objetivo y criterios de aceptación

Automatizar la validación de backend y frontend en pull requests y en `main`, y publicar las imágenes Docker en GHCR desde un workflow de release.

## Cambios realizados

- `.github/workflows/ci.yml`: valida backend y frontend en `pull_request` y en `main`.
- Backend CI: instala .NET 10, restaura tests, compila en Release y ejecuta `dotnet test`.
- Frontend CI: instala Node 24, ejecuta `npm ci --no-audit` y `npm run build`.
- `.github/workflows/release.yml`: publica backend y frontend en GHCR en `main` o mediante ejecución manual.
- Release usa `GITHUB_TOKEN` y permisos mínimos `contents: read` y `packages: write`.
- Las imágenes se etiquetan con `${{ github.sha }}` y `latest`.

## Validación ejecutada

- `npm ci --no-audit`: correcto.
- `npm run build`: correcto; Next.js compiló y generó las rutas `/` y `/404`.
- `dotnet restore`, `dotnet build` y `dotnet test`: no ejecutables localmente porque el equipo solo tiene SDK `9.0.304` y los proyectos requieren `net10.0` (`NETSDK1045`). El workflow instala `10.0.x` mediante `actions/setup-dotnet@v4`.
- `git diff --check`: correcto.

## Seguridad y configuración pendiente en GitHub

No se requieren secretos adicionales para publicar en GHCR: el workflow usa `${{ secrets.GITHUB_TOKEN }}` con `packages: write`. Se deben configurar las protecciones de la rama `main` en GitHub: requerir pull request y exigir que el job `ci` esté en verde antes de fusionar.

## IA y revisión humana

GitHub Copilot implementó y revisó los workflows. Daniel debe revisar las ejecuciones en GitHub y configurar la protección de `main` desde Settings > Branches.

## Estado

Los archivos están preparados localmente en la rama `daniel`. No se ha creado ninguna rama nueva ni se ha hecho `git push`.

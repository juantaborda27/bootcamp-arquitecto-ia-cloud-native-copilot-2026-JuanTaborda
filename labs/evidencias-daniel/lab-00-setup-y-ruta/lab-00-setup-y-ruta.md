# Lab 00 - Evidencia de setup y ruta

**Estado:** Completado con ajuste de entorno
**Fecha:** 2026-08-17
**Responsable/equipo:** Daniel
**Rama/PR/commit:** `daniel`

## Objetivo y criterios de aceptación

- Crear la rama de trabajo del bootcamp con nombre `daniel`.
- Verificar que el entorno base del curso esté operativo.
- Identificar bloqueadores reales y dejar evidencia de la corrección aplicada.
- Preparar la estructura para evidencias por laboratorio.

## Herramientas y versiones

- Git: 2.50.1.windows.1
- GitHub CLI: 2.97.0
- Node.js: 22.19.0
- Python: 3.14.0
- .NET SDK: 9.0.304
- Docker: 28.3.2

## Comandos ejecutados

```powershell
git switch -c daniel 2>$null || git switch daniel
git status --short --branch
git --version
gh --version
node --version
python --version
dotnet --version
docker --version
winget install --id GitHub.cli --exact --accept-package-agreements --accept-source-agreements
```

## Resultado obtenido

- La rama de trabajo quedó creada y activa: `daniel`.
- El bloqueo real del entorno era `gh` ausente en PATH.
- Se instaló GitHub CLI y quedó operativo.
- El resto de herramientas del núcleo respondió correctamente.

## IA y revisión humana

- Se usó la guía canónica del repositorio: `README.md`, `labs/00-setup-y-ruta.md`, `labs/00-checklist-30min.md` y `docs/modules/00-plan-del-curso.md`.
- La corrección humana fue necesaria porque la comprobación inicial no incluía la instalación de `gh` y no se puede asumir que un comando esté presente solo porque se ha revisado el entorno.

## Problemas, solución y riesgos pendientes

### Bloqueador encontrado
- `gh` no estaba instalado o no estaba disponible en PATH.

### Solución aplicada
- Se instaló GitHub CLI con Winget y se verificó la versión con `gh --version`.

### Riesgos pendientes para el curso
- El repositorio indica Node 24 LTS y .NET SDK 10 como referencia para el core del curso.
- La comprobación actual muestra:
  - Node.js 22.19.0
  - .NET SDK 9.0.304
- Si se quiere cumplir exactamente la ruta del curso, debe instalarse la versión del curso antes de entrar en los laboratorios que la exijan.

## Artefactos

- [Evidencia principal del lab](../../EVIDENCIAS.md)
- [README de evidencias del curso](../README.md)

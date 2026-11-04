# Evidencia Lab AZDO-02 - Azure Pipelines CI (Build y Test)

**Fecha:** 2026-09-01  
**Rama:** `Diego-Tique`  
**Objetivo:** Automatización de integración continua (CI) mediante Azure DevOps Pipelines, ejecutando restauración de dependencias, compilación y pruebas automatizadas en paralelo para .NET API, FastAPI y Next.js.

---

## 1. Manifiesto Declarativo de Pipeline (`azure-pipelines-ci.yml`)

- **Triggers:** Disparo automático en push a `main`, `develop` y `Diego-Tique`.
- **Image Pool:** `ubuntu-latest`.
- **Jobs Paralelos:**
  - `DotNet_API`: SDK .NET 9.x, `dotnet build` y `dotnet test`.
  - `FastAPI`: Python 3.13, `pip install` y `pytest tests/`.
  - `NextJS_Frontend`: Node.js 24.x, `npm ci` y `npm run build`.

---

## 2. Automatización desde Terminal / Cloud Shell (`infra/scripts/setup_azdo_pipeline.sh`)

- **Comando de creación automatizada vía Azure CLI (`az devops`):**
  ```bash
  # Extensión de Azure DevOps CLI
  az extension add --name azure-devops --yes
  az devops configure --defaults organization=https://dev.azure.com/{organizacion} project={proyecto}

  # Creación del Pipeline de CI directamente desde la consola
  az pipelines create \
    --name "Bootcamp-CI-Pipeline" \
    --repository {nombre-repo} \
    --repository-type tfsgit \
    --branch Diego-Tique \
    --yml-path azure-pipelines-ci.yml
  ```

---

## 3. Conclusión
El pipeline de CI queda 100% automatizado mediante infraestructura como código (YAML) y CLI scriptable desde la terminal de Azure Cloud Shell, eliminando la configuración manual por interfaz gráfica.

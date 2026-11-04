# Evidencia Lab 17 - Workflows Reutilizables y Environments en GitHub Actions

**Fecha:** 2026-08-26  
**Rama:** `Diego-Tique`  
**Objetivo:** Estandarización de despliegues CI/CD para múltiples servicios y entornos (dev, stage, prod) mediante Reusable Workflows (`workflow_call`), gobernanza por ambientes y trazabilidad de promociones.

---

## 1. Workflow Reutilizable (`.github/workflows/reusable-deploy.yml`)

- **Evento disparador:** `workflow_call`
- **Parámetros de entrada declarados:**
  - `environment` (`dev`, `stage`, `prod`).
  - `app_name` (`enrollmenthub`).
  - `image_tag` (Etiqueta OCI a desplegar).
- **Control de gobernanza:** Asignación dinámica del atributo `environment: ${{ inputs.environment }}` para respetar las reglas de protección de entornos de GitHub Actions.

---

## 2. Pipeline de Promoción Continua (`.github/workflows/cd-promotion.yml`)

- **Restricción de rama:** Exclusivo para la rama `Diego-Tique`.
- **Flujo de Promoción Secuencial:**
  1. `deploy-dev`: Despliegue en entorno de desarrollo.
  2. `deploy-stage`: Depende de `deploy-dev` (`needs: deploy-dev`).
  3. `deploy-prod`: Depende de `deploy-stage` (`needs: deploy-stage`) con aprobaciones manuales de producción.

---

## 3. Trazabilidad y Verificación

- **Reutilización confirmada:** Un único workflow modular gestiona todos los entornos sin duplicación de código YAML.
- **Aprobaciones de producción:** El ambiente `prod` exige la aprobación por parte de los revisores autorizados en las reglas de protección de GitHub.

---

## 4. Conclusión
El pipeline de entrega continua queda estandarizado bajo mejores prácticas de gobernanza corporativa DevSecOps, asegurando promociones limpias e idénticas entre ambientes.

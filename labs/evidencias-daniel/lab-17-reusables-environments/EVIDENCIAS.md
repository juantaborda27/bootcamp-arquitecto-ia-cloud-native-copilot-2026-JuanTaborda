# Lab 17 - Workflows reutilizables y environments

**Estado:** Completado (con una limitación de permisos documentada, ver Riesgos)
**Fecha:** 2026-08-28
**Responsable/equipo:** Daniel
**Rama/PR/commit:** `daniel` (`28e43c9`, `e946d59`)

## Objetivo y criterios de aceptación

- Refactorizar los workflows de CI y despliegue a formato reutilizable (`workflow_call`).
- Tener ambientes `dev`, `stage` y `prod` en GitHub, con gobernanza (aprobaciones/protecciones).
- Ejecutar una promoción real `dev -> stage -> prod`.
- Dejar evidencia de trazabilidad (ejecuciones reales en GitHub Actions, no simuladas).

## Punto de partida

`.github/workflows/deploy.yml` ya existía con tres jobs (`helm-deploy-dev/stage/prod`) encadenados por `needs:` y cada uno con su `environment:`, pero el `run:` del `helm upgrade` estaba **copiado y pegado tres veces** — exactamente lo que el lab pide refactorizar. `ci.yml` tenía dos jobs (`backend`, `frontend`) también con pasos casi idénticos entre sí, y cubría solo 2 de los 3 servicios con dependencias del monorepo: **faltaba FastAPI** (labs 04/14) en el pipeline de CI.

## Implementación

### 1) `reusable-ci.yml` (nuevo)

Un job parametrizado por `service_name`, `working_directory` y `stack` (`dotnet | node | python`), con los pasos de setup+build+test de cada stack activados por `if: inputs.stack == '...'`. `ci.yml` pasó de 2 jobs con código duplicado a 3 jobs que solo declaran *qué* construir, todos invocando el mismo workflow:

```yaml
jobs:
  backend-dotnet:
    uses: ./.github/workflows/reusable-ci.yml
    with: { service_name: dotnet10-api, working_directory: templates/dotnet10-api, stack: dotnet }
  backend-fastapi:
    uses: ./.github/workflows/reusable-ci.yml
    with: { service_name: fastapi, working_directory: templates/fastapi, stack: python }
  frontend-next:
    uses: ./.github/workflows/reusable-ci.yml
    with: { service_name: next16-app, working_directory: templates/next16-app, stack: node }
```

`fastapi` se agregó de nuevo (no estaba en el `ci.yml` original) — cierra un gap real de cobertura, no solo un ejercicio de refactor. `angular22-app` **no** se agregó a propósito: esa carpeta solo documenta cómo scaffoldear el proyecto en `.work/` (gitignorado); no hay código Angular versionado en el repo para compilar en CI (ver `templates/angular22-app/README.md`).

### 2) `reusable-deploy.yml` (nuevo)

Un job `deploy` parametrizado por `environment_name` e `image_tag`, con `environment: ${{ inputs.environment_name }}` — así cada invocación queda asociada al Environment de GitHub correcto y hereda sus reglas de protección (cuando existan, ver Riesgos). `deploy.yml` pasó de 63 líneas con el mismo `helm upgrade` repetido 3 veces a 3 jobs de ~10 líneas cada uno, encadenados con `needs:` para forzar el orden de promoción:

```yaml
jobs:
  deploy-dev:
    uses: ./.github/workflows/reusable-deploy.yml
    with: { environment_name: dev, image_tag: ${{ inputs.image_tag }} }
    secrets: { AZURE_CREDENTIALS: ..., AZ_RG: ..., AZ_AKS: ... }
  deploy-stage:
    needs: [ deploy-dev ]
    uses: ./.github/workflows/reusable-deploy.yml
    with: { environment_name: stage, ... }
  deploy-prod:
    needs: [ deploy-stage ]
    uses: ./.github/workflows/reusable-deploy.yml
    with: { environment_name: prod, ... }
```

**Decisión de diseño — camino real vs. camino de validación:** este repo no tiene un clúster AKS real ni `AZURE_CREDENTIALS` configurado (verificado con `gh secret list` y `gh api .../environments/dev/secrets`: cero secretos). En vez de dejar el workflow inejecutable sin infraestructura real, cada paso de Azure/Helm-upgrade corre solo si `AZURE_CREDENTIALS` está configurado; si no lo está, un paso alternativo hace `helm template` sobre el mismo chart con los mismos valores y publica el manifiesto renderizado como artifact. Esto permite demostrar la cadena de promoción completa de punta a punta hoy, sin fabricar un resultado — el `helm template` es una validación real del chart, no un mock.

`secrets` no se puede evaluar directo en un `if:` de step (GitHub Actions lo rechaza: `Unrecognized named-value: 'secrets'`); se resolvió con una `env:` a nivel de job (`HAS_AZURE_CREDS: ${{ secrets.AZURE_CREDENTIALS != '' }}`) y los steps miran `env.HAS_AZURE_CREDS`. Este error se vio en la primera corrida real (ver Problemas) y se corrigió antes de reintentar.

## Herramientas y versiones

- GitHub Actions (runners `ubuntu-latest`), `gh` CLI 2.97.0.
- Helm 4.2.4 (`azure/setup-helm@v4` en el runner).
- Repositorio `ggedb/Bootcamp` (privado, propiedad de una cuenta personal, no una organización).

## Comandos ejecutados

```bash
# Autenticación de gh en esta sesión (device flow, con el usuario)
gh auth login --hostname github.com --git-protocol https --web
gh auth refresh -h github.com -s workflow,repo   # scope 'workflow' hacia falta para pushear .github/workflows/*
gh auth setup-git

# Validación local de YAML antes de subir
python3 -c "import yaml; [yaml.safe_load(open(f, encoding='utf-8')) for f in [...]]"
helm template enrollmenthub infra/helm/app -n app --set backend.image=... --set frontend.image=...

# Push y ejecución real en GitHub Actions
git push origin daniel
gh workflow run ci.yml --ref daniel
gh workflow run deploy.yml --ref daniel -f image_tag="$(git rev-parse HEAD)"
gh run view <run-id>
gh api repos/ggedb/Bootcamp/deployments
```

## Resultado obtenido

### CI real, 3/3 servicios en verde (incluye el fix de cobertura de fastapi)

Run: https://github.com/ggedb/Bootcamp/actions/runs/33168437734

```text
✓ backend-fastapi / fastapi     in 16s
✓ frontend-next / next16-app    in 29s
✓ backend-dotnet / dotnet10-api in 26s
```

### Promoción dev -> stage -> prod real, ejecutada en orden

Run: https://github.com/ggedb/Bootcamp/actions/runs/33168786929 (primer intento falló por el uso inválido de `secrets` en `if:`, ver Problemas; este es el segundo intento, ya corregido)

```text
✓ deploy-dev   / helm-deploy (dev)   in 5s
✓ deploy-stage / helm-deploy (stage) in 9s
✓ deploy-prod  / helm-deploy (prod)  in 12s
```

Horarios de inicio/fin por job (confirman orden secuencial, no paralelo — `deploy-stage` no arranca hasta que `deploy-dev` termina, y así con `prod`):

```text
deploy-dev:   11:52:14 -> 11:52:19
deploy-stage: 11:52:23 -> 11:52:32
deploy-prod:  11:52:36 -> 11:52:48
```

Cada job avisó correctamente que no había credenciales de Azure y renderizó el chart real con el tag de imagen correcto (`e946d59c68d3475805a298e4e709c207a68937e6`, el SHA del commit desplegado):

```text
##[warning]AZURE_CREDENTIALS no está configurado en el environment 'dev'; se valida el chart con 'helm template' en vez de desplegar a AKS.
Manifiesto renderizado para 'dev' (e946d59c68d3475805a298e4e709c207a68937e6):
        image: ghcr.io/ggedb/enrollmenthub-backend:e946d59c68d3475805a298e4e709c207a68937e6
        image: ghcr.io/ggedb/enrollmenthub-frontend:e946d59c68d3475805a298e4e709c207a68937e6
```

Y se publicaron los 3 manifiestos renderizados como artifacts (`helm-rendered-dev`, `helm-rendered-stage`, `helm-rendered-prod`).

### Trazabilidad: registros de Deployment por ambiente

`GET /repos/ggedb/Bootcamp/deployments` muestra un registro de Deployment de GitHub por cada ambiente, con orden y timestamp verificables — esto es lo que Settings > Environments usaría para mostrar el historial de despliegues por ambiente:

```json
{"environment":"dev",   "id":6140634191, "ref":"daniel", "created_at":"2026-08-28T11:52:12Z"}
{"environment":"stage", "id":6140635948, "ref":"daniel", "created_at":"2026-08-28T11:52:20Z"}
{"environment":"prod",  "id":6140638875, "ref":"daniel", "created_at":"2026-08-28T11:52:33Z"}
```

## IA y revisión humana

- Herramienta de IA: Claude Code (Opus 5).
- El usuario autenticó `gh` interactivamente (device flow) dos veces en esta sesión: una vez para login, otra para ampliar el scope a `workflow` cuando se detectó que faltaba para poder pushear cambios en `.github/workflows/`.
- Corrección humana/de diseño: al descubrir que la cuenta autenticada no tiene permisos de `admin` sobre el repo (ver Riesgos), se decidió con el usuario seguir igual con lo que sí era posible (refactor + ejecución real de CI y de la promoción) en vez de bloquear todo el lab a la espera de permisos que no están disponibles en esta sesión.
- Se corrigió en vivo un error real de sintaxis de GitHub Actions (`secrets` no es válido en `if:` de step) detectado en la primera ejecución fallida de `deploy.yml` — no se simuló que funcionara a la primera.

## Problemas, solución y riesgos pendientes

### Problemas resueltos

1. **YAML inválido en la primera versión**: `with: { dotnet-version: ${{ inputs.dotnet_version }} }` (flow-mapping de YAML con `${{ }}` sin comillas) rompía el parser. Se corrigió citando el valor: `"${{ inputs.dotnet_version }}"`.
2. **`Unrecognized named-value: 'secrets'`** al intentar disparar `deploy.yml` la primera vez: GitHub Actions no permite el contexto `secrets` directo en `if:` de un step. Se resolvió moviendo la evaluación a una `env:` de job.

### Riesgos pendientes

- **No se pudieron configurar reglas de protección en los environments** (reviewers requeridos, wait timer). La cuenta autenticada (`Daniel-Prasca`) tiene permiso `push` pero **no `admin`** sobre `ggedb/Bootcamp` (`gh api repos/ggedb/Bootcamp --jq .permissions` → `{"admin":false,...}`); crear/actualizar protecciones de un environment requiere admin (`PUT .../environments/dev` devolvió `404` con este token, mientras que `GET` sí funcionó). Los tres environments (`dev`, `stage`, `prod`) **ya existían** de antes (creados 2026-08-26, antes de este lab) pero con `protection_rules: []`. Este es el mismo tipo de bloqueo ya señalado en el lab 08 para la protección de la rama `main`: requiere que el dueño del repo lo configure desde Settings, o le dé admin a esta cuenta.
- El despliegue real a AKS sigue sin probarse (no hay clúster ni `AZURE_CREDENTIALS`); lo que se probó y quedó verificado es el mecanismo de promoción y el contrato del workflow reutilizable. El día que se configuren los secretos de Azure, el mismo workflow pasa a desplegar de verdad sin cambiar una línea (el `if` cambia de rama solo).
- Quedan warnings informativos de GitHub sobre Node.js 20 deprecado en algunas actions (`actions/checkout@v4`, etc.) — no bloquean, pero conviene revisar versiones más nuevas de esas actions en un lab de mantenimiento futuro.

## Artefactos

- `.github/workflows/reusable-ci.yml`
- `.github/workflows/reusable-deploy.yml`
- `.github/workflows/ci.yml`
- `.github/workflows/deploy.yml`
- Ejecuciones reales: [CI](https://github.com/ggedb/Bootcamp/actions/runs/33168437734) · [Promoción dev→stage→prod](https://github.com/ggedb/Bootcamp/actions/runs/33168786929)
- Documento técnico explicativo (para terceros): [GUIA-TECNICA.md](GUIA-TECNICA.md) (copia versionada) y versión con formato/diagrama publicada en https://claude.ai/code/artifact/c381cf97-1d84-45b0-88b7-1b5a5805c52c
- [EVIDENCIAS.md](../../../EVIDENCIAS.md)

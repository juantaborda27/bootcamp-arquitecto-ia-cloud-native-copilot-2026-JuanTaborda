# Un solo workflow, tres ambientes

> Versión con formato (diagrama, tablas): https://claude.ai/code/artifact/c381cf97-1d84-45b0-88b7-1b5a5805c52c
> Esta copia en Markdown es la versión versionada en el repo; el contenido es el mismo.

Guía técnica de cómo se refactorizó el CI/CD del repo a workflows reutilizables, y cómo se ejecutó — de verdad, en GitHub Actions — una promoción `dev → stage → prod`.

**Autor:** Daniel · **Fecha:** 2026-08-28 · **Stack:** GitHub Actions, Helm, gh CLI · **Repo:** ggedb/Bootcamp

## 1. El problema que esto resuelve

`deploy.yml` ya desplegaba a tres ambientes (`dev`, `stage`, `prod`) — pero con el mismo bloque de "instalar Helm, loguearse en Azure, hacer `helm upgrade`" copiado y pegado tres veces. Cambiar un solo paso significaba tocar el archivo en tres lugares distintos, y era cuestión de tiempo hasta que alguien actualizara dos de las tres copias y se olvidara la tercera.

`ci.yml` tenía el mismo problema en menor escala, y además un agujero real: solo construía 2 de los 3 servicios del monorepo con dependencias versionadas — **FastAPI no tenía CI**. Nadie se iba a enterar si se rompía hasta notarlo a mano.

## 2. Cómo funciona el mecanismo

La pieza central es `uses:` apuntando a otro archivo de workflow en vez de `run:` con pasos propios. El job "llamador" solo decide *con qué parámetros*; toda la lógica vive en un solo lugar.

```text
deploy-dev (environment: dev)      \
deploy-stage (environment: stage)   >  uses: reusable-deploy.yml  (un solo helm upgrade, 3 llamadas)
deploy-prod (environment: prod)    /

deploy-dev --needs--> deploy-stage --needs--> deploy-prod   (fuerza el orden)
```

**Por qué esto es "gobernanza", no solo orden:** cada job llamador declara `environment: dev|stage|prod`. Ese nombre no es cosmético: es el gancho al que GitHub cuelga las reglas de protección del Environment (reviewers requeridos, tiempo de espera, restricción de rama) configuradas en *Settings → Environments*. El archivo YAML dice *qué* ambiente es; las reglas de aprobación viven fuera del código, en la configuración del repo.

## 3. CI reutilizable, y un agujero cerrado

`reusable-ci.yml` — un job, parametrizado por stack:

```yaml
on:
  workflow_call:
    inputs:
      service_name: { required: true, type: string }
      working_directory: { required: true, type: string }
      stack: { required: true, type: string }   # dotnet | node | python

jobs:
  build-and-test:
    steps:
      - if: inputs.stack == 'dotnet'
        run: dotnet build ./src -c Release && dotnet test ./tests -c Release
      - if: inputs.stack == 'python'
        run: pip install -r requirements.txt && python -m pytest -q
      - if: inputs.stack == 'node'
        run: npm ci --no-audit && npm run build
```

`ci.yml` pasó de 29 líneas con dos jobs casi idénticos a tres llamadas de una línea cada una:

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

**El agujero que se cerró de paso:** `backend-fastapi` es nuevo — antes no existía ningún job para FastAPI. No fue un ejercicio de refactor por el refactor mismo: agregar un tercer servicio al mismo patrón costó tres líneas, y eso demuestra que valía la pena. `angular22-app` a propósito **no** se agregó: esa carpeta solo documenta cómo scaffoldear el proyecto en `.work/` (gitignorado) — no hay código Angular versionado que compilar.

## 4. Deploy reutilizable

`deploy.yml` pasó de 63 líneas (el mismo `helm upgrade` repetido tres veces) a tres llamadas de ~10 líneas, cada una apuntando al mismo archivo y encadenadas con `needs:` para forzar el orden de promoción:

```yaml
jobs:
  deploy-dev:
    uses: ./.github/workflows/reusable-deploy.yml
    with: { environment_name: dev, image_tag: ${{ inputs.image_tag }} }
  deploy-stage:
    needs: [ deploy-dev ]
    uses: ./.github/workflows/reusable-deploy.yml
    with: { environment_name: stage, image_tag: ... }
  deploy-prod:
    needs: [ deploy-stage ]
    uses: ./.github/workflows/reusable-deploy.yml
    with: { environment_name: prod, image_tag: ... }
```

## 5. El fallback: no fabricar un despliegue que no existe

Este repo no tiene un clúster AKS real ni `AZURE_CREDENTIALS` configurado (se confirmó con `gh secret list` y consultando la API de environments: cero secretos). Dejar el workflow inejecutable hasta que exista infraestructura real habría significado no poder demostrar nunca la cadena de promoción completa.

La solución: cada paso de Azure/Helm corre solo si hay credenciales; si no las hay, un paso alternativo hace `helm template` sobre el **mismo chart con los mismos valores** y publica el manifiesto como artifact. Es una validación real del chart (no un mock), y el día que se configuren credenciales reales, el mismo archivo pasa a desplegar de verdad — el `if` cambia de rama solo:

```yaml
- name: Helm upgrade (despliegue real en AKS)
  if: ${{ env.HAS_AZURE_CREDS == 'true' }}
  run: helm upgrade --install enrollmenthub infra/helm/app ...

- name: Helm template (sin credenciales de Azure configuradas)
  if: ${{ env.HAS_AZURE_CREDS != 'true' }}
  run: helm template enrollmenthub infra/helm/app ... > rendered.yaml
```

## 6. Dos errores reales, corregidos en vivo

Ninguno de los dos se ve leyendo el YAML tranquilo. Los encontró GitHub al intentar correr el workflow de verdad.

**① YAML flow-map + expresión de Actions no se llevan bien.** `with: { dotnet-version: ${{ inputs.dotnet_version }} }` — las llaves de la expresión chocan con las llaves del flow-mapping de YAML. Error real: `expected ',' or '}', but got '{'`.
Arreglo: citar el valor → `{ dotnet-version: "${{ inputs.dotnet_version }}" }`.

**② El contexto `secrets` no existe dentro de un `if:` de step.** Al disparar `deploy.yml` la primera vez, GitHub rechazó el run entero: `Unrecognized named-value: 'secrets'`, en los seis pasos que usaban `if: ${{ secrets.AZURE_CREDENTIALS != '' }}`.
Arreglo: resolver el secreto una vez en una `env:` de job (`HAS_AZURE_CREDS`) y mirar `env.HAS_AZURE_CREDS` en cada step — ahí sí es válido.

Ambos se corrigieron, se subieron, y recién entonces se volvió a disparar el workflow — no se dio por buena una versión que nunca corrió.

## 7. La corrida real

Horarios reales de cada job del despliegue (API de GitHub), que prueban que `stage` no arrancó hasta que `dev` terminó, y `prod` hasta que `stage` terminó — no corrieron en paralelo:

| Job | Empezó | Terminó |
|---|---|---|
| deploy-dev | 11:52:14 | 11:52:19 |
| deploy-stage | 11:52:23 | 11:52:32 |
| deploy-prod | 11:52:36 | 11:52:48 |

Y la API de *deployments* de GitHub —el registro de trazabilidad que usaría cualquier auditoría— muestra un evento distinto por ambiente, con el mismo orden:

```json
{"environment":"dev",   "created_at":"2026-08-28T11:52:12Z"}
{"environment":"stage", "created_at":"2026-08-28T11:52:20Z"}
{"environment":"prod",  "created_at":"2026-08-28T11:52:33Z"}
```

**Resumen:** 3/3 servicios en verde en CI (dotnet, fastapi, next) · 3/3 ambientes desplegados en orden correcto · 2 bugs reales encontrados y corregidos en vivo · 0 resultados inventados.

## 8. Correrlo vos mismo

```bash
# Autenticar gh (una vez), con el scope que hace falta para tocar workflows
gh auth login --hostname github.com --web
gh auth refresh -h github.com -s workflow,repo
gh auth setup-git

# Disparar CI en cualquier rama
gh workflow run ci.yml --ref daniel

# Disparar la promoción completa
gh workflow run deploy.yml --ref daniel -f image_tag="$(git rev-parse HEAD)"

# Seguir una corrida
gh run list --workflow=deploy.yml --branch daniel --limit 1
gh run view <run-id>
```

## 9. Límites y qué falta

- **Sin reglas de aprobación configuradas:** los environments `dev`/`stage`/`prod` ya existían, pero sin reviewers requeridos ni wait timer. Crearlas requiere permiso `admin` sobre el repo (`PUT /environments/<env>` devolvió `404` con esta cuenta, que solo tiene `push`). Es el mismo tipo de bloqueo que ya quedó pendiente en el lab 08 para la protección de `main`: lo tiene que hacer el dueño del repo.
- **Sin AKS real:** lo que se probó es el mecanismo de promoción y el contrato del workflow reutilizable, con `helm template` como validación. El despliegue real a un clúster sigue sin probarse porque no hay uno.

---
Evidencia completa de ejecución: [EVIDENCIAS.md](EVIDENCIAS.md)

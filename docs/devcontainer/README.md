
# Dev Container - Guía profunda

## ¿Qué es y por qué usarlo?
- Entorno reproducible (Docker) con toolchain completo para backend, frontend y DevOps.
- Misma experiencia en local y en **Codespaces**.

## Estructura clave
- `.devcontainer/devcontainer.json` -> imagen base, **features** (docker-in-docker, Azure CLI, kubectl/Helm/Minikube, .NET 10, Node 24, Python 3.14), extensiones VS Code y `postCreateCommand`.

## Extenderlo
- Agrega librerías o CLIs en `postCreateCommand` o crea `Dockerfile` propio.
- Usa **devcontainer features** oficiales (Azure, AWS, TF, etc.).

## Secretos
- En Codespaces, configura **Secrets** a nivel repo/org.  
- Nunca hardcodees credenciales.

## Uso con Copilot
- Copilot entiende el contexto del workspace y sugiere código/config con base en estos archivos.
- Copilot descubre las instrucciones, prompts y Agent Skills versionados en el repositorio; Claude Code es opcional.

## Recuperación en Windows

Si **Reopen in Container** falla con `exit code: 100`, busca en el log:

- `NO_PUBKEY 62D54FD4003F6525`
- `The repository 'https://dl.yarnpkg.com/debian stable InRelease' is not signed`

La imagen universal puede contener un repositorio Yarn con clave desactualizada. El `Dockerfile` del repositorio elimina `yarn.list` antes de instalar features.

1. Ejecuta **Dev Containers: Rebuild Without Cache and Reopen in Container**.
2. Si persiste, confirma que Docker Desktop y WSL 2 están operativos.
3. Revisa el log de Dev Containers antes de eliminar imágenes o volúmenes.

Validación opcional:

```powershell
docker build -f .devcontainer/Dockerfile -t bootcamp-devcontainer-basefix:local .
docker run --rm bootcamp-devcontainer-basefix:local bash -lc "apt-get update -y"
```


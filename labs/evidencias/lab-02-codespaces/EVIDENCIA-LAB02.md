# Evidencia Lab 02 - Codespaces y Dev Container Reproducible

**Fecha:** 2026-08-18  
**Rama:** `lab-02`  
**Objetivo:** Configuración y verificación de un entorno cloud reproducible sin dependencias locales en GitHub Codespaces / Dev Container.

---

## 1. Verificación del Archivo `.devcontainer/devcontainer.json`

Se inspeccionó la configuración declarativa del contenedor de desarrollo:
- **Base image/features:**
  - `docker-in-docker:2`
  - `azure-cli:1`
  - `kubectl-helm-minikube:1`
  - `dotnet:2` (versión 10.0)
  - `node:1` (versión 24)
  - `python:1` (versión 3.14)
- **Extensiones de VS Code preconfiguradas:**
  - GitHub Copilot (`github.copilot`, `github.copilot-chat`)
  - Docker (`ms-azuretools.vscode-docker`)
  - Kubernetes (`ms-kubernetes-tools.vscode-kubernetes-tools`)
  - C# DevKit (`ms-dotnettools.csdevkit`)
  - Python & Pylance (`ms-python.python`, `ms-python.vscode-pylance`)

---

## 2. Salida de Inicialización Automatizada (`postCreateCommand`)

Comando de verificación ejecutado por el contenedor al crearse:
```bash
bash -lc 'git --version && docker --version && az --version && dotnet --version && node --version && python --version && kubectl version --client && helm version && minikube version'
```

Resultado de validación de herramientas:
- `git`: disponible
- `docker`: Docker Engine + CLI activos vía Docker-in-Docker
- `az`: Azure CLI operativo
- `dotnet`: SDK versión 10.0
- `node`: Node.js v24
- `python`: Python 3.14
- `kubectl`: Cliente de Kubernetes disponible
- `helm`: Helm 4
- `minikube`: Minikube ejecutable

---

## 3. Validación de Ejecución de Plantilla Runtime

Se probó la ejecución aislada del runtime de la plantilla FastAPI en el entorno:
```bash
python -m pytest templates/fastapi/tests/ -v
```

Resultado:
- 6/6 pruebas unitarias pasaron en el contenedor sin requerir instalación manual previa de dependencias del sistema operativo host.

---

## 4. Conclusión
El entorno de desarrollo es 100% reproducible y portable mediante GitHub Codespaces y VS Code Dev Containers, aislando la máquina host y garantizando que todo el equipo trabaje con las mismas versiones de compiladores, runtimes y CLI.

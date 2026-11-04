Lab 02 — Codespaces y devcontainer reproducible

Objetivo

Configurar y validar un entorno cloud reproducible mediante GitHub Codespaces y el devcontainer del repositorio.

Herramienta utilizada

GitHub Codespaces

Visual Studio Code en Codespaces

Configuración existente en .devcontainer/

1. Devcontainer utilizado

El repositorio ya contaba con:

.devcontainer/devcontainer.json

.devcontainer/Dockerfile

El devcontainer.json configura Docker in Docker, Azure CLI, kubectl, Helm 4.2.4, Minikube, .NET 10.0, Node.js 24 y Python 3.14.

También configura extensiones de VS Code para GitHub Copilot, Docker, Kubernetes, .NET y Python.

El postCreateCommand realiza comprobaciones de las herramientas del entorno.

No fue necesario modificar el devcontainer, porque las herramientas requeridas estuvieron disponibles correctamente.

2. Creación del Codespace

Se creó un Codespace desde el repositorio y se abrió correctamente el workspace:

/workspaces/Bootcamp

El entorno inició correctamente y permitió trabajar desde VS Code dentro del Codespace.

3. Verificación de herramientas

Se ejecutaron los comandos requeridos por el laboratorio.

Git

git --version

Resultado real:

git version 2.49.0

Node.js

node --version

Resultado real:

v24.19.0

Python

python --version

Resultado real:

Python 3.14.7

.NET

dotnet --version

Resultado real:

10.0.400

Docker CLI

docker --version

Resultado real:

Docker version 28.1.1-1, build 4eba373274f9d21ba90ae5bc719c3f1e4bb07a1

Resultado

Las cinco herramientas base requeridas por el laboratorio estuvieron disponibles dentro del Codespace.

4. Validación de una plantilla

Se seleccionó:

templates/next16-app

Se revisó su package.json antes de ejecutarla. Los scripts declarados son:

{
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000"
  }
}

La plantilla utiliza:

Next.js 16.3.1

React 19.2.8

React DOM 19.2.8

No existe un README.md dentro de templates/next16-app, por lo que se utilizaron los scripts declarados en package.json.

Validación ejecutada

cd templates/next16-app
npm install
npm run build
npm run dev

Resultados reales:

npm install: completado correctamente.

npm run build: completado correctamente.

npm run dev: aplicación ejecutándose en el puerto 3000.

La aplicación fue accesible mediante Ports de GitHub Codespaces.

5. Reproducibilidad

La configuración del entorno está definida por:

.devcontainer/devcontainer.json
.devcontainer/Dockerfile

Las versiones principales declaradas son:

Node.js 24
Python 3.14
.NET 10.0
Helm 4.2.4

Esto permite crear un Codespace desde el mismo repositorio con un entorno equivalente, sin depender de las instalaciones locales.

6. Cambios realizados en el devcontainer

No fue necesario modificar el devcontainer.

La configuración existente ya proporcionaba las herramientas requeridas. No se realizaron cambios de configuración sin una necesidad técnica comprobada.

7. Evidencia técnica

Se conservaron capturas de:

Codespace abierto en VS Code.

Terminal con las versiones de Git, Node.js, Python, .NET y Docker.

Aplicación Next.js ejecutándose mediante el puerto 3000.

Validación del build de la plantilla.

8. Cumplimiento de la validación

Requisito

Resultado

El entorno inicia sin errores

✅ Cumplido

Git disponible

✅ Cumplido

Node.js disponible

✅ Cumplido

Python disponible

✅ Cumplido

.NET disponible

✅ Cumplido

Docker CLI disponible

✅ Cumplido

Ejecutar una app de plantilla

✅ Cumplido

Runtime de la plantilla validado

✅ Cumplido

Ajustar devcontainer si era necesario

No fue necesario

Reproducibilidad documentada

✅ Cumplido

9. Conclusión

El laboratorio permitió comprobar que el repositorio proporciona un entorno de desarrollo reproducible mediante GitHub Codespaces y .devcontainer.

El Codespace inició correctamente, las herramientas base requeridas estuvieron disponibles y una aplicación Next.js de la carpeta templates pudo instalar sus dependencias, compilarse y ejecutarse dentro del entorno cloud.

No fue necesario modificar el devcontainer, ya que la configuración existente cumplía los requisitos del laboratorio.

Comandos principales ejecutados

git --version
node --version
python --version
dotnet --version
docker --version

cd templates/next16-app
npm install
npm run build
npm run dev
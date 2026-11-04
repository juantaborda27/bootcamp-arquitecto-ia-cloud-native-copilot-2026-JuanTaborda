# Evidencias Lab 00 - Configuración del entorno - Juan Taborda

## Objetivo
Preparar el entorno de desarrollo para trabajar con los laboratorios del bootcamp mediante VS Code, GitHub, Docker y Dev Containers.

## Comandos ejecutados
- `node --version`
- `npm --version`
- `python --version`
- `dotnet --version`
- `git --version`
- `docker --version`
- `docker compose version`
- `gh auth login`
- `dotnet restore templates/dotnet10-api/src/Api.csproj`
- `docker compose -f infra/docker-compose.data.yml config --quiet`

## Resultado esperado
Contar con un entorno de desarrollo funcional, las herramientas necesarias instaladas y el repositorio personal conectado a GitHub.

## Resultado obtenido
Se construyó el Dev Container y se verificaron las herramientas principales:

- Node.js 24.22.2
- npm 11.19.1
- Python 3.14.10
- .NET 10.0.403
- Git 2.49.0
- Docker Compose 2.40.3

Se autenticó GitHub CLI y se incorporó el contenido del bootcamp a la raíz del repositorio personal. La restauración de dependencias .NET finalizó correctamente.

## Problemas y solución
- Demora en el despliegue del Dev Containers
- Docker no encontraba inicialmente el motor: se inició Docker Desktop.
- Git reconocía `Bootcamp` como submódulo: se reorganizó el repositorio para incorporar directamente sus archivos.
- Error de permisos al copiar archivos: se utilizo `shutil.copyfile()`.

## Capturas o logs
- Versiones de las herramientas.
- Construcción del Dev Container.
- Restauración de dependencias .NET.
- Autenticación de GitHub.
- Estructura del repositorio.

## Herramientas, versiones y ruta elegida
VS Code, Git, GitHub CLI, Docker Desktop, Node.js, Python y .NET 10.

**Ruta elegida:** Dev Container local con VS Code.

## IA, skill o prompt usado y corrección humana
Se utilizo ChatGPT como apoyo para configurar el entorno, diagnosticar errores y reorganizar el repositorio. Los comandos y cambios fueron ejecutados y verificados manualmente.

GitHub Copilot y los Agent Skills se documentarán en el Lab 01.

**Estado:** En proceso de cierre.
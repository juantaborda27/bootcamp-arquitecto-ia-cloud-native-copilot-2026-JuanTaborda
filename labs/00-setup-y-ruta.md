# Lab 00 - Guía Total de Inicio del Curso

## Para qué sirve esta guía
Esta guía instala y valida las herramientas del bootcamp. No instala todas las especializaciones a todos los estudiantes: primero prepara el núcleo y después añade solo las herramientas de los tracks elegidos.

## Resultado esperado
- Cuenta de GitHub preparada
- Acceso configurado a GitHub Copilot o Claude Code
- Repositorio del curso creado y con contenido
- Entorno de desarrollo listo en VS Code
- Flujo de ramas y evidencias definido
- Núcleo y herramientas de la ruta elegida validados

## Ruta recomendada de arranque
1. Preparar cuenta y acceso en GitHub.
2. Crear repositorio del curso.
3. Importar este contenido al repositorio.
4. Elegir entorno de trabajo:
   - Codespaces
   - Dev Container local con VS Code
5. Validar herramientas.
6. Ejecutar una prueba rápida del stack.
7. Configurar metodología de trabajo del curso.

## Paso 1 - Preparar GitHub
1. Verifica que tengas cuenta activa en GitHub.
2. Solicita GitHub Education y activa Copilot si está disponible. Las instrucciones, alternativas y condiciones vigentes están en `docs/modules/01-copilot.md`.
3. Configura autenticación segura:
   - Recomendado: passkey o 2FA
4. Crea un Personal Access Token solo si vas a usar HTTPS con autenticación por token.

## Paso 1B - Preparar Azure DevOps (si usarás ese track)
1. Crea o confirma una organización en Azure DevOps.
2. Crea un proyecto nuevo para el bootcamp.
3. Verifica permisos para crear repos, pipelines y service connections.
4. (Recomendado) Crea un Azure Resource Group de laboratorio para ACR y Kubernetes.
5. Para Labs AZDO-03 y AZDO-04 prepara ACR y AKS, o confirma que tienes permisos para crearlos.
6. Usa una service connection con federación OIDC o identidad administrada cuando sea posible; evita secretos de service principal de larga duración.

## Paso 2 - Crear el repositorio del curso
1. En GitHub, crea un repo nuevo.
2. Nombre sugerido: `bootcamp-arquitecto-ia-cloud-native-copilot-2026`.
3. Visibilidad sugerida:
   - Privado para trabajo personal
   - Público si quieres compartir avances
4. Inicializa con README vacío solo si vas a subir archivos manualmente luego.

Si trabajarás en Azure DevOps:
1. Crea repo en Azure Repos.
2. Importa el código del bootcamp (desde local o desde GitHub).
3. Habilita branch policies en `main`.

## Paso 3 - Importar contenido del curso

### Opción A - Subir carpeta final actual
1. Clona el repo nuevo en tu equipo.
2. Copia el contenido de este curso final dentro del repo clonado.
3. Haz commit inicial y push.

### Opción B - Trabajar directamente desde esta carpeta
1. Inicializa git en la carpeta final si aún no está inicializado.
2. Conecta remote al repositorio GitHub.
3. Haz commit inicial y push.

## Paso 4 - Elegir entorno de desarrollo

### Opción A - Codespaces (recomendado para cero problemas locales)
1. Abre el repositorio en GitHub.
2. Crea un Codespace desde la rama principal.
3. Espera a que termine la preparación del entorno.
4. Valida que VS Code web abra el proyecto completo.

### Opción B - VS Code local con Dev Container
1. Instala VS Code, Git y Docker Desktop con los comandos del Paso 6.
2. Instala la extensión Dev Containers en VS Code.
3. Abre el proyecto en VS Code.
4. Ejecuta Reopen in Container.
5. Espera instalación y validación de dependencias.

El Dev Container ya proporciona Docker CLI, Azure CLI, kubectl, Helm, Minikube, .NET 10, Node 24 y Python 3.14. Docker Desktop sigue siendo necesario en el host. Android Studio, Xcode y emuladores se ejecutan en el host, no dentro del contenedor.

## Paso 5 - Matriz de herramientas

### Núcleo común

| Herramienta | Uso | Instalación |
| --- | --- | --- |
| VS Code | Editor oficial del curso | Host local |
| Git y GitHub CLI | Ramas, PR y autenticación | Host o Dev Container |
| Docker Desktop + Compose v2 | Contenedores y servicios locales | Host local |
| Node.js 24 LTS + npm | Next.js, NestJS, Nx y React Native | Host o Dev Container |
| Python 3.14 | FastAPI, Alembic y LangGraph | Host o Dev Container |
| .NET SDK 10 | API .NET y Semantic Kernel | Host o Dev Container |
| Copilot o Claude Code | Ingeniería asistida por IA | Cuenta y extensión/CLI |

### Por especialización

| Track | Herramientas adicionales |
| --- | --- |
| Kubernetes/GitOps | kubectl, Helm, Minikube y Argo CD en el cluster |
| Azure/Azure DevOps | Azure CLI, suscripción Azure y organización Azure DevOps |
| React Native | Expo mediante `npx`; EAS CLI mediante `npx eas-cli`; Android Studio o dispositivo con Expo Go |
| Mobile nativo | Android Studio; Xcode solo en macOS para iOS |
| Agentes IA | Cuenta y deployment de Azure OpenAI/Microsoft Foundry, OpenAI u otro proveedor aprobado |
| Datos | Motores ejecutados con Docker Compose; no se instalan servidores de base de datos en el host |
| APIM | Suscripción Azure y recurso API Management |

## Paso 6 - Instalación en Windows 11

Usa PowerShell normal para `winget`. Si WSL 2 aún no está instalado, abre una sesión separada de **PowerShell como administrador** únicamente para `wsl --install`. Los identificadores siguientes fueron verificados con `winget` el 15 de agosto de 2026.

### 6.1 WSL 2, VS Code, Git y Docker

```powershell
# Ejecutar como administrador solo si WSL 2 no está instalado
wsl --install

# Ejecutar en PowerShell normal
winget install --id Microsoft.VisualStudioCode --exact --accept-package-agreements --accept-source-agreements
winget install --id Git.Git --exact --accept-package-agreements --accept-source-agreements
winget install --id GitHub.cli --exact --accept-package-agreements --accept-source-agreements
winget install --id Docker.DockerDesktop --exact --accept-package-agreements --accept-source-agreements
```

Reinicia Windows si `wsl --install` o Docker lo solicitan. Abre Docker Desktop, activa el backend WSL 2 y espera a que indique que el motor está operativo.

Configura Git con datos profesionales. Usa un correo verificado en tu proveedor Git:

```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo-verificado@example.com"
gh auth login
```

### 6.2 Runtimes del núcleo

```powershell
winget install --id OpenJS.NodeJS.LTS --exact --accept-package-agreements --accept-source-agreements
winget install --id Python.Python.3.14 --exact --accept-package-agreements --accept-source-agreements
winget install --id Microsoft.DotNet.SDK.10 --exact --accept-package-agreements --accept-source-agreements
```

Cierra y abre de nuevo PowerShell para actualizar `PATH`. Node debe quedar en la línea 24 LTS; si `node --version` muestra otra major, corrígelo antes de continuar.

### 6.3 VS Code y extensiones

```powershell
code --install-extension ms-vscode-remote.remote-containers
code --install-extension GitHub.copilot
code --install-extension GitHub.copilot-chat
code --install-extension GitHub.vscode-pull-request-github
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools
code --install-extension ms-dotnettools.csdevkit
code --install-extension ms-python.python
code --install-extension ms-python.vscode-pylance
```

Para Claude Code, solo si será tu herramienta principal o alternativa:

```powershell
winget install --id Anthropic.ClaudeCode --exact --accept-package-agreements --accept-source-agreements
claude --version
claude
```

Claude Code requiere suscripción compatible, facturación por uso en Anthropic Console o un proveedor empresarial. No selecciones Console sin configurar antes presupuesto y límite de gasto. Consulta `docs/modules/01-copilot.md`.

## Paso 7 - Instalación en macOS

Instala primero las herramientas de línea de comandos y Homebrew:

```bash
xcode-select --install
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Instala el núcleo:

```bash
brew install git gh node@24 python@3.14
brew install --cask visual-studio-code docker dotnet-sdk
```

Abre Docker Desktop una vez y acepta la configuración inicial. Confirma que `dotnet --list-sdks` incluye `10.0.x`; si Homebrew ofrece otra major, instala .NET 10 desde `https://dotnet.microsoft.com/download/dotnet/10.0`.

Para Claude Code, si corresponde:

```bash
brew install --cask claude-code
claude --version
claude
```

Las extensiones de VS Code son las mismas del bloque Windows y se instalan con `code --install-extension <id>`.

## Paso 8 - CLIs de proyecto y dependencias

No instales Nx, NestJS, Angular ni Expo globalmente. Usa la versión resuelta por el proyecto o `npx`, lo que reduce conflictos entre cohortes:

```powershell
npx nx@23.1.1 --version
npx --package @nestjs/cli@11.0.24 nest --version
npx --package @angular/cli@22.1.4 ng version
npx expo --version
npx eas-cli --version
```

La primera ejecución descarga paquetes y requiere conexión. Cada proyecto instala sus dependencias declaradas:

```powershell
# Next.js
Push-Location templates/next16-app
npm install
Pop-Location

# FastAPI y Alembic
py -3.14 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r templates/fastapi/requirements.txt
deactivate

# .NET
dotnet restore templates/dotnet10-api/src/Api.csproj
```

En macOS/Linux activa Python con `source .venv/bin/activate`. Para EF Core instala la herramienta al iniciar el Lab 13:

```powershell
dotnet tool install --global dotnet-ef --version "10.*"
dotnet ef --version
```

Los SDK de Semantic Kernel, LangGraph, drivers de datos y paquetes de mensajería se instalan dentro del proyecto con los comandos versionados en sus laboratorios; no son herramientas globales.
Pytest, HTTPX y Alembic también llegan desde `templates/fastapi/requirements.txt`; no los instales globalmente.

## Paso 9 - Kubernetes, Helm y GitOps

Instala este bloque para Labs 09-10, Kubernetes local o la especialización cloud native.

### Windows 11

```powershell
winget install --id Kubernetes.kubectl --exact --accept-package-agreements --accept-source-agreements
winget install --id Helm.Helm --exact --accept-package-agreements --accept-source-agreements
winget install --id Kubernetes.minikube --exact --accept-package-agreements --accept-source-agreements
minikube start --driver=docker
```

### macOS

```bash
brew install kubectl helm minikube
minikube start --driver=docker
```

Instala Argo CD dentro del cluster; el CLI local no es obligatorio para el laboratorio:

```powershell
kubectl create namespace argocd
kubectl apply -n argocd --server-side --force-conflicts -f https://raw.githubusercontent.com/argoproj/argo-cd/v3.5.1/manifests/install.yaml
kubectl wait --for=condition=Available deployment/argocd-server -n argocd --timeout=300s
```

Kong también se instala en Kubernetes mediante Helm en el Lab 09; no necesita instalación local.

## Paso 10 - Azure y Azure DevOps

Instala este bloque para Azure Queue, ACR, APIM, AKS, Microsoft Foundry/Azure OpenAI o el track Azure DevOps.

### Windows 11

```powershell
winget install --id Microsoft.AzureCLI --exact --accept-package-agreements --accept-source-agreements
az login
az account show
```

### macOS

```bash
brew install azure-cli
az login
az account show
```

Además necesitas:

1. Una suscripción Azure con presupuesto y alertas de costo.
2. Una organización y proyecto en `https://dev.azure.com/` para el track Azure DevOps.
3. Permisos para crear Resource Groups y, según el track, Storage Account, ACR, AKS, APIM o un deployment de modelo.
4. Service connections con mínimo privilegio. No uses secretos administrativos en repositorios.

APIM, AKS, ACR, Storage y modelos generan cargos. Elimina recursos al terminar cada práctica.

## Paso 11 - React Native y mobile nativo

### React Native con Expo

El track usa Expo SDK 57 con development build. Crea una cuenta en `https://expo.dev/` solo si usarás EAS Build. Expo CLI y EAS se ejecutan con `npx`; no instales el paquete global obsoleto `expo-cli`. Expo Go es opcional para exploración y no sustituye la evidencia del development build.

Para emulador Android o mobile nativo en Windows/macOS:

```powershell
winget install --id Google.AndroidStudio --exact --accept-package-agreements --accept-source-agreements
```

En macOS:

```bash
brew install --cask android-studio
```

En Android Studio instala desde **SDK Manager**:

1. Android SDK Platform solicitada por la versión de Expo/Compose del proyecto.
2. Android SDK Platform-Tools y Android Emulator.
3. Una imagen x86_64 o arm64 con Google APIs.
4. Un AVD desde **Device Manager**.

Android Studio incluye un JDK compatible y los proyectos usan Gradle Wrapper (`gradlew`), por lo que no debes instalar Gradle globalmente. El track nativo espera JDK 17 o superior y Kotlin 2.x:

```powershell
java -version
```

Si `java` no aparece en la terminal, selecciona el JDK incluido con Android Studio como Gradle JDK o agrega su directorio `jbr/bin` al `PATH` del usuario.

En Windows, configura la sesión actual con la ruta predeterminada del SDK. Para persistirla, añade las mismas rutas desde **Variables de entorno del usuario**:

```powershell
$env:ANDROID_HOME = Join-Path $env:LOCALAPPDATA "Android\Sdk"
$env:Path += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator"
adb --version
```

Si elegiste otra ubicación en SDK Manager, usa esa ruta. Para iOS se requiere macOS:

```bash
xcodebuild -version
xcrun simctl list devices
```

Xcode 16 o superior se instala desde Mac App Store e incluye Swift 6 y los simuladores. No existe un flujo soportado para compilar iOS localmente en Windows; usa EAS Build o un agente macOS cuando corresponda.

## Paso 12 - Servicios locales con Docker

No instales PostgreSQL, SQL Server, MongoDB, Redis u Oracle directamente en el host. Valida el archivo y levanta solo los servicios del laboratorio:

```powershell
docker compose -f infra/docker-compose.data.yml config --quiet
docker compose -f infra/docker-compose.data.yml up -d postgres redis
docker compose -f infra/docker-compose.data.yml ps
```

Servicios disponibles:

- `postgres`: núcleo de persistencia.
- `redis`: caché y mensajería.
- `oracle`: especialización Oracle XE; requiere `ORACLE_PASSWORD` local.
- `mssql` y `mongo`: especializaciones de datos.
- Kafka se define por separado en `infra/docker-compose.kafka.yml` para el Lab 25.

Levanta Kafka solo para event streaming:

```powershell
docker compose -f infra/docker-compose.kafka.yml config --quiet
docker compose -f infra/docker-compose.kafka.yml up -d
docker compose -f infra/docker-compose.kafka.yml ps
```

Levanta Prometheus y Grafana para observabilidad:

```powershell
docker compose -f observabilidad/prometheus-grafana/docker-compose.yml config --quiet
docker compose -f observabilidad/prometheus-grafana/docker-compose.yml up -d
```

Levanta Keycloak para OIDC local; cambia la contraseña de laboratorio y no la reutilices:

```powershell
docker run -d --name keycloak-lab -p 8080:8080 `
   -e KEYCLOAK_ADMIN=admin `
   -e KEYCLOAK_ADMIN_PASSWORD=LocalLabPassword_ChangeMe `
   quay.io/keycloak/keycloak:26.7.1 start-dev
```

Estos servicios no requieren instalación local adicional. Las imágenes se descargan en el primer arranque y consumen espacio en disco.

Detén recursos cuando no se usen:

```powershell
docker compose -f infra/docker-compose.data.yml down
docker compose -f infra/docker-compose.kafka.yml down
docker compose -f observabilidad/prometheus-grafana/docker-compose.yml down
docker rm -f keycloak-lab
minikube stop
```

## Paso 13 - Cuentas externas y secretos

Configura solo las cuentas necesarias para tu ruta:

- GitHub y GitHub Education/Copilot.
- Anthropic si usarás Claude Code.
- Azure y Azure DevOps para sus tracks.
- Expo para EAS Build.
- Microsoft Entra ID o Google Cloud para identidad federada.
- Azure OpenAI/Microsoft Foundry, OpenAI u otro proveedor aprobado para agentes.
- Apple ID para capacidades Apple que lo requieran.

Guarda secretos en variables de entorno, GitHub/Azure secrets o un vault. No los escribas en Markdown, capturas, `.env` versionados ni prompts. Antes del primer commit verifica:

```powershell
git status --short
git check-ignore .env
```

Si `.env` no está ignorado, corrige `.gitignore` antes de continuar.

## Paso 14 - Validación técnica

### Núcleo

```powershell
git --version
gh --version
docker --version
docker compose version
node --version
npm --version
python --version
dotnet --version
code --version
```

Resultados esperados: Node `v24.x`, Python `3.14.x` y .NET `10.0.x`.

### Según especialización

```powershell
kubectl version --client
helm version
minikube version
az --version
dotnet ef --version
npx nx@23.1.1 --version
npx --package @nestjs/cli@11.0.24 nest --version
npx expo --version
adb --version
claude --version
```

No es obligatorio que todos respondan: solo los de la ruta seleccionada. Registra versiones reales en `EVIDENCIAS.md`.

## Paso 15 - Diagnóstico de instalación

- Si `winget` modifica `PATH`, cierra y abre la terminal y VS Code.
- Si Docker falla, confirma WSL 2 con `wsl --status` y que Docker Desktop esté iniciado.
- Si PowerShell bloquea la activación de `.venv`, usa temporalmente `Set-ExecutionPolicy -Scope Process Bypass` y vuelve a activar.
- Si `node --version` no es 24, elimina instalaciones anteriores o usa un gestor de versiones; no mezcles varias instalaciones en `PATH`.
- Si `kubectl` no conecta, ejecuta `kubectl config current-context` y `minikube status`.
- Si un CLI descargado por `npx` cambia de versión, registra la versión y conserva el lockfile del proyecto.

## Paso 16 - Estructura de ramas recomendada

1. `main` para versiones estables.
2. `develop` para integración.
3. `lab-XX` para cada laboratorio.

Flujo sugerido por laboratorio:
1. Crear rama `lab-XX`.
2. Implementar cambios.
3. Commit con mensaje claro.
4. Pull Request hacia `develop`.
5. Merge y evidencia.

## Paso 17 - Configurar la IA de desarrollo
1. Elige GitHub Copilot o Claude Code como herramienta principal según `docs/modules/01-copilot.md`.
2. Inicia sesión únicamente en la extensión oficial dentro de VS Code.
3. Si no tienes una segunda herramienta, configura la comparación del Lab 01 con sesiones limpias, otro modo/modelo disponible o línea base manual.
4. Crea una rutina de trabajo:
   - diseñar
   - generar
   - revisar
   - probar
   - documentar

## Paso 18 - Crear plantilla de evidencias
Crea un archivo `EVIDENCIAS.md` por laboratorio con esta estructura.

```md
# Evidencias Lab XX

## Objetivo

## Comandos ejecutados

## Resultado esperado

## Resultado obtenido

## Problemas y solución

## Capturas o logs

## Herramientas, versiones y ruta elegida

## IA, skill o prompt usado y corrección humana
```

## Paso 19 - Prueba de arranque del curso
1. Abre la solución en VS Code.
2. Abre el laboratorio 01.
3. Ejecuta primer commit de trabajo.
4. Verifica que puedes avanzar al Lab 02.

## Checklist final del setup
- [ ] GitHub y una IA de desarrollo listos
- [ ] Repo creado y contenido importado
- [ ] Entorno (Codespaces o Dev Container) operativo
- [ ] Núcleo instalado y versiones validadas
- [ ] Herramientas de la ruta elegida instaladas
- [ ] Servicios Docker requeridos en estado healthy/running
- [ ] Cuentas cloud con presupuesto y mínimo privilegio
- [ ] `.env` y secretos excluidos del repositorio
- [ ] Flujo de ramas definido
- [ ] Evidencias listas

## Punto oficial de inicio del curso
Empieza en `01-copilot.md` y sigue el orden de `labs/README.md`.



# Checklist Express de 30 Minutos para Iniciar el Curso

Esta guía es la ruta más corta para empezar hoy mismo.
Si quieres explicaciones completas, usa la guía detallada en `00-setup-y-ruta.md`.

## Objetivo
En 30 minutos dejar listo:
- repositorio en GitHub
- entorno de trabajo en VS Code (Codespaces o Dev Container)
- validación técnica mínima
- primer avance hacia el Lab 01

## Minuto 0-3: pre-check rápido
- [ OK ] Tienes cuenta de GitHub activa
- [ OK ] Tienes GitHub Copilot o Claude Code disponible; revisaste alternativas si Education está pendiente
- [ OK ] Tienes organización/proyecto en Azure DevOps (si usarás ese track)
- [ OK ] Tienes VS Code instalado
- [ local ] Elegiste modo de trabajo: Codespaces o local

## Minuto 3-10: repo listo en GitHub
1. Crea repo nuevo en GitHub.
2. Nombre sugerido: `bootcamp-arquitecto-ia-cloud-native-copilot-2026`.
3. Sube todo el contenido del proyecto (todas las carpetas y archivos).
4. Haz commit inicial y push.

Checklist:
- [ OK ] Repo creado
- [ OK ] Contenido del curso subido
- [ OK ] Rama principal visible en GitHub

Si vas por Azure DevOps:
- [ ] Repo creado en Azure Repos
- [ ] Código importado al proyecto Azure DevOps
- [ ] Branch policy activa en `main`

## Minuto 10-18: abrir entorno

### Ruta A (recomendada): Codespaces
1. En GitHub, abre el repo.
2. Crea Codespace en la rama principal.
3. Espera inicialización completa.

Checklist:
- [ OK ] Proyecto abre en VS Code web
- [ OK ] Terminal funcional

### Ruta B: VS Code local + Dev Container
1. Instala Docker Desktop.
2. Abre proyecto en VS Code.
3. Ejecuta Reopen in Container.

Checklist:
- [ OK ] Contenedor inicia
- [ OK ] Terminal corre dentro del contenedor

## Minuto 18-24: validación técnica mínima
Ejecuta en terminal integrada:

```bash
git --version
gh --version
docker --version
docker compose version
node --version
python --version
dotnet --version
```

Según la ruta elegida, valida además lo indicado en `00-setup-y-ruta.md`. Ejemplo para cloud native y Azure:

```bash
kubectl version --client
helm version
minikube version
az --version
az account show
```

Checklist:
- [ OK ] El núcleo y las herramientas de la ruta elegida responden sin error

## Minuto 24-27: flujo de trabajo del curso
- [ OK ] Crea rama `develop`
- [ OK ] Define convención de ramas `lab-XX`
- [ OK ] Crea archivo `EVIDENCIAS.md`

Plantilla mínima:

```md
# Evidencias Lab XX

## Objetivo
## Comandos ejecutados
## Resultado esperado
## Resultado obtenido
## Problemas y solución
## Capturas o logs
```

## Minuto 27-30: prueba de arranque
1. Abre `labs/01-copilot.md`.
2. Crea rama `lab-01`.
3. Ejecuta tu primer commit de trabajo.

Checklist final:
- [ OK ] Entorno listo
- [ OK ] Ruta del curso clara
- [ OK ] Primer laboratorio iniciado

## Problemas comunes y solución rápida
1. Docker no levanta en Windows:
   - Verifica Docker Desktop abierto y WSL2 activo.
2. Falta una herramienta del núcleo o de tu especialización:
   - Ejecuta su bloque de instalación en `00-setup-y-ruta.md` y reinicia la terminal de VS Code.
3. Error de autenticación GitHub al hacer push:
   - Reautentica GitHub en VS Code o usa token.
4. La IA no aparece en VS Code:
   - Verifica la sesión y la extensión oficial de Copilot o Claude Code.
   - Consulta cuentas, costos y alternativas en `docs/modules/01-copilot.md`.

## Siguiente paso
Si este checklist te funcionó, continúa con `01-copilot.md` y usa `README.md` de labs como ruta oficial.



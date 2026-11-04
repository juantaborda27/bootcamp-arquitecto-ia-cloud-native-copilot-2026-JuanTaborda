# Lab 06 - Angular 22 frontend alternativo

**Estado:** Completado
**Fecha:** 2026-08-20
**Responsable/equipo:** Daniel
**Rama/PR/commit:** `daniel` / `24af4e1`

## Objetivo y criterios de aceptación

- Crear un frontend Angular 22 standalone para consumir la API FastAPI compartida.
- Listar los elementos de `GET /items`.
- Crear elementos mediante `POST /items`.
- Usar Signals para el estado de listado, carga, guardado y errores.
- Validar nombre obligatorio y precio mayor que cero.
- Mostrar errores de validación y errores HTTP sin romper la pantalla.
- Comparar brevemente la solución Angular con el frontend Next.js del Lab 05.

## Implementación

La aplicación se generó en `.work/angular22-app`, tal como indica el laboratorio. `.work/` permanece fuera del control de versiones según la convención del template.

- `src/app/item.service.ts`: contrato `Item`, payload `ItemCreate` y servicio HTTP centralizado.
- `src/app/app.ts`: componente standalone, Signals, Reactive Forms, estados de carga y manejo de errores.
- `src/app/app.html`: formulario de alta y listado conectado a Signals.
- `src/app/app.scss`: estilos de la pantalla.
- `src/app/app.config.ts`: registro de `provideHttpClient()`.

## Herramientas y versiones

- Node usado para Angular: 24.19.0 mediante `npx -p node@24`.
- Node global detectado: 22.19.0, inferior al mínimo requerido por Angular CLI 22.1.4.
- Angular CLI: 22.1.5 instalado a partir de `@angular/cli@22.1.4`.
- Angular: 22.1.3.
- TypeScript: 6.0.3.
- FastAPI: backend local en `http://127.0.0.1:8001`.
- Sistema operativo: Windows 11.

## Comandos ejecutados y resultados reales

### Scaffolding

```powershell
cd "C:\Users\dpras\OneDrive\Documentos\git\Bootcamp\.work"
npx --yes -p node@24 -p @angular/cli@22.1.4 ng new angular22-app --skip-git --standalone --routing --style=scss --package-manager npm --defaults
```

Resultado: `Packages installed successfully.`

### Versiones compatibles

```powershell
cd "C:\Users\dpras\OneDrive\Documentos\git\Bootcamp\.work\angular22-app"
npx --yes -p node@24 -p @angular/cli@22.1.4 ng version
```

Resultado verificado: Node.js `24.19.0`, Angular CLI `22.1.5`, Angular `22.1.3`.

### Build de producción

```powershell
npx --yes -p node@24 -p @angular/cli@22.1.4 ng build --no-interactive --configuration production
```

Resultado verificado: `Application bundle generation complete`; salida en `dist/angular22-app`.

### Pruebas

```powershell
npx --yes -p node@24 -p @angular/cli@22.1.4 ng test --watch=false
```

Resultado verificado: `Test Files 1 passed (1)` y `Tests 2 passed (2)`.

La variante `--browsers=ChromeHeadless` no se pudo ejecutar porque el proyecto generado usa Vitest y no incluye un proveedor de navegador; se ejecutó el comando de pruebas declarado y configurado por el proyecto.

### Backend compartido

```powershell
Invoke-RestMethod http://127.0.0.1:8001/health
Invoke-RestMethod http://127.0.0.1:8001/items
```

Resultado verificado: `health=ok` y `items_count=2`.

## Comparativa Angular frente a Next.js

| Aspecto | Angular 22 | Next.js 16 |
| --- | --- | --- |
| Arquitectura | Framework integral con componentes standalone, servicios y DI | Framework React con routing, rendering híbrido y server/client components |
| Estado | Signals y RxJS; Reactive Forms ofrece validación estructurada | Estado React con hooks; la validación se compone con librerías o lógica propia |
| Acceso HTTP | `HttpClient` encapsulado en un servicio inyectable | `fetch` en componentes, server actions o módulos de acceso propios |
| Encaje | Aplicaciones empresariales con convenciones y estructura uniforme | Interfaces híbridas y experiencias web que necesitan SSR/SSG flexible |

## IA y revisión humana

- Herramienta: GitHub Copilot.
- Revisión humana: se comprobó el contrato del backend, se corrigió la incompatibilidad del Node global y se revisaron los comandos de build y pruebas.
- Decisión manual: usar Node 24 mediante `npx` para respetar el requisito de Angular CLI sin modificar la instalación global.

## Problemas, solución y riesgos pendientes

- Node global `22.19.0` no cumple el mínimo de Angular CLI 22.1.4 (`22.22.3` o `24.15.0`). Solución aplicada: ejecutar CLI y validaciones con Node 24.19.0 temporal.
- El proyecto está en `.work/`, que el template declara como no versionado. Para una entrega remota habría que acordar si se publica el workspace generado o solo el template y la evidencia.
- La URL de API está definida como constante local `http://127.0.0.1:8001`; para despliegue conviene moverla a configuración de entorno.

## Artefactos

- Aplicación local: `.work/angular22-app/`
- Este informe: `labs/evidencias-daniel/lab-06-angular/lab-06-angular.md`
- Resumen oficial: `EVIDENCIAS.md`

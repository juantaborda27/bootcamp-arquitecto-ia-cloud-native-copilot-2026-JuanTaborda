# Lab 05 - Next 16 frontend conectado a API

**Estado:** Completado
**Fecha:** 2026-08-20
**Responsable/equipo:** Daniel
**Rama/PR/commit:** `daniel`

## Objetivo y criterios de aceptación

- Usar Next.js 16 para consumir una API REST real.
- Listar elementos desde el backend.
- Dar de alta un registro desde un formulario.
- Manejar estados de carga y error.
- Dejar evidencia ejecutada y resultados verificables.

## Herramientas y versiones

- Node.js: 22.x (según entorno de la máquina)
- Next.js: 16.3.1
- React: 19.2.8
- FastAPI backend: 0.141.1 / puerto 8001
- Sistema operativo: Windows 11

## Comandos ejecutados

```powershell
cd "C:\Users\dpras\OneDrive\Documentos\git\Bootcamp\templates\next16-app"
npm install
npm run build
```

```powershell
Set-Location "C:\Users\dpras\OneDrive\Documentos\git\Bootcamp\templates\next16-app"
npm run dev
```

## Verificación técnica

### Build del frontend

Resultado verificado:

```text
✓ Compiled successfully
✓ Generating static pages
Route (pages)
┌ ○ /
└ ○ /404
```

Esto confirma que la página compila correctamente con la implementación del lab.

### Backend requerido

El backend FastAPI quedó levantado con la API de prueba en:

```text
http://127.0.0.1:8001
```

Con endpoints relevantes:

- GET /health
- GET /items
- POST /items

## Resultado obtenido

La UI de Next 16 incluye:

- carga inicial de la lista desde la API
- formulario para crear elementos
- refresco manual de listado
- mensaje de error si la API falla
- estado vacío si no hay elementos

## Riesgos y notas

- La app usa la variable de entorno `NEXT_PUBLIC_API_URL` para apuntar al backend.
- En Windows, el arranque del proyecto debe ejecutarse desde la carpeta del template y no desde la raíz del repositorio.
- Para backend real del bootcamp, conviene mantener un puerto estable y documentado por laboratorio.

## Evidencia visual

- Capturas de la pantalla de la app local y del flujo de alta/listado.
- Registro de actualización del estado de EVIDENCIAS.md.

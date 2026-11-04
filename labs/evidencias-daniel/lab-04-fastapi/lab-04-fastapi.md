# Lab 04 - FastAPI servicio productivo básico

**Estado:** Completado
**Fecha:** 2026-08-19
**Responsable/equipo:** Daniel
**Rama/PR/commit:** `daniel`

## Objetivo y criterios de aceptación

- Crear una API FastAPI con rutas principales y contratos claros.
- Implementar CRUD básico para un recurso tipo item.
- Habilitar documentación OpenAPI/Swagger.
- Añadir pruebas de endpoints críticos.
- Dejar evidencia real de ejecución y resultados.

## Herramientas y versiones

- Python: 3.14.0
- FastAPI: 0.141.1
- Pydantic: 2.13.4
- Uvicorn: 0.52.3
- Pytest: 9.1.1
- Sistema operativo: Windows 11

## Comandos ejecutados

```powershell
cd "C:\Users\dpras\OneDrive\Documentos\git\Bootcamp\templates\fastapi"
py -3.14 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m pytest -q
```

```powershell
Set-Location "C:\Users\dpras\OneDrive\Documentos\git\Bootcamp\templates\fastapi\src"
$env:PYTHONPATH = "C:\Users\dpras\OneDrive\Documentos\git\Bootcamp\templates\fastapi"
& "C:\Users\dpras\OneDrive\Documentos\git\Bootcamp\.venv\Scripts\python.exe" -m uvicorn app:app --host 127.0.0.1 --port 8001
```

```powershell
python -c "import urllib.request; r=urllib.request.urlopen('http://127.0.0.1:8001/health', timeout=10); print(r.status); print(r.read().decode()); r2=urllib.request.urlopen('http://127.0.0.1:8001/items', timeout=10); print(r2.status); print(r2.read().decode())"
```

## Resultado obtenido

### Pruebas

La suite ejecutada fue satisfactoria:

```text
5 passed in 2.90s
```

### API en funcionamiento

La app respondió correctamente en el puerto 8001:

```text
200
{"status":"ok"}
200
[]
```

Eso confirma que:
- /health responde con status OK
- /items responde con una colección válida
- la API queda operativa y documentada con FastAPI

## IA y revisión humana

- Se usó GitHub Copilot para diagnosticar el problema inicial.
- La corrección humana consistió en completar el CRUD mínimo del lab y ajustar la validación del contrato.
- Se revisó el diff para asegurar que no se mezclaban cambios ajenos al laboratorio.

## Problemas, solución y riesgos pendientes

### Problema detectado
- La plantilla inicial solo exponía el endpoint /health y no implementaba el CRUD ni los errores esperados por el laboratorio.

### Solución aplicada
- Se construyó la API con modelos Pydantic, rutas /items y manejo de errores 404.
- Se añadieron pruebas para validar health, listado, creación, actualización, borrado y 404.

### Riesgos pendientes
- La ejecución local requiere usar el proyecto con el import correcto y, en Windows, a veces es necesario fijar el PYTHONPATH o ejecutar desde la carpeta src.
- Para despliegue posterior se recomienda mover la lógica a una estructura con routers y persistence layer real.

## Artefactos

- [lab-04-fastapi.md](lab-04-fastapi.md)
- [EVIDENCIAS.md](../../EVIDENCIAS.md)
- [images/swagger-ui-fastapi-lab.png](images/swagger-ui-fastapi-lab.png)

## Evidencia del endpoint OpenAPI

La documentación Swagger de FastAPI queda disponible en:

```text
http://127.0.0.1:8001/docs
```

Desde esa URL se puede validar el esquema OpenAPI y probar los endpoints de la API sin depender de un cliente externo.

### Captura visual

![Swagger UI FastAPI Lab](images/swagger-ui-fastapi-lab.png)

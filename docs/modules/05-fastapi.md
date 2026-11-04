
# Python 3.14.7 + FastAPI 0.141.1

## Novedades de FastAPI recientes (alto nivel)
- Rendimiento, tipado con Pydantic v2, *dependency injection* refinada.  
- Integración asíncrona y validación más estricta.

## Novedades clave
- Mejoras en validación con Pydantic v2.
- Modelo de dependencias más claro y mantenible.
- Mejoras de rendimiento para APIs de alta concurrencia.

## Paso a paso
1. Crear app con rutas `/health` y `/items`.  
2. Integrar PostgreSQL 18.6 o MongoDB 8.3.
3. Agregar pruebas con `pytest`/`httpx`.  
4. Empaquetar con Docker y publicar en GHCR.  

**Ver labs/04-fastapi.md**.


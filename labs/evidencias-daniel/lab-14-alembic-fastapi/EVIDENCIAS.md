# Lab 14 - Alembic para FastAPI

**Estado:** Completado
**Fecha:** 2026-08-27
**Responsable/equipo:** Daniel
**Rama/PR/commit:** `daniel` (cambios sin commit al momento de esta evidencia)

## Objetivo y criterios de aceptación

- Versionar el esquema de la base de datos del servicio FastAPI (`templates/fastapi`) con Alembic.
- Crear una revisión inicial reproducible y aplicarla contra PostgreSQL.
- Introducir un cambio de modelo (columna `status` en `items`) mediante una segunda revisión generada con `--autogenerate`.
- Confirmar que el esquema resultante es consistente entre entornos y reversible (`upgrade`/`downgrade`).

## Estado inicial encontrado

El lab ya estaba parcialmente implementado por un intento anterior:

- `templates/fastapi/src/database.py` y `templates/fastapi/src/models.py` (nuevos): `Base` declarativo, `SessionLocal`, `get_db()` y el modelo `ItemModel` con `id`, `name`, `price`, `status`, `created_at`.
- `templates/fastapi/alembic/env.py`: reescrito para importar `src.database.Base` y `src.models`, leer `DATABASE_URL` desde el entorno (con valor por defecto a PostgreSQL local) y ejecutar `run_migrations_online`/`offline` con `target_metadata` real en vez de `None`.
- `templates/fastapi/alembic.ini`: se agregó `prepend_sys_path = .` para que Alembic pueda importar el paquete `src`.
- Dos revisiones ya creadas en `alembic/versions/`:
  - `20260825000200_create_items.py`: crea la tabla `items` (`id`, `name`, `price`, `created_at`).
  - `20260825000201_add_item_status.py`: agrega la columna `status` (`varchar(32)`, `not null`, default `active`).
- `templates/fastapi/src/app.py`: los endpoints CRUD pasaron de un diccionario en memoria (`items_db`) a `Session` de SQLAlchemy vía `Depends(get_db)`, usando `ItemModel`.
- `templates/fastapi/Dockerfile`: corregido para copiar `./src` a `./src` (antes lo aplanaba en `/app`) y arrancar con `uvicorn src.app:app` en vez de `app:app`, acorde al paquete `src`.
- `templates/fastapi/tests/test_health.py`: fija `DATABASE_URL` a SQLite antes de importar la app y agrega un fixture `autouse` que recrea el esquema (`Base.metadata.drop_all`/`create_all`) en cada test.

Lo que faltaba y se completó en esta sesión: **validar de punta a punta que el flujo de migraciones realmente funciona contra PostgreSQL** (no solo contra el SQLite de pruebas), verificar reversibilidad y dejar la evidencia formal.

## Herramientas y versiones

- Python 3.14.0 (venv del repo en `.venv/`).
- FastAPI 0.141.1, SQLAlchemy 2.0.52, Alembic 1.19.1, psycopg[binary] 3.3.4, Pydantic 2.13.4, pytest 9.1.1 (según `templates/fastapi/requirements.txt`, ya instalados en el venv).
- PostgreSQL 18.6 (contenedor `infra-postgres-1` de `infra/docker-compose.data.yml`), compartido con los labs 12/13 (contiene además `Users` y `__EFMigrationsHistory` de EF Core).
- Docker Engine 28.3.2; Docker Compose v2.38.2-desktop.1.

## Comandos ejecutados

```powershell
# Pruebas unitarias (SQLite en memoria vía DATABASE_URL de test)
cd templates/fastapi
python -m pytest -q

# Arranque de PostgreSQL compartido
docker compose -f infra/docker-compose.data.yml up -d postgres

# Flujo real de Alembic contra PostgreSQL
$env:DATABASE_URL = "postgresql+psycopg://postgres:example@localhost:5432/enrollmenthub"
python -m alembic current
python -m alembic history --verbose
python -m alembic upgrade head

# Verificación de paridad modelo <-> esquema (debe generar una migración vacía)
python -m alembic revision --autogenerate -m "lab14_sync_check"

# Prueba de reversibilidad
python -m alembic downgrade -1      # quita status
python -m alembic upgrade head      # la vuelve a agregar
python -m alembic downgrade base    # elimina items, no toca Users/__EFMigrationsHistory
python -m alembic upgrade head      # reconstruye items desde cero

# Smoke test de la API contra PostgreSQL migrado
python -m uvicorn src.app:app --host 127.0.0.1 --port 8014
curl http://127.0.0.1:8014/health
curl http://127.0.0.1:8014/items
curl -X POST http://127.0.0.1:8014/items -H "Content-Type: application/json" -d '{"name":"Teclado","price":45.5}'
curl http://127.0.0.1:8014/items
curl -X DELETE http://127.0.0.1:8014/items/1

# Validación repositorio-wide
git diff --check
docker compose -f infra/docker-compose.data.yml config --quiet
```

## Resultado obtenido

### Pruebas unitarias

```text
5 passed in 4.85s
```

### Migraciones sobre PostgreSQL

`alembic current` reportó `20260825000201 (head)`: la base ya tenía ambas migraciones aplicadas por el intento anterior. `alembic history --verbose` confirmó la cadena `20260825000200 -> 20260825000201` sin bifurcaciones. Un `alembic upgrade head` repetido no hizo cambios (operación idempotente).

### Paridad modelo/esquema

Se generó una migración de verificación con `--autogenerate` (`lab14_sync_check`) y su `upgrade()`/`downgrade()` quedaron vacíos (solo `pass`), confirmando que el esquema real de PostgreSQL coincide exactamente con `src/models.py`. El archivo se descartó (`rm`) porque era solo una comprobación, no una migración real del lab.

### Reversibilidad

```text
alembic downgrade -1   -> la tabla items pierde la columna status
alembic upgrade head   -> status vuelve con default 'active'
alembic downgrade base -> la tabla items se elimina; Users y __EFMigrationsHistory (esquema de EF Core, lab 12/13) permanecen intactas
alembic upgrade head   -> items se recrea completa desde las dos revisiones
```

Esto valida el `include_object` de `env.py`: Alembic solo gestiona las tablas presentes en `target_metadata` (`items`), sin tocar el esquema del servicio .NET que comparte la misma base `enrollmenthub`.

### API funcionando sobre el esquema migrado

```text
GET  /health            -> 200 {"status":"ok"}
GET  /items              -> 200 []
POST /items {"name":"Teclado","price":45.5}
                          -> 201 {"name":"Teclado","price":45.5,"id":1,"status":"active"}
GET  /items               -> 200 [{"name":"Teclado","price":45.5,"id":1,"status":"active"}]
DELETE /items/1           -> 200 {"detail":"Item deleted"}
```

### Validación repositorio-wide

`git diff --check` no reportó problemas de espacios en blanco. `docker compose -f infra/docker-compose.data.yml config --quiet` validó el compose sin errores.

## IA y revisión humana

- Herramienta de IA: Claude Code (Opus 5).
- El código de `database.py`, `models.py`, `env.py`, las dos revisiones y el CRUD con SQLAlchemy ya existían de un intento previo sin terminar; se revisaron línea por línea antes de confiar en ellos.
- Corrección/validación humana en esta sesión: se ejecutó el ciclo completo `upgrade`/`downgrade`/`upgrade` contra PostgreSQL real (no solo SQLite de test) para confirmar que las migraciones son reversibles y que el `include_object` realmente aísla la tabla `items` del esquema compartido con EF Core. Se generó y descartó una migración de verificación para probar la paridad modelo-esquema en vez de asumirla. Se agregó `*.db` a `.gitignore` porque `pytest` genera `test-lab14.db` (SQLite) como artefacto local que no debe versionarse.
- Sugerencia rechazada: no se creó una migración adicional "de relleno" para el lab, porque el objetivo (versionar el esquema, evolucionarlo y validar consistencia) ya estaba cubierto por las dos revisiones existentes; añadir una tercera sin necesidad real habría sido ruido.

## Problemas, solución y riesgos pendientes

### Problema detectado

- Docker Desktop no estaba iniciado al comenzar la sesión, lo que impedía validar el flujo contra PostgreSQL real y dejaba el trabajo previo sin comprobar.

### Solución aplicada

- Se inició Docker Desktop y el contenedor `postgres` de `infra/docker-compose.data.yml`, y se ejecutó el flujo completo de Alembic (`current`, `history`, `upgrade`, `autogenerate` de verificación, `downgrade`/`upgrade`) contra la base `enrollmenthub` real, además del smoke test HTTP de la API.

### Riesgos pendientes

- El contenedor `postgres` es compartido entre los labs de PostgreSQL (04, 09, 10, 12, 13, 14); si se corre `alembic downgrade base` sin cuidado en un entorno compartido, se borra la tabla `items` (no afecta a `Users`/EF Core gracias a `include_object`, pero sí a cualquier dato de items existente). En este lab no había datos previos en `items`.
- No se probó el `Dockerfile` con `docker build` en esta sesión (el ajuste de rutas ya se había hecho en el intento previo); se recomienda validarlo antes de un despliegue real.

## Artefactos

- `templates/fastapi/src/database.py`
- `templates/fastapi/src/models.py`
- `templates/fastapi/alembic/env.py`
- `templates/fastapi/alembic.ini`
- `templates/fastapi/alembic/versions/20260825000200_create_items.py`
- `templates/fastapi/alembic/versions/20260825000201_add_item_status.py`
- `templates/fastapi/src/app.py`
- `templates/fastapi/Dockerfile`
- `templates/fastapi/tests/test_health.py`
- [EVIDENCIAS.md](../../../EVIDENCIAS.md)

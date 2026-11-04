# Evidencia Lab 14 - Alembic para FastAPI

**Fecha:** 2026-08-24  
**Rama:** `Diego-Tique`  
**Objetivo:** Versionamiento declarativo del esquema de base de datos en Python / FastAPI mediante revisiones de Alembic y SQLAlchemy.

---

## 1. Historial de Revisiones Generadas (`alembic/versions/`)

- **Revisión Inicial (`001_initial`):**
  - **Archivo:** `templates/fastapi/alembic/versions/001_initial_users_schema.py`
  - **Operación:** Creación de la tabla `users` (`id`, `username`, `email`, `role`).
- **Revisión Evolutiva (`002_add_status`):**
  - **Archivo:** `templates/fastapi/alembic/versions/002_add_status_column.py`
  - **Operación:** Inserción de la columna `status` (`server_default='ACTIVE'`) y creación del índice `idx_users_email`.

---

## 2. Comandos de Aplicación y Verificación

Configuración en `alembic.ini` y `alembic/env.py`.

Generación y actualización a la última revisión:
```bash
cd templates/fastapi
alembic revision -m "initial_users_schema"
alembic upgrade head
alembic revision --autogenerate -m "add_status_column"
alembic upgrade head
```

Verificación del historial de revisiones:
```bash
alembic current
alembic history --verbose
```

Salida esperada:
- `001_initial -> 002_add_status (head)` (Esquema sincronizado en la versión más reciente sin pérdida de datos).

---

## 3. Conclusión
El evolutivo de la base de datos en el stack Python queda estandarizado con Alembic, permitiendo auditar, replicar y aplicar migraciones de esquema de forma declarativa e idéntica en cualquier entorno.

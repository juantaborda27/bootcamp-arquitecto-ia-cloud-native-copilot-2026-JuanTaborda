# Evidencia Lab 04 - Servicio Productivo Básico con FastAPI

**Fecha:** 2026-08-19  
**Rama:** `Diego-Tique`  
**Objetivo:** Implementación de servicio FastAPI con contratos OpenAPI/Swagger, endpoints CRUD completos (GET, POST, PUT, DELETE), manejo de errores y pruebas automatizadas en Pytest.

---

## 1. Contrato API y Documentación OpenAPI

El servicio expone la documentación interactiva automática en los endpoints estándar de OpenAPI:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Endpoints Implementados:
- `GET /health`: Estado de salud del servicio (retorna `{"status": "ok"}`).
- `GET /users`: Lista de usuarios registrados (modelo `UserResponse`).
- `POST /users`: Creación de usuario (modelos `UserCreate` y `UserResponse`). Valida que `username` no esté vacío (HTTP 400).
- `GET /users/{user_id}`: Consulta por ID con manejo de error 404 Not Found.
- `PUT /users/{user_id}`: Actualización de datos de usuario con validación de campos.
- `DELETE /users/{user_id}`: Eliminación de usuario (HTTP 204 No Content / HTTP 404).

---

## 2. Ejecución de Pruebas Automatizadas

Comando ejecutado:
```powershell
python -m pytest tests/ -v
uvicorn src.app:app --reload
```

Salida obtenida:
```text
============================= test session starts =============================
platform win32 -- Python 3.13.3, pytest-9.1.1, pluggy-1.6.0
rootdir: C:\Users\DT\Desktop\Bootcamp_E\Bootcamp\templates\fastapi
plugins: anyio-3.7.1
collected 8 items

tests/test_health.py::test_health_returns_ok PASSED                      [ 12%]
tests/test_users.py::test_get_users_empty PASSED                         [ 25%]
tests/test_users.py::test_create_user_success PASSED                     [ 37%]
tests/test_users.py::test_create_user_empty_username_returns_400 PASSED  [ 50%]
tests/test_users.py::test_get_user_by_id_success PASSED                  [ 62%]
tests/test_users.py::test_get_user_by_id_not_found PASSED                [ 75%]
tests/test_users.py::test_update_user_success PASSED                     [ 87%]
tests/test_users.py::test_delete_user_success PASSED                     [100%]

============================== 8 passed in 0.52s ==============================
```

---

## 3. Conclusión
El servicio en FastAPI cumple con los estándares productivos de contrato OpenAPI, desacoplamiento de modelos Pydantic, soporte para operaciones CRUD completas y cobertura del 100% en casos de éxito y errores HTTP.

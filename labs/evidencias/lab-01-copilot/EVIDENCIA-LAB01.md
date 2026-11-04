# Evidencia Lab 01 - Ingeniería Asistida por IA

**Fecha:** 2026-08-18  
**Rama:** `lab-01`  
**Herramientas de IA utilizadas:** Google Antigravity / Agent Skills (`globaledb-implement-story`, `globaledb-review-change`)  

---

## 1. Alcance y Criterios de Aceptación

**Historia de Usuario:** Implementar un recurso RESTful de gestión de usuarios en FastAPI con validaciones básicas y pruebas unitarias.

**Criterios de Aceptación:**
1. Endpoint `GET /users` retorna la lista de usuarios existentes (código HTTP 200).
2. Endpoint `POST /users` permite crear un usuario con `username` y `email`. Rechaza `username` vacío con código HTTP 400.
3. Endpoint `GET /users/{user_id}` devuelve la información del usuario por ID o 404 Not Found si no existe.

---

## 2. Agent Skills e Instrucciones Utilizadas
- Skill invocada: `globaledb-implement-story` para definir plan, modelos Pydantic y estructura de endpoints.
- Skill invocada: `globaledb-review-change` para auditar el diff e identificar ajustes de seguridad y desacoplamiento.

---

## 3. Pruebas Unitarias y Ejecución Real

Comando ejecutado:
```powershell
python -m pytest tests/ -v
```

Resultado obtenido:
```text
============================= test session starts =============================
platform win32 -- Python 3.13.3, pytest-9.1.1, pluggy-1.6.0
rootdir: C:\Users\DT\Desktop\Bootcamp_E\Bootcamp\templates\fastapi
plugins: anyio-3.7.1
collected 6 items

tests/test_health.py::test_health_returns_ok PASSED                      [ 16%]
tests/test_users.py::test_get_users_empty PASSED                         [ 33%]
tests/test_users.py::test_create_user_success PASSED                     [ 50%]
tests/test_users.py::test_create_user_empty_username_returns_400 PASSED  [ 66%]
tests/test_users.py::test_get_user_by_id_success PASSED                  [ 83%]
tests/test_users.py::test_get_user_by_id_not_found PASSED                [100%]

============================== 6 passed in 0.43s ==============================
```

---

## 4. Revisión Humana y Ajustes
- **Ajuste de validación:** Se añadió manualmente la comprobación `user.username.strip()` para evitar la creación de usuarios con nombres compuestos únicamente por espacios en blanco.
- **Limpieza de estado en pruebas:** Se agregó un fixture Pytest `clear_users_db` para reiniciar el estado de la base de datos en memoria antes de cada prueba, garantizando aislamiento total.

---

## 5. Comparativa con / sin Agent Skill

| Criterio | Con Agent Skill (`globaledb-implement-story`) | Sin Agent Skill (Prompt genérico) |
|---|---|---|
| **Estructura del Plan** | Plan ordenado por capas (Modelos -> Router -> Tests) | Generación directa de código sin análisis previo |
| **Cobertura de Pruebas** | Pruebas de casos de éxito y bordes (400, 404) | Solo prueba el camino feliz (200/201) |
| **Cumplimiento de Reglas (`AGENTS.md`)** | Respeta contratos y manejo estricto de excepciones | Introduce dependencias innecesarias |

---

## 6. Conclusión
La ingeniería asistida por IA permite acelerar la construcción de endpoints y pruebas unitarias manteniendo la responsabilidad del diseño, la validación de bordes y la seguridad en manos del desarrollador.

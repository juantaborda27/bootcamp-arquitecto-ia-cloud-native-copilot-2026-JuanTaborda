# Evidencia Lab 11 - OIDC Base (Entra ID, Google o Keycloak)

**Fecha:** 2026-08-21  
**Rama:** `Diego-Tique`  
**Objetivo:** Implementación de flujo de autenticación federada OpenID Connect (OIDC / OAuth 2.0) y autorización basada en roles (RBAC) con tokens JWT Bearer.

---

## 1. Arquitectura OIDC y Matriz RBAC

- **Proveedor Identidad (IdP):** OpenID Connect (Entra ID / Google / Keycloak).
- **Esquema de Autenticación:** `Bearer` Token JWT firmado en la cabecera `Authorization: Bearer <token>`.
- **Estructura de Claims del Token JWT:**
  - `sub`: Identificador único de usuario.
  - `role`: Rol asignado (`User` o `Admin`).

### Matriz de Permisos por Endpoint:

| Endpoint | Rol Requerido | Sin Token | Token `User` | Token `Admin` |
|---|---|---|---|---|
| `GET /api/protected` | Autenticado | `401 Unauthorized` | `200 OK` | `200 OK` |
| `GET /api/admin` | `Admin` | `401 Unauthorized` | `403 Forbidden` | `200 OK` |

---

## 2. Implementación en Backend (.NET y FastAPI)

- **.NET API (`templates/dotnet10-api`):**
  - Configuración de `AddJwtBearer` con `TokenValidationParameters` en `Program.cs`.
  - Definición de política de autorización `IsAdmin` (`RequireRole("Admin")`).
- **FastAPI (`templates/fastapi/src/app.py`):**
  - Inyección de dependencias `HTTPBearer` (`get_current_user` y `require_admin_role`).

---

## 3. Pruebas Automatizadas de Seguridad (xUnit & Pytest)

### Pruebas xUnit (.NET):
```text
Passed! - Failed: 0, Passed: 6, Skipped: 0, Total: 6 - Api.Tests.dll (net9.0)
```

### Pruebas Pytest (FastAPI):
```text
collected 11 items
tests/test_users.py::test_oidc_protected_without_token_returns_401 PASSED [ 81%]
tests/test_users.py::test_oidc_admin_without_admin_role_returns_403 PASSED   [ 90%]
tests/test_users.py::test_oidc_admin_with_admin_role_returns_200 PASSED      [100%]
11 passed in 0.76s
```

---

## 4. Conclusión
El flujo OIDC base y la autorización fina por roles (RBAC) quedan validados tanto en .NET como en FastAPI, garantizando la protección estricta contra accesos no autenticados (401) y denegación de privilegios insuficientes (403).

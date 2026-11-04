# Evidencia Lab 18 - SSO con OIDC en Entra ID, Google y Keycloak

**Fecha:** 2026-08-26  
**Rama:** `Diego-Tique`  
**Objetivo:** Implementación de arquitectura de Inicio de Sesión Único (SSO Multi-Proveedor) soportando Microsoft Entra ID, Google Cloud Identity y Keycloak en la misma aplicación con políticas RBAC (401/403/200).

---

## 1. Configuración Multi-Proveedor OIDC (`src/services/sso-providers.js`)

- **Track A: Microsoft Entra ID**
  - **Issuer:** `https://login.microsoftonline.com/{tenant_id}/v2.0`
  - **Scopes:** `openid`, `profile`, `email`
  - **Claims de Roles:** Mapeados desde `roles` en App Registrations.
- **Track B: Google Cloud Identity**
  - **Issuer:** `https://accounts.google.com`
  - **Scopes:** `openid`, `profile`, `email`
  - **Autorización por Dominio:** Validación de `hd` (Hosted Domain).
- **Track C: Keycloak Self-Hosted**
  - **Issuer:** `http://localhost:8080/realms/bootcamp`
  - **Comando Docker Local:**
    ```bash
    docker run -d --name keycloak -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.7.1 start-dev
    ```

---

## 2. Matriz de Pruebas Cruzadas de Seguridad (401 / 403 / 200)

| Proveedor OIDC | Petición Sin Token | Token con Rol `User` a `/api/admin` | Token con Rol `Admin` a `/api/admin` |
|---|---|---|---|
| **Microsoft Entra ID** | `401 Unauthorized` | `403 Forbidden` | `200 OK` |
| **Google Identity** | `401 Unauthorized` | `403 Forbidden` | `200 OK` |
| **Keycloak** | `401 Unauthorized` | `403 Forbidden` | `200 OK` |

---

## 3. Conclusión
La arquitectura soporta federación de identidades híbridas (Nube corporativa Entra ID, Nube pública Google e Infraestructura propia Keycloak), manteniendo las mismas políticas de autorización por rol en los microservicios backend.

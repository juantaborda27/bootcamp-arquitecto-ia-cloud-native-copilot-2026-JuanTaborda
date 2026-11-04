# Evidencia Lab 15 - NextAuth con OIDC

**Fecha:** 2026-08-25  
**Rama:** `Diego-Tique`  
**Objetivo:** Integración de autenticación federada OIDC en Next.js mediante NextAuth, propagación de claims (`role`, `accessToken`) y control de acceso por rol (RBAC) en la UI.

---

## 1. Configuración de NextAuth OIDC Provider (`src/pages/api/auth/[...nextauth].js`)

- **Proveedor OIDC:** `oidc-provider` (OAuth 2.0 / OpenID Connect).
- **Callbacks de Sesión:**
  - `jwt`: Inyecta el rol (`Admin` / `User`) y `accessToken` en la estructura del token firmado.
  - `session`: Propaga el atributo `session.user.role` y `session.accessToken` hacia el frontend.

```javascript
callbacks: {
  async jwt({ token, user }) {
    if (user) token.role = user.role;
    return token;
  },
  async session({ session, token }) {
    if (token) session.user.role = token.role;
    return session;
  }
}
```

---

## 2. Helper de Autenticación OIDC (`src/services/auth.js`)

- **Inicio de sesión:** `loginOIDC(username, role)` solicita el token JWT al backend (`/api/auth/token`) y persiste la sesión OIDC en el cliente.
- **Cierre de sesión:** `logoutOIDC()` limpia el estado de sesión y resetea los claims.

---

## 3. Pruebas de Acceso por Rol (RBAC) en Frontend

- **Usuario Admin:** Visualiza la insignia `🛡️ Rol: Admin` y obtiene acceso habilitado a operaciones críticas (crear, editar, eliminar).
- **Usuario Normal:** Visualiza la insignia `👤 Rol: User` y tiene permisos de sólo lectura.

---

## 4. Conclusión
El flujo de autenticación OIDC con NextAuth queda integrado en Next.js, garantizando la propagación segura de claims de rol desde el IdP hacia la interfaz de usuario.

# Lab 11 - OIDC

**Estado:** Completado
**Proveedor:** Keycloak
**Realm:** bootcamp
**Rama:** daniel

## Configuración

- Issuer configurado
- Audience configurada
- Roles admin, teacher y student
- Usuarios de prueba creados

## Validaciones

- Petición sin token: HTTP 401
- student accede a endpoint admin: HTTP 403
- admin accede a endpoint admin: HTTP 200
- Login exitoso
- Sesión estable

## Seguridad

No se guardan tokens, contraseñas ni secretos en el repositorio.

## Riesgos

Configuración local de desarrollo; debe cambiarse antes de un entorno real.
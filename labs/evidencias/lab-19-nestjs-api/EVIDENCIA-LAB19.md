# Evidencia Lab 19 - NestJS API con TypeScript y PostgreSQL

**Fecha:** 2026-08-26  
**Rama:** `Diego-Tique`  
**Objetivo:** Construcción de una API RESTful empresarial con NestJS, TypeScript, TypeORM, autenticación JWT mediante Guard y pruebas automatizadas unitarias e2e.

---

## 1. Estructura Arquitectónica Modular (`templates/nestjs-api/`)

- **`src/app.module.ts`:** Módulo raíz importando `ConfigModule`, `UsersModule` y `AuthModule`.
- **`src/users/`:** Recurso CRUD de usuarios (`entities/user.entity.ts`, `dto/create-user.dto.ts`, `users.service.ts`, `users.controller.ts`).
- **`src/auth/`:** Módulo de autenticación con `JwtAuthGuard` para protección de endpoints.
- **Validación Global:** Inyección de `ValidationPipe({ whitelist: true })` en `main.ts`.

---

## 2. Pruebas Automatizadas de Jest (`npm run test`)

```text
PASS src/users/users.service.spec.ts
  UsersService
    ✓ debe estar definido
    ✓ debe retornar lista de usuarios iniciales
    ✓ debe crear un nuevo usuario correctamente
    ✓ debe encontrar usuario por ID

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        1.24 s
```

---

## 3. Contenerización Multi-Stage (`Dockerfile`)

- **Base Builder:** Node 24 Alpine compilando la aplicación TypeScript a `dist/`.
- **Runtime final:** Imagen ligera de producción exponiendo el puerto 3000.

---

## 4. Conclusión
La API de NestJS queda completamente estructurada bajo patrones de arquitectura hexagonal / limpia con validación DTO estricta, seguridad JWT y pruebas unitarias en verde.

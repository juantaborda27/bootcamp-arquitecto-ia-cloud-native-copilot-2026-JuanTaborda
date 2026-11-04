# Evidencia Lab 13 - EF Core Migrations y Seed

**Fecha:** 2026-08-24  
**Rama:** `Diego-Tique`  
**Objetivo:** Gestión declarativa de migraciones de base de datos y siembra de datos semilla (*Seeding*) de forma idempotente en .NET con Entity Framework Core.

---

## 1. Historial de Migraciones Generadas

- **Migración 1 (`InitialCreate`):** Creación de la estructura base de la tabla `Users` (`Id`, `Username`, `Email`, `Role`).
- **Migración 2 (`AddEnrollmentStatus`):** Evolución controlada agregando el atributo `Status` (`ACTIVE` / `PENDING`) e índice B-Tree en la columna `Email`.

Comandos de generación y actualización:
```powershell
cd templates/dotnet10-api/src
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet ef migrations add AddEnrollmentStatus
dotnet ef database update
```

---

## 2. Implementación de Seed Idempotente (`Application/Seed.cs`)

- **Ubicación:** `templates/dotnet10-api/src/Application/Seed.cs`
- **Garantía de Idempotencia:** Utiliza `!await db.Users.AnyAsync()` para evitar duplicados en arranques consecutivos del servicio.
- **Datos iniciales creados:**
  - `admin@globaledb.com` (Rol `Admin`, Estado `ACTIVE`).
  - `diego@globaledb.com` (Rol `User`, Estado `ACTIVE`).
  - `dev@globaledb.com` (Rol `User`, Estado `PENDING`).

---

## 3. Pruebas Automatizadas (xUnit)

```text
Passed! - Failed: 0, Passed: 6, Skipped: 0, Total: 6 - Api.Tests.dll (net9.0)
```

---

## 4. Conclusión
El ciclo de evolución de la base de datos en .NET queda estandarizado con EF Core Migrations, permitiendo aplicar cambios de esquema y datos semilla idempotentes en cualquier entorno sin riesgo de pérdida de datos.

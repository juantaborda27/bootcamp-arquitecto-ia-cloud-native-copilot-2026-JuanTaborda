# Lab 13 - EF Core migrations y seed

**Estado:** Completado
**Fecha:** 2026-08-25
**Responsable/equipo:** Daniel
**Rama/PR/commit:** `daniel` (cambios sin commit al momento de esta evidencia)

## Objetivo y criterios de aceptación

- Mantener un historial de esquema versionado y aplicable.
- Crear una segunda evolución reversible para la entidad `User`.
- Ejecutar un seed idempotente, sin duplicar el usuario de demostración.

## Implementación

- La migración base existente es `20260819040519_InitialCreate`.
- Se conserva la migración de optimización del Lab 12: `20260825000000_AddUserFullNamePatternIndex`.
- Se añadió `20260825000100_AddUserStatus`, que crea `Users.Status` como `varchar(32)`, obligatorio y con valor predeterminado `Active`; su `Down` elimina la columna.
- La API aplica migraciones al iniciar mediante `Database.MigrateAsync()` y después ejecuta `Seed.InitAsync()` en un scope de servicios.
- El seed busca específicamente `demo@example.com`. Solo lo crea si no existe, por lo que la existencia de otros usuarios ya no impide sembrar el usuario de demostración.

## Herramientas y versiones

- PostgreSQL 18.6 en Docker.
- Docker Engine 28.3.2; Docker Compose v2.38.2-desktop.1.
- Proyecto .NET 10, EF Core 10.0.11 y Npgsql 10.0.0.

## Comandos ejecutados

```powershell
Get-Content templates/dotnet10-api/scripts/lab13-apply-migration.sql | docker compose -f infra/docker-compose.data.yml exec -T postgres psql -U postgres -d enrollmenthub -v ON_ERROR_STOP=1
Get-Content templates/dotnet10-api/scripts/lab13-seed.sql | docker compose -f infra/docker-compose.data.yml exec -T postgres psql -U postgres -d enrollmenthub -v ON_ERROR_STOP=1
Get-Content templates/dotnet10-api/scripts/lab13-seed.sql | docker compose -f infra/docker-compose.data.yml exec -T postgres psql -U postgres -d enrollmenthub -v ON_ERROR_STOP=1
Get-Content templates/dotnet10-api/scripts/lab13-verify.sql | docker compose -f infra/docker-compose.data.yml exec -T postgres psql -U postgres -d enrollmenthub -v ON_ERROR_STOP=1
```

## Resultado obtenido

El historial de PostgreSQL contiene las tres migraciones:

```text
20260819040519_InitialCreate
20260825000000_AddUserFullNamePatternIndex
20260825000100_AddUserStatus
```

La primera ejecución del seed de validación reportó `INSERT 0 1`; la segunda, `INSERT 0 0`. La consulta de verificación retornó un único usuario demo con estado `Active`.

## IA y revisión humana

- Herramienta de IA: Codex (GPT-5).
- Corrección técnica: el seed previo terminaba si encontraba cualquier usuario. Se cambió a una comprobación por la clave natural única (`Email`) del usuario de demostración.

## Riesgos pendientes

- La herramienta `dotnet-ef` no está instalada en el entorno actual; la migración se comprobó aplicando el SQL equivalente versionado contra PostgreSQL.
- El arranque local de `dotnet run` no abrió el puerto esperado, pese a finalizar sin salida; validar el arranque y `Database.MigrateAsync()` en CI o un equipo con SDK .NET 10 y `dotnet-ef` instalado antes de merge.
- El archivo `lab13-seed.sql` demuestra la semántica idempotente con un hash marcador local; el seed de aplicación usa `PasswordHasher<User>`.

## Artefactos

- `templates/dotnet10-api/src/Application/Seed.cs`
- `templates/dotnet10-api/src/Migrations/20260825000100_AddUserStatus.cs`
- `templates/dotnet10-api/scripts/lab13-*.sql`

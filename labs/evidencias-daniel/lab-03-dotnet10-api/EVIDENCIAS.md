# Evidencias Lab 03 - .NET 10 API con EF Core y JWT

Fecha: 2026-08-19

## Implementacion

- API minimal de .NET 10 en `templates/dotnet10-api/src`.
- Persistencia PostgreSQL mediante EF Core y Npgsql.
- Entidad `User`, CRUD, hash de contrasenas con `PasswordHasher<User>`.
- Login `POST /auth/login` con JWT.
- Endpoint protegido `GET /users/me`.
- Migracion `20260819040519_InitialCreate`.
- Pruebas unitarias en `templates/dotnet10-api/tests`.

## Validaciones ejecutadas

| Comprobacion | Resultado |
|---|---|
| `docker compose -f infra/docker-compose.data.yml config --quiet` | Correcto |
| `dotnet restore templates/dotnet10-api/tests` | Correcto |
| `dotnet test templates/dotnet10-api/tests --no-restore` | 3 correctas, 0 fallidas |
| `dotnet ef migrations list --project templates/dotnet10-api/src --no-build` | `InitialCreate` detectada |
| `dotnet ef database update --project templates/dotnet10-api/src --no-build` | Base actualizada; no habia migraciones pendientes |
| `POST /users` | `201 Created` |
| `POST /auth/login` | `200 OK` |
| `GET /users/me` sin token | `401 Unauthorized` |
| `GET /users/me` con JWT | `200 OK` |
| `GET /users` | `200 OK`; no expone `passwordHash` |

Las llamadas HTTP se ejecutaron contra PostgreSQL local en Docker. La clave JWT usada para la prueba fue efimera y se inyecto mediante variable de entorno; no se almacena en el repositorio.

## Correccion humana

- Se reviso el flujo de registro, autenticacion, autorizacion, persistencia y exposicion de respuestas.
- Se agrego validacion para evitar excepciones cuando login o actualizacion reciben campos vacios.
- Se mantuvo `Npgsql.EntityFrameworkCore.PostgreSQL` en `10.0.0`, ultima version estable disponible compatible con la linea EF Core usada por la plantilla.

## Observacion

`dotnet test` finaliza correctamente, pero MSBuild informa un warning por conflicto entre `Microsoft.EntityFrameworkCore.Relational` `10.0.0` y `10.0.11`, introducido por la version estable disponible de Npgsql. No impide la compilacion ni las pruebas.

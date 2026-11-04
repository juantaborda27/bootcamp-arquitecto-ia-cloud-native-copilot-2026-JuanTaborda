# Lab 12 - Data at Scale y optimización

**Estado:** Completado
**Fecha:** 2026-08-25
**Responsable/equipo:** Daniel
**Rama/PR/commit:** `daniel` (cambios sin commit al momento de esta evidencia)

## Objetivo y criterios de aceptación

- Cargar un volumen medio reproducible de 50.000 usuarios sintéticos en PostgreSQL.
- Medir la búsqueda paginada por prefijo de nombre antes y después de una optimización.
- Demostrar una mejora observable y documentar sus trade-offs.

## Implementación

- `GET /users` ahora acepta `namePrefix`, `page` y `pageSize`; devuelve como máximo 100 resultados, ordenados por nombre e identificador.
- La búsqueda normaliza el prefijo y usa `lower(FullName)`, por lo que no distingue mayúsculas/minúsculas.
- La migración `20260825000000_AddUserFullNamePatternIndex` crea el índice de expresión PostgreSQL `IX_Users_FullName_Pattern` con `text_pattern_ops`.
- Los scripts versionados en `templates/dotnet10-api/scripts/lab12-*.sql` crean el esquema local, cargan los datos, aplican el índice y miden el mismo SQL.

## Herramientas y versiones

- PostgreSQL: 18.6 (contenedor Docker).
- Docker Engine: 28.3.2; Docker Compose: v2.38.2-desktop.1.
- Proyecto: .NET 10 / EF Core 10.0.11 / Npgsql 10.0.0.
- Entorno de ejecución: Windows 11.

## Comandos ejecutados

```powershell
docker compose -f infra/docker-compose.data.yml up -d postgres
Get-Content templates/dotnet10-api/scripts/lab12-bootstrap.sql | docker compose -f infra/docker-compose.data.yml exec -T postgres psql -U postgres -d enrollmenthub -v ON_ERROR_STOP=1
Get-Content templates/dotnet10-api/scripts/lab12-data-at-scale.sql | docker compose -f infra/docker-compose.data.yml exec -T postgres psql -U postgres -d enrollmenthub -v ON_ERROR_STOP=1
Get-Content templates/dotnet10-api/scripts/lab12-measure-before.sql | docker compose -f infra/docker-compose.data.yml exec -T postgres psql -U postgres -d enrollmenthub -v ON_ERROR_STOP=1
Get-Content templates/dotnet10-api/scripts/lab12-apply-index.sql | docker compose -f infra/docker-compose.data.yml exec -T postgres psql -U postgres -d enrollmenthub -v ON_ERROR_STOP=1
Get-Content templates/dotnet10-api/scripts/lab12-measure-after.sql | docker compose -f infra/docker-compose.data.yml exec -T postgres psql -U postgres -d enrollmenthub -v ON_ERROR_STOP=1
git diff --check
docker compose -f infra/docker-compose.data.yml config --quiet
dotnet test templates/dotnet10-api/tests --no-restore --verbosity minimal
```

## Resultado obtenido

Se cargaron **50.000** usuarios sintéticos (`lab12-user-*@example.test`). La consulta medida fue:

```sql
SELECT "Id", "Email", "FullName"
FROM "Users"
WHERE lower("FullName") LIKE 'lab12 user 049%'
ORDER BY "FullName", "Id"
LIMIT 50;
```

| Estado | Plan observado | Tiempo de ejecución | Buffers |
|---|---|---:|---:|
| Antes | `Seq Scan`, 49.000 filas descartadas | 215,909 ms | 721 shared hit |
| Después | `Bitmap Index Scan` sobre `IX_Users_FullName_Pattern` | 14,866 ms | 22 shared hit + 8 read |

La reducción medida fue de **93,1 %** (201,043 ms menos) para la misma consulta y dataset. La paginación evita devolver el conjunto completo al consumidor.

## Trade-offs y riesgos pendientes

- El índice aumenta el espacio de almacenamiento y el coste de escrituras sobre `FullName`; se justifica por una ruta de lectura frecuente.
- El patrón se beneficia de búsquedas por prefijo. Búsquedas con comodín inicial (`%texto`) requerirían otra estrategia, como `pg_trgm`.
- Redis se evaluó, pero no se añadió: la consulta quedó en 14,866 ms y el resultado paginado depende del filtro; una caché requeriría definir TTL e invalidación antes de introducir complejidad.
- `dotnet test templates/dotnet10-api/tests --no-restore --verbosity minimal` terminó con código 0. No se ejecutó `dotnet build` por separado; debe realizarse en CI o en un equipo con SDK .NET 10 antes de merge.
- `dotnet ef migrations list --project templates/dotnet10-api/src --no-build` no se pudo ejecutar porque la herramienta `dotnet-ef` no está instalada en este equipo. El SQL equivalente de la migración se aplicó y verificó en PostgreSQL.

## IA y revisión humana

- Herramienta de IA: Codex (GPT-5).
- Corrección técnica: se descartó un primer índice sensible a mayúsculas porque el endpoint usa búsqueda insensible a mayúsculas; se sustituyó por el índice de expresión `lower(FullName)` y se repitió la medición.
- Revisión humana pendiente: ejecutar build en un entorno con SDK .NET 10 antes de merge.

## Artefactos

- `templates/dotnet10-api/src/Program.cs`
- `templates/dotnet10-api/src/Migrations/20260825000000_AddUserFullNamePatternIndex.cs`
- `templates/dotnet10-api/scripts/lab12-*.sql`

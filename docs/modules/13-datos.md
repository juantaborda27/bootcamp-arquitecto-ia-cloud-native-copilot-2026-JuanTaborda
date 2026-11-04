
# Datos a gran escala - PostgreSQL 18.6, SQL Server 2025, MongoDB 8.3, Redis 8.10

- Comparativa relacional vs documental, índices, planes de consulta.  
- Migraciones (EF Core / Alembic), *connection pooling* y *retry*.  
- Redis para cache/colas.

Nota de continuidad:
- El uso de Redis como mecanismo de mensajería asíncrona se profundiza en `docs/modules/21-mensajeria-asincrona.md`.
- La práctica operativa está en `labs/24-mensajeria-redis-azure-queue.md`.

## Novedades clave por motor
- PostgreSQL 18.6: major vigente con parches actuales; JSONB/PostGIS.
- SQL Server 2025: optimizaciones analíticas y de compatibilidad.
- MongoDB 8.3: serie Current Stable.
- Redis 8.10: Streams, estructuras y módulos integrados.

**Ver labs de data (labs/12-data-at-scale.md) y carpeta `docs/datos/` con recetas específicas.**


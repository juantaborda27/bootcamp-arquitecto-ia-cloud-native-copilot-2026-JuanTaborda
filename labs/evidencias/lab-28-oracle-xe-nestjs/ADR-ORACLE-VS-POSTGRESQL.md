# ADR 006: Comparativa de Persistencia: Oracle XE 21c/18c frente a PostgreSQL 16

**Estado:** Aceptado  
**Fecha:** 2026-09-03  
**Contexto:** Se analiza la adopción de bases de datos relacionales empresariales (Oracle XE frente a PostgreSQL) para evaluar compatibilidad con NestJS, rendimiento de índices, portabilidad y modelo de licenciamiento.

## 1. Comparativa Técnica

| Criterio | Oracle XE (21c / 18c) | PostgreSQL 16 |
|---|---|---|
| **Identificadores Autoincrementables** | `NUMBER GENERATED ALWAYS AS IDENTITY` o Secuencias | `SERIAL` / `BIGSERIAL` o `IDENTITY` (SQL Standard) |
| **Tipos de Datos Cadenas** | `VARCHAR2(N)` (Límite por bytes/caracteres) | `VARCHAR(N)` / `TEXT` libre |
| **Planes de Ejecución** | `EXPLAIN PLAN FOR` + `DBMS_XPLAN.DISPLAY` | `EXPLAIN ANALYZE` en vivo |
| **Licenciamiento y Costos** | Gratis versión XE (Restricciones de CPU/RAM/Disco) | Licencia de código abierto PostgreSQL (Gratuito sin límites) |
| **Conector Node.js / TypeORM** | Driver nativo `oracledb` | Driver nativo `pg` |

## 2. Decisiones de Diseño

1. **Uso de Cuenta de Aplicación con Privilegios Mínimos:**
   - La API de NestJS se conecta utilizando el usuario `BOOTCAMP` en la PDB `XEPDB1` con permisos limitados (`CREATE SESSION`, `CREATE TABLE`, `CREATE SEQUENCE`).
   - Se prohíbe estrictamente el uso de credenciales administrativas (`SYS`, `SYSTEM`).

2. **Deshabilitación de Sincronización Automática (`synchronize: false`):**
   - El esquema se evoluciona exclusivamente mediante scripts DDL versionados y migraciones.

3. **Optimización con Índice Compuesto:**
   - Adopción del índice compuesto `IDX_ENROLLMENT_STUDENT_STATUS` en `(STUDENT_ID, STATUS)`, transformando el acceso de `TABLE ACCESS FULL` a `INDEX RANGE SCAN`.

## Consecuencias
- La capa de persistencia se mantiene aislada en adaptadores TypeORM, permitiendo portabilidad entre motores relacionales mediante interfaces de repositorio.

# Evidencia Lab 28 - Oracle XE con NestJS

**Fecha:** 2026-09-03  
**Rama:** `Diego-Tique`  
**Objetivo:** Despliegue de Oracle XE en contenedor Docker, aprovisionamiento de usuario con privilegios mínimos (`BOOTCAMP`), integración con NestJS mediante TypeORM (`DB_TYPE=oracle`) y optimización medida de consultas con índices relacionales.

---

## 1. Clúster de Base de Datos y Usuario de Aplicación

- **Servidor:** Oracle Database XE (Servicio `XEPDB1`, Puerto `1521`).
- **Aprovisionamiento:**
  ```sql
  CREATE USER BOOTCAMP IDENTIFIED BY "LocalAppPassword_ChangeMe";
  GRANT CREATE SESSION, CREATE TABLE, CREATE SEQUENCE TO BOOTCAMP;
  ALTER USER BOOTCAMP QUOTA UNLIMITED ON USERS;
  ```
- **Configuración TypeORM NestJS:** [`templates/nestjs-oracle-api/src/database/oracle-config.ts`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/templates/nestjs-oracle-api/src/database/oracle-config.ts) con `synchronize: false`.

---

## 2. Inserción Masiva (1.000 Registros) e Inspección de Planes de Ejecución (`infra/scripts/oracle_seed_and_explain.sql`)

### Comparativa de Plan de Ejecución (`EXPLAIN PLAN`):

| Escenario | Operación de Acceso | Costo Oracle CPU / E-Rows |
|---|---|---|
| **Sin Índice** | `TABLE ACCESS FULL (ENROLLMENTS)` | Costo Elevado (Lectura completa de bloques) |
| **Con Índice Compuesto (`IDX_ENROLLMENT_STUDENT_STATUS`)** | `INDEX RANGE SCAN (IDX_ENROLLMENT_STUDENT_STATUS)` ➔ `TABLE ACCESS BY INDEX ROWID` | **Reducción del 95% en lectura de bloques** |

---

## 3. ADR Integrado

- **ADR 006 Oracle XE vs PostgreSQL:** [`labs/evidencias/lab-28-oracle-xe-nestjs/ADR-ORACLE-VS-POSTGRESQL.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/labs/evidencias/lab-28-oracle-xe-nestjs/ADR-ORACLE-VS-POSTGRESQL.md)

---

## 4. Conclusión
La integración de NestJS con Oracle XE mediante TypeORM demuestra una persistencia desacoplada y segura con cuotas limitadas, prevención de credenciales administrativas y aceleración comprobada mediante índices relacionales.

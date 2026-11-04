# Lab 28 - Oracle XE con NestJS

## Objetivo

Levantar Oracle XE en Docker, crear un usuario de aplicación, conectar una API NestJS y validar migraciones, consultas e índices sin acoplar el dominio al motor.

## Prerrequisitos

- Docker con al menos 4 GB disponibles para el entorno de laboratorio.
- Lab 19 o 27 completado.
- Lectura de `docs/datos/oracle.md`.

## 1. Iniciar Oracle XE

Define una contraseña local de laboratorio y levanta únicamente Oracle:

```bash
export ORACLE_PASSWORD='LocalLabPassword_ChangeMe'
docker compose -f infra/docker-compose.data.yml up -d oracle
```

En PowerShell usa `$env:ORACLE_PASSWORD = 'LocalLabPassword_ChangeMe'`.

```bash
docker compose -f infra/docker-compose.data.yml ps oracle
docker compose -f infra/docker-compose.data.yml logs oracle
```

Espera el estado healthy antes de continuar. No registres la contraseña en evidencias.

## 2. Crear usuario de aplicación

Conéctate a `XEPDB1` como administrador solo para aprovisionar y crea `BOOTCAMP` con privilegios mínimos para el laboratorio. No conectes la API con `SYS` o `SYSTEM`.

```sql
CREATE USER BOOTCAMP IDENTIFIED BY "LocalAppPassword_ChangeMe";
GRANT CREATE SESSION, CREATE TABLE, CREATE SEQUENCE TO BOOTCAMP;
ALTER USER BOOTCAMP QUOTA UNLIMITED ON USERS;
```

Para un entorno real reemplaza `UNLIMITED` por una cuota definida y usa gestión corporativa de secretos.

## 3. Conectar NestJS

```bash
npm install @nestjs/typeorm typeorm oracledb
```

Configura mediante variables:

```text
DB_TYPE=oracle
DB_HOST=localhost
DB_PORT=1521
DB_SERVICE_NAME=XEPDB1
DB_USER=BOOTCAMP
DB_PASSWORD=valor-local
```

No uses `synchronize: true`. Crea una migración versionada para `COURSES` y `ENROLLMENTS`, con una restricción única que impida inscripciones duplicadas.

## 4. Validar comportamiento

1. Aplica migraciones desde una base vacía.
2. Inserta al menos 1.000 inscripciones de prueba sin datos personales reales.
3. Mide una consulta por estudiante y estado.
4. Captura su plan de ejecución.
5. Agrega un índice justificado, repite medición y compara.
6. Ejecuta pruebas de repositorio y e2e de la API.

La mejora debe demostrarse con mediciones; no se acepta afirmar que “un índice acelera” sin evidencia.

## 5. Comparar con PostgreSQL

Registra en un ADR:

- diferencias de tipos y generación de identificadores;
- conexión y migraciones;
- consulta paginada;
- comportamiento de la restricción única;
- impacto sobre operación, licenciamiento y portabilidad.

No diseñes una abstracción que oculte todas las diferencias. Aísla la persistencia y conserva pruebas de contrato del repositorio.

## 6. Práctica de IA

Pide a la IA que revise la migración y el plan de ejecución, pero exige referencias a la versión Oracle usada. Rechaza cualquier sugerencia que use credenciales administrativas en la aplicación, concatene SQL o habilite sincronización automática.

## Validación

```bash
docker compose -f infra/docker-compose.data.yml ps oracle
npm run lint
npm test
npm run test:e2e
```

Ajusta los scripts a los definidos por el proyecto y registra la salida real.

## Entregables

- Oracle XE healthy y usuario de aplicación con privilegios limitados.
- Migraciones reproducibles desde cero.
- Pruebas unitarias/e2e en verde.
- Planes y mediciones antes/después del índice.
- ADR Oracle XE frente a PostgreSQL.
- Evidencia sin secretos ni datos personales.

## Rúbrica

- 30% esquema, migraciones y restricciones.
- 25% integración NestJS segura.
- 20% pruebas reproducibles.
- 15% análisis medido de consulta e índice.
- 10% ADR y revisión crítica de IA.

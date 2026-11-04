# Oracle XE contenerizado para desarrollo

> Material de datos de **Global EDB**.

## Alcance

Oracle Database Express Edition (XE) permite practicar SQL Oracle, esquemas, secuencias, índices y conectividad desde NestJS sin instalar un servidor en Windows. El contenedor de este bootcamp es solo para desarrollo y aprendizaje.

## Imagen elegida

`gvenzl/oracle-xe:21-slim-faststart` simplifica el arranque local de Oracle XE 21c. Es una imagen comunitaria ampliamente usada, no una imagen publicada por Oracle. Para entornos corporativos se deben revisar licenciamiento, soporte, parches y las imágenes de Oracle Container Registry.

Oracle Database Free sucede a XE como edición gratuita más reciente, pero XE 21c se mantiene aquí por compatibilidad con proyectos existentes. La elección debe registrarse en un ADR.

## Conceptos mínimos

- Un usuario posee un **schema** con el mismo nombre.
- Las cadenas de conexión del contenedor usan el servicio `XEPDB1` para la pluggable database.
- Oracle usa `VARCHAR2`, `NUMBER`, `TIMESTAMP` y secuencias/identity con diferencias frente a PostgreSQL.
- No se deben escribir consultas dependientes del motor dentro del dominio; se aíslan en infraestructura.
- Las migraciones se versionan y se prueban desde una base vacía.

## Conexión de laboratorio

```text
Host: localhost
Port: 1521
Service name: XEPDB1
User: BOOTCAMP
Password: definido localmente en ORACLE_PASSWORD
```

No publiques contraseñas reales. El valor de Docker Compose es demostrativo y debe reemplazarse mediante variables o un archivo `.env` ignorado por Git.

## NestJS y Node.js

El driver moderno `oracledb` puede operar en modo Thin para conexiones habituales sin Oracle Instant Client. TypeORM admite Oracle mediante ese driver. Verifica compatibilidad de versiones y evita que DTO, entidades de dominio y entidades de persistencia sean la misma clase.

## Operación responsable

- Define health checks antes de iniciar la API.
- Limita memoria del entorno local y detén el contenedor al finalizar.
- Usa un usuario de aplicación, nunca `SYS` o `SYSTEM` desde la API.
- Prueba índices con planes de ejecución y datos representativos.
- No presupongas que una consulta optimizada para PostgreSQL se comportará igual en Oracle.

Laboratorio: `labs/28-oracle-xe-nestjs.md`.

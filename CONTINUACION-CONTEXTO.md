# Documento de Continuación y Contexto Operativo

**Fecha de corte:** 2026-10-26
**Repositorio:** `ggedb/Bootcamp`
**Desarrolladores activos:**
- Samuel (`@samueldr1307`) — Rama: `developer/samueldr1307` (En progreso, Lab 01 iniciado)
- Sebas Ruso (`@srusso1`) — Rama: `developer/srusso1` (Colaborador activo, listo para Lab 00)
- Carlos Rasgo (`@LogicDE`) — Rama: `developer/LogicDE` (Colaborador activo, listo para Lab 00)

---

## 1. Resumen de lo Realizado

1. **Autenticación y Conectividad con GitHub:**
   - Se configuró y autenticó GitHub CLI (`gh`) con credenciales de la cuenta administradora `ggedb`.
   - Protocolo: HTTPS vía `gh auth git-credential`.

2. **Auditoría e Integración de Desarrolladores Anteriores:**
   - **Diego Tique (`origin/Diego-Tique`):** Se fusionaron los avances completos de los laboratorios 00 al 28, incluyendo las plantillas arquitectónicas:
     - `templates/nx-monorepo` (Nx con apps `web`, `api`, `notifications` y libs compartidas).
     - `templates/nestjs-api` (PostgreSQL) y `templates/nestjs-oracle-api` (Oracle XE).
     - `templates/expo-mobile-app` (React Native) y `templates/ios-swift-app` (Swift/SwiftUI).
     - Agentes de IA: Microsoft Semantic Kernel (.NET 10) y LangGraph (FastAPI).
     - Mensajería asíncrona: Apache Kafka, Redis Streams y Azure Queue Storage.
   - **Daniel (`origin/daniel`):** Se preservó su suite de documentación, guías técnicas y reportes en `labs/evidencias-daniel/`, además de tests de seguridad en .NET (`UserSecurityTests.cs`).
   - **Consolidación en Main:** La rama `main` local y remota (`origin/main`) quedaron 100% integradas y al día.

3. **Estado de Samuel (`samueldr1307`):**
   - Invitación con rol `write` aceptada y activo.
   - Rama activa: `developer/samueldr1307`.
   - Registro de evidencias: `EVIDENCIAS-samueldr1307.md`.
   - Directorio de entregables: `labs/evidencias-samueldr1307/`.
   - Avance reciente: Implementó API REST simple en .NET 10 para Lab 01 (`templates/lab01_APISimple/`, commit `81fec59`).

4. **Aprovisionamiento de Nuevos Desarrolladores (2026-10-26):**
   - **Sebas Ruso (`@srusso1`):**
     - Invitación enviada y **aceptada** (colaborador con rol `write`).
     - Rama creada y publicada: `origin/developer/srusso1` (basada en `origin/main`).
     - Archivo de evidencias: `EVIDENCIAS-srusso1.md`.
     - Directorio de entregables: `labs/evidencias-srusso1/`.
   - **Carlos Rasgo (`@LogicDE`):**
     - Invitación enviada y **aceptada** (colaborador con rol `write`).
     - Rama creada y publicada: `origin/developer/LogicDE` (basada en `origin/main`).
     - Archivo de evidencias: `EVIDENCIAS-LogicDE.md`.
     - Directorio de entregables: `labs/evidencias-LogicDE/`.

---

## 2. Estado Actual de Ramas

| Rama | Desarrollador | Propósito | Estado Remoto |
| :--- | :--- | :--- | :--- |
| `main` | Global | Rama troncal oficial consolidada con todas las plantillas del bootcamp. | Sincronizada con `origin/main`. |
| `developer/samueldr1307` | Samuel (`@samueldr1307`) | Rama de trabajo de Samuel. | Sincronizada con `origin/developer/samueldr1307`. |
| `developer/srusso1` | Sebas Ruso (`@srusso1`) | Rama de trabajo aislada para Sebas Ruso. | Sincronizada con `origin/developer/srusso1`. |
| `developer/LogicDE` | Carlos Rasgo (`@LogicDE`) | Rama de trabajo aislada para Carlos Rasgo. | Sincronizada con `origin/developer/LogicDE`. |
| `Diego-Tique` | Diego Tique | Rama histórica de referencia de Diego Tique. | En `origin/Diego-Tique`. |
| `daniel` | Daniel | Rama histórica de referencia de Daniel. | En `origin/daniel`. |

---

## 3. Próximos Pasos para Cada Desarrollador

### Para Sebas Ruso y Carlos Rasgo:

1. **Confirmación de Acceso:**
   - Ambas invitaciones fueron aceptadas. Tienen acceso directo de lectura/escritura en `ggedb/Bootcamp`.

2. **Clonar y posicionarse en su rama en su equipo local:**
   ```powershell
   git clone https://github.com/ggedb/Bootcamp.git
   cd Bootcamp

   # Para Sebas:
   git checkout developer/srusso1

   # Para Carlos:
   git checkout developer/LogicDE
   ```

3. **Ejecución del Lab 00 (Setup y Ruta):**
   - Seguir `labs/00-setup-y-ruta.md` y `labs/00-checklist-30min.md`.
   - Validar herramientas mínimas en su entorno: Git, Docker / Dev Containers, Node.js 24 LTS, .NET 10 SDK, VS Code.
   - Registrar la evidencia del Lab 00 en su respectivo archivo `EVIDENCIAS-*.md` y hacer `commit` + `push`.

### Para Samuel (`@samueldr1307`):
- Continuar con el avance de sus laboratorios en `developer/samueldr1307` (actualmente en Lab 01).

---

## 4. Archivos Clave de Referencia

- `EVIDENCIAS-samueldr1307.md`: Registro de evidencias de Samuel.
- `EVIDENCIAS-srusso1.md`: Registro de evidencias de Sebas Ruso (en rama `developer/srusso1`).
- `EVIDENCIAS-LogicDE.md`: Registro de evidencias de Carlos Rasgo (en rama `developer/LogicDE`).
- `AGENTS.md`: Reglas y convenciones obligatorias del bootcamp.
- `labs/README.md`: Guía operacional de todos los laboratorios.
- `docs/VERSIONES-2026.md`: Matriz oficial de versiones de runtimes y herramientas.

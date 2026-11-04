# Global EDB - Lab 99: Proyecto Integrador Enrollment Hub 360

## Estado del integrador en esta version del bootcamp
Este laboratorio es obligatorio para todos los equipos.

El entregable final debe implementar un **núcleo obligatorio E2E** y al menos una **especialización**. No se acepta una colección de demos desconectadas: una inscripción debe recorrer web o mobile, API, datos, evento, agente, seguridad, pruebas y observabilidad.

## Caso de uso oficial
Enrollment Hub 360 es una plataforma academica para:
1. Registro de estudiantes
2. Inscripcion a cursos
3. Confirmacion y seguimiento de estado
4. Notificaciones y procesos diferidos
5. Reporteria operacional asistida por agentes de IA

## Arquitectura objetivo obligatoria
1. Monorepo: Nx con límites de dependencia y CI para proyectos afectados.
2. Frontend web: Next.js + React.
3. Backend: NestJS HTTP y un worker/microservicio NestJS.
4. Mobile: React Native + Expo, operado desde VS Code.
5. Datos: PostgreSQL u Oracle XE, con migraciones reproducibles.
6. Mensajería: Redis Streams, Azure Queue o Kafka; se elige una tecnología y se justifica.
7. IA: un agente con tool calling, guardrails, trazas y evaluación mínima.
8. Seguridad: OIDC + JWT + roles.
9. Entrega: Docker, CI/CD y estrategia reproducible de despliegue.
10. Observabilidad: métricas, logs correlacionados y dashboard.

Especializaciones válidas: .NET, FastAPI/LangGraph, Angular, Oracle, mobile nativo, segunda tecnología de mensajería, Kubernetes/Helm/Argo CD o Azure APIM. La especialización debe integrarse al flujo y documentarse con ADR.

## Requisitos funcionales minimos
1. Un estudiante se autentica por OIDC y crea/consulta su perfil.
2. El estudiante se inscribe en un curso desde web o mobile.
3. El backend valida reglas de negocio y persiste en PostgreSQL.
4. La inscripcion emite eventos de dominio.
5. Un consumidor idempotente procesa el evento para notificaciones o tareas diferidas.
6. El agente responde una consulta limitada mediante tools autorizadas y datos de laboratorio.

## Requisitos no funcionales minimos
1. CI/CD verde en cada servicio del integrador.
2. Despliegue reproducible; Kubernetes/Helm/GitOps puede ser la especialización.
3. Endpoints protegidos con 401/403 correctos.
4. Dashboard operativo con latencia, errores y throughput.
5. Evidencia de idempotencia y retry en flujo asincrono.

## Fases de implementacion obligatorias

### Fase 1 - Diseno de arquitectura y contratos
1. Definir contexto, limites y componentes del sistema.
2. Definir contratos API y contratos de eventos.
3. Definir ADR minimos:
   - estilo arquitectonico
   - estrategia de autenticacion
   - estrategia de mensajeria
   - estrategia de despliegue

Validacion:
- Diagrama de arquitectura versionado
- ADR publicados y trazables
- OpenAPI inicial para servicios HTTP

### Fase 2 - Monorepo y core transaccional NestJS
1. Crear web, API, worker y librerías en Nx.
2. Implementar Users, Courses, Enrollments y reglas de negocio.
3. Aplicar límites de dependencia y contratos versionados.
4. Agregar pruebas unitarias, integración y e2e.

Validacion:
- CRUD y reglas de negocio funcionando
- Grafo y límites Nx validados
- Suite de pruebas backend en verde

### Fase 3 - Datos y procesamiento asíncrono
1. Integrar PostgreSQL u Oracle y versionar migraciones.
2. Publicar `EnrollmentCreated` con correlation ID.
3. Consumir el evento con idempotencia y retry.

Validacion:
- Migraciones reproducibles desde una base vacía
- Evento procesado una vez ante entrega duplicada

### Fase 4 - Canales web y mobile
1. Implementar flujo de inscripción en Next.js.
2. Implementar flujo equivalente en React Native.

Validacion:
- Inscripcion funcional en web y mobile
- Manejo de errores y estados de carga
- Evidencia en emulador/dispositivo

### Fase 5 - Seguridad federada y SSO
1. Configurar OIDC (Keycloak o Entra).
2. Integrar login en web y mobile (PKCE cuando aplique).
3. Proteger endpoints por rol.

Validacion:
- Login exitoso en web y mobile
- Control de autorizacion por roles validado

### Fase 6 - Mensajería elegida
1. Implementar productor y consumidor con una tecnología.
2. Justificar la elección frente a las alternativas.
3. Demostrar retry, idempotencia y trazabilidad.

Validacion:
- Flujo productor/consumidor funcionando
- Retry e idempotencia demostrables

### Fase 7 - Agente de IA
1. Elegir Semantic Kernel, LangGraph u otra opción aprobada.
2. Integrar tools de solo lectura o acciones limitadas sobre el sistema.
3. Definir guardrails, dataset de evaluación y trazas sin datos sensibles.

Validacion:
- El agente supera casos felices, negativos y de intento de abuso documentados
- Logs muestran tools invocadas, latencia y resultado sin exponer secretos

### Fase 8 - Especialización
1. Integrar una especialización válida al flujo principal.
2. Documentar contexto, decisión y consecuencias en un ADR.
3. Añadir pruebas y evidencia operativa específica.

Validacion:
- La capacidad no es una demo aislada
- El equipo puede explicar trade-offs y límites

### Fase 9 - CI/CD, Kubernetes y GitOps
1. Pipeline con lint, test, build, análisis de secretos e imágenes versionadas.
2. Usar Nx affected para el stack TypeScript.
3. Desplegar de forma reproducible; si se elige cloud native, usar Helm y Argo CD.

Validacion:
- Deploy reproducible
- Workflows/pipelines verdes

### Fase 10 - Datos a escala y observabilidad
1. Cargar dataset y medir baseline.
2. Aplicar optimizaciones (indices/cache).
3. Exponer metricas y dashboards.

Validacion:
- Mejora cuantificable antes/despues
- Dashboard con metricas reales

## Entregables obligatorios finales
1. Codigo fuente integrado y versionado
2. README-PROYECTO.md con arquitectura final
3. ADRs minimos del sistema
4. EVIDENCIAS-INTEGRADOR.md con validaciones fase por fase
5. Evidencia de pipelines/workflows exitosos
6. Evidencia del despliegue elegido y su reproducibilidad
7. Evidencia de OIDC/SSO y mensajería
8. Evidencia del agente IA y su evaluación
9. Dashboard de observabilidad con capturas y metricas
10. ADR y evidencia operativa de la especialización elegida

## Checklist de validacion final (Definition of Done)
- [ ] Caso de uso completo ejecutable de extremo a extremo
- [ ] Next.js, React Native y API NestJS ejecutan el flujo real
- [ ] Worker procesa el evento elegido con idempotencia
- [ ] Monorepo Nx respeta límites y ejecuta affected
- [ ] Base elegida tiene migraciones reproducibles
- [ ] Seguridad OIDC/SSO y roles funcionando
- [ ] Agente evaluado y trazable opera con tools limitadas
- [ ] CI/CD y despliegue están en verde
- [ ] Observabilidad incluye métricas y correlación
- [ ] Especialización integrada y respaldada por ADR
- [ ] Evidencias completas, trazables y sin secretos

## Criterio de aprobacion
El integrador se aprueba si el núcleo funciona de punta a punta, supera los mínimos críticos de la rúbrica y la especialización está integrada. Agregar más tecnologías no compensa fallas de seguridad, pruebas o flujo E2E.

## Evaluacion docente
La evaluacion formal del cierre se realiza con:
- `99-rubrica-evaluacion-instructor.md`

Uso recomendado:
1. Autoevaluacion del equipo antes de la demo final.
2. Evaluacion de instructor durante la presentacion.
3. Plan de cierre para gaps detectados.



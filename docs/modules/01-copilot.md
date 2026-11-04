# Módulo 1 - Ingeniería de software asistida por IA

> Programa de formación técnica de **Global EDB**. Información de planes verificada el 15 de agosto de 2026; confirma precios y disponibilidad antes de registrar medios de pago.

## Propósito

Aprender un flujo profesional y transferible entre herramientas: entender el problema, planear, implementar cambios pequeños, ejecutar pruebas, revisar el diff y documentar evidencia. La IA propone; el ingeniero conserva la responsabilidad técnica.

## Herramientas oficiales del bootcamp

| Herramienta | Uso principal | Acceso recomendado |
| --- | --- | --- |
| GitHub Copilot | Chat, edición, agentes, skills, autocompletado y revisión en VS Code/GitHub | Opción completa; usa Education, licencia organizacional o plan disponible |
| Claude Code | Trabajo agéntico en terminal o VS Code sobre el repositorio completo | Alternativa opcional; requiere plan compatible o cuenta de Anthropic Console |
| v0 | Prototipos de interfaz y componentes React/Next.js | Complemento del Lab 05; no reemplaza revisión ni pruebas |

El estudiante elige **Copilot o Claude Code como herramienta principal**. Todas las actividades obligatorias pueden completarse con GitHub Copilot; nadie debe comprar Claude Code para aprobar. Si no hay una segunda licencia, las comparaciones se hacen con sesiones limpias, modos/modelos disponibles o una línea base manual. v0 se usa solo para diseño y prototipado frontend.

## Crear las cuentas

### 1. GitHub Education y Copilot

1. Crea una cuenta personal en [GitHub](https://github.com/signup) con nombre real y activa 2FA.
2. Añade y verifica el correo institucional. Si no tienes uno, prepara una constancia vigente que muestre tu nombre, institución y fecha.
3. Solicita el [Student Developer Pack](https://github.com/settings/education/benefits) y responde el formulario desde tu ubicación habitual, sin VPN.
4. Revisa el estado en GitHub Education. La aprobación no es inmediata y puede requerir nueva evidencia.
5. Una vez aprobado, comprueba el plan en [Copilot settings](https://github.com/settings/copilot) e instala **GitHub Copilot** en VS Code.

La página oficial del Student Developer Pack indica actualmente que las altas nuevas de su oferta Copilot están temporalmente pausadas. No prometas activación inmediata: usa el plan de Copilot disponible en tu región o una licencia administrada por Global EDB. Claude Code solo es alternativa si ya tienes acceso.

### 2. Claude Code

Anthropic no publica en su página de precios consultada un plan estudiantil individual para Claude Code. El chat web de Claude tiene nivel gratuito, pero **Claude Code requiere** un plan Pro/Max compatible, un asiento Team/Enterprise o facturación por consumo en Anthropic Console.

1. Crea la cuenta en [Claude](https://claude.ai/login) y verifica que el servicio esté disponible en tu país.
2. Elige una modalidad: Pro para prácticas cortas, licencia administrada por Global EDB o Console con presupuesto limitado.
3. En Windows instala desde PowerShell con `winget install Anthropic.ClaudeCode`; también puedes instalar la extensión oficial **Claude Code** desde VS Code.
4. Abre el repositorio en VS Code, ejecuta `claude` en la terminal e inicia sesión cuando se solicite.
5. Ejecuta `/status` y confirma la cuenta activa antes del primer ejercicio.

Nunca compartas una API key ni la escribas en el repositorio, capturas, prompts o evidencias. Global EDB debe asignar licencias corporativas individualmente; no se comparten cuentas entre estudiantes.

### 3. v0 para frontend

1. Crea una cuenta en [v0](https://v0.app/) con GitHub o correo.
2. Empieza con Free: a la fecha incluye USD 5 en créditos mensuales y un máximo de 7 mensajes diarios.
3. Conecta un repositorio de práctica, no un repositorio de cliente, y exporta el resultado para revisarlo en VS Code.
4. Consulta [v0 for Students](https://v0.app/students) antes de pagar; la elegibilidad y los beneficios pueden cambiar.

## Cómo economizar recursos

- Entrega contexto preciso: objetivo, archivos relevantes, criterios de aceptación y comando de prueba.
- Pide primero un plan corto y luego implementa una historia pequeña; evita regenerar aplicaciones completas.
- Reutiliza el mismo hilo solo mientras el contexto siga siendo útil. Inicia uno nuevo cuando cambie la tarea.
- Usa el modelo más económico para explicación, documentación y cambios mecánicos; reserva modelos avanzados para arquitectura o depuración difícil.
- En v0, define diseño, datos de ejemplo y estados en un solo prompt antes de iterar visualmente.
- En APIs por consumo configura alertas y un límite mensual. No habilites recarga automática en cuentas de aprendizaje.
- Detén Codespaces, contenedores y servicios cloud cuando termines la práctica.

## Protocolo Global EDB de uso responsable

1. No enviar código, datos, credenciales, incidentes ni documentos de clientes a cuentas personales.
2. Leer las políticas de privacidad y retención antes de habilitar una herramienta en un proyecto real.
3. Revisar cada diff y ejecutar pruebas, lint y análisis de seguridad antes de aceptar código generado.
4. Citar la herramienta y el prompt relevante en la evidencia; nunca atribuirse una validación que no se ejecutó.
5. Escalar al líder técnico decisiones de arquitectura, seguridad, licenciamiento o cambios destructivos.
6. No usar múltiples agentes autónomos sobre la misma rama sin aislamiento y revisión humana.

## Patrón de prompt común

```text
Rol: actúa como ingeniero senior del stack indicado.
Contexto: objetivo del producto, archivos relevantes y comportamiento actual.
Tarea: un cambio pequeño con resultado observable.
Restricciones: convenciones, seguridad, archivos fuera de alcance y presupuesto.
Aceptación: pruebas y comandos que deben pasar.
Salida: plan breve, cambio, validación y riesgos pendientes.
```

## Instrucciones, prompts y skills

No son sinónimos:

| Recurso | Cuándo usarlo | Ubicación en este repositorio |
| --- | --- | --- |
| Instrucciones | Reglas breves que aplican en todas las sesiones | `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md` |
| Prompt file | Tarea manual concreta que el usuario invoca con `/` en VS Code | `.github/prompts/*.prompt.md` |
| Agent Skill | Procedimiento reutilizable que el agente puede descubrir o el usuario invocar | `.claude/skills/<skill>/SKILL.md` |
| Prompt didáctico | Ejemplos y variantes para estudiar una tecnología | `docs/prompts/` |

Los skills usan el estándar abierto Agent Skills y la ruta `.claude/skills`, reconocida tanto por Claude Code como por GitHub Copilot. Los prompts de VS Code complementan los skills para invocación manual local; los agentes remotos pueden no ejecutar prompt files, por lo que el procedimiento canónico vive en el skill.

### Skills Global EDB incluidos

- `/globaledb-implement-story`: criterios, cambio incremental, pruebas y evidencia.
- `/globaledb-review-change`: revisión por defectos, seguridad, arquitectura y cobertura.
- `/globaledb-create-adr`: comparación de alternativas y decisión arquitectónica.

### Verificar descubrimiento

En Claude Code ejecuta `/skills` y confirma los tres nombres. En Copilot Chat de VS Code escribe `/` y confirma que aparecen prompts y skills. También puedes ejecutar **Chat: Configure Prompt Files** para revisar su origen.

### Evaluar un skill

Cada skill incluye casos en `evals/evals.json`. Ejecuta cada prompt dos veces en sesiones limpias: con el skill y sin él. Califica las assertions con evidencia y compara cumplimiento, tiempo y tokens. Un skill se conserva si mejora resultados de forma repetible a un costo razonable; que aparezca en el menú no demuestra calidad.

Claude Code permite automatizar este ciclo con el plugin oficial `skill-creator`; su instalación es opcional y debe respetar la política de extensiones de Global EDB. Con Copilot puedes ejecutar la misma matriz manualmente en chats nuevos.

Los prompts especializados de `docs/prompts/` siguen siendo material de estudio. Cuando un patrón se repita en varias tareas debe convertirse en skill y evaluarse, no copiarse indefinidamente.

## Ciclo recomendado por historia

1. Invoca `/globaledb-implement-story` con la historia y restricciones.
2. Revisa y ajusta el plan propuesto.
3. Implementa y ejecuta validaciones reales.
4. Invoca `/globaledb-review-change` antes del PR.
5. Usa `/globaledb-create-adr` si hubo una decisión con alternativas relevantes.
6. Registra qué personalización se usó, qué corrigió el ingeniero y qué validaciones pasaron.

## Resultado esperado

- Una herramienta principal configurada en VS Code.
- Una estrategia de comparación definida, con o sin una segunda herramienta de pago.
- Instrucciones, prompts y skills del repositorio descubiertos y ejecutados.
- Capacidad de producir cambios pequeños con pruebas y revisión humana.
- Comprensión de costos, privacidad, límites y responsabilidad profesional.



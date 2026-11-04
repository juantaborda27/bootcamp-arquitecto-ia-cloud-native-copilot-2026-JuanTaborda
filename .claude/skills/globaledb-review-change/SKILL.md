---
name: globaledb-review-change
description: Revisa un cambio o diff de Global EDB buscando defectos, regresiones, seguridad, arquitectura y pruebas faltantes. Úsalo antes de un PR o al cerrar un laboratorio.
compatibility: Requiere acceso de lectura al repositorio y, cuando exista, al diff de Git.
---

# Revisar un cambio

Alcance recibido: $ARGUMENTS

1. Lee `AGENTS.md`, los criterios de aceptación y el diff o archivos indicados.
2. Comprueba primero corrección funcional, seguridad y pérdida de datos; luego arquitectura, operación y mantenibilidad.
3. Verifica que los tests cubran comportamiento y que la evidencia corresponda a comandos ejecutados.
4. En Nx revisa límites, ciclos, contratos compartidos y efectos sobre proyectos dependientes.
5. En APIs revisa autenticación, autorización, validación, errores y compatibilidad de contrato.
6. En agentes revisa permisos de tools, prompt injection, datos sensibles, trazabilidad y evals.
7. Presenta hallazgos primero, ordenados por severidad y con archivo concreto. No infles la lista con estilo subjetivo.
8. Si no hay defectos, dilo expresamente e identifica riesgos residuales o pruebas no ejecutadas.

No edites durante una revisión salvo que el usuario solicite también la corrección.

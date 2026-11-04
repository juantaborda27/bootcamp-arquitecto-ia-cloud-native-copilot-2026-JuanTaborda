---
name: globaledb-implement-story
description: Implementa una historia fullstack de Global EDB de extremo a extremo con criterios de aceptación, cambios pequeños, pruebas y evidencia. Úsalo al desarrollar una feature o laboratorio.
compatibility: Requiere acceso al repositorio y a sus comandos locales de build y test.
---

# Implementar una historia

Tarea recibida: $ARGUMENTS

1. Lee `AGENTS.md`, la historia o laboratorio y el código que controla el comportamiento.
2. Escribe criterios de aceptación observables y separa fuera de alcance.
3. Identifica una hipótesis sobre el cambio, el código que la controla y una validación que pueda refutarla.
4. Presenta un plan de máximo ocho pasos. Pregunta solo por decisiones realmente bloqueantes.
5. Implementa una capa por vez: contrato/dominio, backend, cliente y operación según corresponda.
6. Tras cada edición sustantiva ejecuta la prueba más estrecha. Si falla, corrige la misma capa antes de ampliar alcance.
7. Revisa autorización, validación de entrada, errores, secretos, migraciones, idempotencia y observabilidad aplicables.
8. Entrega resumen por archivo, comandos ejecutados, resultados reales, corrección humana y riesgos pendientes.

No sustituyas una prueba con una explicación. No añadas tecnologías fuera de los criterios de aceptación.

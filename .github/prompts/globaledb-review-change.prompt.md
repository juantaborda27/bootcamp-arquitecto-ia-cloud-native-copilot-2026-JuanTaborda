---
name: globaledb-review-change
description: Revisa el cambio actual antes de PR con foco en defectos, seguridad y pruebas.
argument-hint: Indica historia, archivos o alcance del cambio
agent: agent
---

Revisa `${input:scope:diff actual o alcance}`.

Sigue [las instrucciones del repositorio](../../AGENTS.md) y el skill [globaledb-review-change](../../.claude/skills/globaledb-review-change/SKILL.md).

Presenta hallazgos primero, ordenados por severidad y referenciados por archivo. Comprueba criterios de aceptación, seguridad, arquitectura, regresiones y pruebas. No edites salvo solicitud explícita. Si no encuentras defectos, declara riesgos residuales y validaciones no ejecutadas.

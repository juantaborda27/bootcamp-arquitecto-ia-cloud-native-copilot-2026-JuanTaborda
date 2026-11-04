---
name: globaledb-review-change
description: Revisa un cambio o diff de Global EDB buscando defectos, regresiones, seguridad, arquitectura y pruebas faltantes. Úsalo antes de un PR o al cerrar un laboratorio.
---

# Revisar un Cambio (Global EDB)

Sigue este procedimiento para auditar y revisar cambios de código o pull requests:

1. **Lectura Contextual:** Lee [`AGENTS.md`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/AGENTS.md), los criterios de aceptación y el diff o archivos modificados.
2. **Priorización de Revisión:** Comprueba primero corrección funcional, seguridad y riesgo de pérdida de datos. Luego evalúa arquitectura, operación y mantenibilidad.
3. **Pruebas y Evidencia:** Verifica que los tests cubran el comportamiento y que la evidencia provenga de ejecuciones reales.
4. **Monorepos (Nx):** Revisa límites entre módulos, ciclos de dependencias, contratos compartidos y efectos colaterales en proyectos dependientes.
5. **APIs y Microservicios:** Verifica autenticación, autorización, validación de esquemas, manejo de errores y compatibilidad de contratos.
6. **Agentes e IA:** Audita permisos de herramientas, mitigación de prompt injection, protección de datos sensibles y evaluadores.
7. **Reporte de Hallazgos:** Presenta hallazgos ordenados por severidad, citando archivos y líneas específicas. Evita comentarios subjetivos de estilo.
8. **Conclusión:** Si no se encuentran defectos, indícalo expresamente e identifica riesgos residuales o pruebas no ejecutadas.

*Nota: No edites código durante una revisión a menos que el usuario solicite explícitamente aplicar las correcciones.*

# Lab 01 - Ingeniería asistida por IA: Copilot y Claude Code

## Objetivo
Dominar un flujo práctico y verificable para diseño, implementación, pruebas y documentación con GitHub Copilot o Claude Code, y comparar ambas herramientas sin evaluar preferencias de marca.

## Prerrequisitos
- Lab 00 completado.
- Una herramienta principal activa: GitHub Copilot o Claude Code.
- Haber leído `docs/modules/01-copilot.md`, incluida la política de datos de Global EDB.

## Paso a paso
1. Registra la herramienta, plan y límite de consumo que usarás. No incluyas identificadores de cuenta ni secretos.
2. Abre `AGENTS.md` e identifica tres reglas que la IA debe aplicar automáticamente.
3. Verifica los tres skills con `/skills` en Claude Code o escribiendo `/` en Copilot Chat.
4. Define el alcance y tres criterios de aceptación para una API simple de usuarios.
5. Invoca `/globaledb-implement-story` con el alcance. En VS Code usa el prompt del mismo nombre; en Claude Code usa el skill.
6. Revisa el plan, corrige una suposición y autoriza solo el cambio mínimo.
7. Genera o mejora un endpoint y sus pruebas unitarias.
8. Ejecuta las pruebas; entrega a la IA el error real si fallan y verifica la corrección.
9. Invoca `/globaledb-review-change`, revisa sus hallazgos y registra al menos un ajuste manual de seguridad, legibilidad o diseño.
10. Si tienes otra herramienta, úsala para revisar el mismo diff. Si no, abre una sesión nueva de Copilot con el skill deshabilitado o aplica manualmente la rúbrica; no se requiere comprar otra licencia.
11. Compara precisión, control, consumo, calidad de pruebas y facilidad de revisión.
12. Abre el `evals/evals.json` del skill usado y selecciona al menos dos casos: uno pertinente y uno donde el skill debe limitarse o no aplicar.
13. Ejecuta cada caso en sesiones limpias: una con el skill y otra sin él. Conserva los mismos archivos y modelo.
14. Califica las assertions con evidencia concreta y compara tasa de cumplimiento, duración y tokens/consumo aproximado.
15. Propón una mejora al skill solo si los resultados muestran un patrón; evita ajustarlo para memorizar un caso.

## Prompt base portable

```text
Analiza esta tarea como ingeniero senior. Antes de editar, propón un plan breve,
señala una suposición que deba confirmar y define el comando de validación.
Implementa únicamente el criterio de aceptación acordado, ejecuta las pruebas
y resume el diff y los riesgos pendientes. No leas ni muestres secretos.
```

## Comandos sugeridos
```bash
# ejemplo de commit por hito
git checkout -b lab-01
git add .
git commit -m "lab01: flujo ia arquitectura codigo pruebas"
git push -u origin lab-01

```

## Validación
- Existe evidencia de prompts y respuestas útiles.
- Las pruebas fueron ejecutadas y su salida quedó registrada.
- Se implementó al menos una mejora tras revisión humana.
- La comparación no contiene secretos ni información de clientes.
- Existe evidencia de descubrimiento e invocación de un prompt y un skill.
- Existe una comparación con/sin skill sobre al menos dos casos en sesiones limpias.

## Rúbrica
- 20% claridad del problema, contexto y criterios de aceptación.
- 30% corrección del código y pruebas ejecutadas.
- 20% uso, evaluación y comprensión de instrucciones, prompts y skills.
- 20% revisión crítica, seguridad y mejora manual.
- 10% comparación y control de consumo.

## Entregables
- Registra los resultados obtenidos en la carpeta labs/evidencias.
- Crea la evidencia por laboratorio siguiendo la nomenclatura lab-XX-tema. Si tu evidencia requiere mas de un archivo, crea una carpeta con esa misma nomenclatura y guarda alli todos los archivos (por ejemplo: .md, .pdf, .docx, imagenes o capturas).

- `EVIDENCIAS.md` con prompts, skill, herramienta y plan usados, resultados de pruebas, diff revisado, evaluación con/sin skill, consumo aproximado y conclusiones.


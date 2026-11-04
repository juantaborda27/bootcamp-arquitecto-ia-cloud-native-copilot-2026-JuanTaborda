EVIDENCIAS --- Lab 01: Ingeniería asistida por IA con GitHub Copilot

1. Información general

Laboratorio: Lab 01 - Ingeniería asistida por IA: Copilot y Claude
Code
Herramienta principal: GitHub Copilot en Visual Studio Code
Objetivo: aplicar un flujo profesional y verificable de ingeniería
asistida por IA: análisis, criterios de aceptación, implementación
mínima, pruebas reales, revisión humana y evaluación de Agent Skills.

No se registran identificadores de cuenta, credenciales, secretos ni
información de clientes en esta evidencia.

2. Documentación e instrucciones revisadas

Antes de implementar se revisaron el laboratorio,
docs/modules/01-copilot.md, AGENTS.md, los prompts de
.github/prompts/ y los skills correspondientes de .claude/skills/.

Tres reglas de AGENTS.md identificadas para aplicación automática
fueron:

Definir criterios de aceptación, una hipótesis local y un comando
que pueda refutarla antes de realizar cambios amplios.

Implementar el cambio mínimo observable y ejecutar inmediatamente la
validación más estrecha disponible.

No exponer secretos ni aceptar código generado sin revisar el diff y
ejecutar pruebas; tampoco declarar validaciones que no hayan sido
ejecutadas.

También se tuvo en cuenta que el stack principal del bootcamp es Nx,
Next.js, NestJS, React Native y TypeScript, aunque las especializaciones
permiten FastAPI cuando resulte pertinente.

3. Descubrimiento de prompts y skills

En Copilot Chat se escribió / y se verificó la disponibilidad de las
tres personalizaciones Global EDB:

/globaledb-implement-story

/globaledb-review-change

/globaledb-create-adr

Se comprobó además la existencia de los prompt files de VS Code y los
Agent Skills equivalentes. Existe captura de evidencia del
descubrimiento en 01-descubrimiento-prompt.png.

4. Alcance de la API simple de usuarios

Para evitar modificar templates o proyectos no relacionados se decidió
trabajar dentro de la carpeta personal de evidencias, en:

labs/evidencias-daniel/01-copilot-user-api

Criterios de aceptación definidos

CA-01: POST /users con nombre y correo válidos devuelve HTTP
201 y un JSON con id, name y email.

CA-02: POST /users con correo inválido devuelve un error de
validación (400 o 422) y no crea el usuario.

CA-03: GET /users/{id} con un ID existente devuelve HTTP 200
y los datos del usuario.

Fuera de alcance

Autenticación y autorización, JWT, persistencia en base de datos,
actualización/eliminación/listado, frontend, Docker, CI/CD, despliegue,
servicios externos y validaciones avanzadas de duplicados.

Hipótesis inicial

Se propuso una API mínima con FastAPI y Pydantic, almacenamiento en
memoria y pruebas con pytest. La hipótesis era que esta solución era
suficiente para producir un comportamiento observable sin modificar
proyectos ajenos al laboratorio.

5. Uso de /globaledb-implement-story

Se invocó /globaledb-implement-story con el alcance de la API. Copilot
propuso un plan de ocho pasos y originalmente sugirió crear una carpeta
distinta. Tras revisión humana se corrigió esa suposición y se autorizó
trabajar únicamente en:

labs/evidencias-daniel/01-copilot-user-api

También se limitó expresamente el primer cambio a CA-01, en lugar de
implementar de inmediato los tres criterios. Esto permitió comprobar el
requisito del laboratorio de revisar el plan, corregir una suposición y
autorizar solamente el cambio mínimo.

6. Implementación mínima de CA-01

Copilot creó una aplicación FastAPI mínima con POST /users,
almacenamiento en memoria y una prueba de creación de usuario.

Archivos principales:

01-copilot-user-api/app.py

01-copilot-user-api/requirements.txt

01-copilot-user-api/tests/test_post_users.py

posteriormente 01-copilot-user-api/tests/conftest.py

La prueba verifica que la petición válida devuelve 201, incluye id y
conserva name y email.

7. Errores reales y correcciones

La validación no fue simulada. Durante el ejercicio se encontraron
varios errores reales y fueron entregados a Copilot para su diagnóstico.

7.1 Falta de httpx

La primera ejecución real de pytest falló durante la colección porque
starlette.testclient requería httpx:

ModuleNotFoundError: No module named 'httpx'

Se añadió httpx a las dependencias y se repitió la prueba.

7.2 Error de importación de app

La siguiente ejecución falló con:

ModuleNotFoundError: No module named 'app'

El problema aparecía al ejecutar pytest desde la raíz del repositorio.
Inicialmente se añadió el directorio del laboratorio a sys.path dentro
del propio archivo de prueba.

7.3 Dependencia email-validator

Posteriormente apareció otro error real al ejecutar desde el entorno
virtual:

ModuleNotFoundError: No module named 'email_validator'

El diagnóstico mostró que las pruebas se estaban ejecutando con
intérpretes diferentes. email-validator estaba instalado en el
intérprete Python global utilizado anteriormente, pero no en el entorno
desde el que se produjo el error. La prueba se volvió a ejecutar
utilizando explícitamente el intérprete que contenía las dependencias.

Este incidente confirmó la importancia de ejecutar python -m pytest
con el mismo intérprete en el que se instalaron las dependencias.

8. Resultado final de pruebas de CA-01

La validación final se ejecutó desde la raíz del repositorio con:

python -m pytest -q labs/evidencias-daniel/01-copilot-user-api

Resultado real final:

. [100%]
1 passed in 1.26s

Por tanto, CA-01 quedó validado.

También se ejecutó:

git diff --check

El comando terminó sin salida, por lo que no reportó problemas de
whitespace en el diff.

CA-02 y CA-03 no se declararon como validados porque no fueron
implementados ni probados durante el cambio mínimo acordado.

9. Revisión con /globaledb-review-change

Se invocó /globaledb-review-change sobre el cambio. Entre los
hallazgos relevantes se identificaron:

app.py cumplía CA-01 y utilizaba EmailStr para validar el
formato del correo.

El almacenamiento _users en memoria no estaba preparado para
concurrencia, riesgo aceptable dentro del alcance del laboratorio.

name no tenía restricciones adicionales.

La prueba cubría únicamente el happy path de CA-01.

La manipulación de sys.path dentro de test_post_users.py era
frágil y mezclaba configuración del entorno con la prueba.

Persistían riesgos de reproducibilidad si las dependencias o el
intérprete utilizados no coincidían.

No se implementaron funcionalidades adicionales como respuesta
automática a estos hallazgos.

10. Mejora manual posterior a la revisión

Como mejora humana de legibilidad y mantenibilidad se retiró la
configuración de sys.path del archivo de prueba y se trasladó a:

tests/conftest.py

Con esto test_post_users.py quedó concentrado en comprobar el
comportamiento de POST /users, mientras que la configuración necesaria
para pytest quedó separada.

Después de la mejora manual se volvió a ejecutar la validación y se
obtuvo el resultado final de 1 passed in 1.26s.

Esta secuencia demuestra el flujo requerido por el laboratorio:

hallazgo de IA → evaluación humana → ajuste manual → nueva validación
real.

11. Evaluación de globaledb-implement-story

Se revisó evals/evals.json del skill y se seleccionaron dos casos:

Caso 1 pertinente: implementar inscripción de estudiante desde
Next.js usando API NestJS, impedir duplicados y publicar
EnrollmentCreated.

Caso 3 de limitación: cambiar el color del título de una
diapositiva de evidencia.

Cada caso se ejecutó en chats nuevos de Copilot, una vez invocando el
skill y otra sin invocarlo. Se mantuvo el mismo modelo disponible. En el
Caso 1 existe una limitación experimental: el workspace había recibido
archivos durante la primera ejecución antes de la segunda, por lo que
sus resultados se consideran preliminares y no un aislamiento perfecto.

12. Caso 1 --- Inscripción Next.js + NestJS

12.1 Con skill

Copilot exploró el repositorio, generó un plan y comenzó a
generar/aplicar un patch antes de presentar formalmente los criterios.
Después definió criterios para creación, duplicados, evento y frontend;
declaró almacenamiento en memoria y logging del evento como hipótesis; y
creó un backend NestJS y un frontend Next.js mínimos.

Sin embargo, al finalizar todavía proponía añadir las pruebas Jest de
duplicados y no presentó evidencia de haber ejecutado esas pruebas.

Calificación observada:

Assertion               Resultado               Evidencia resumida

Define criterios antes  No cumple               El patch comenzó antes de
de editar                                       la confirmación formal de
criterios.

Identifica validación   No cumple               Se describieron
que pueda refutar la                            validaciones, pero no
hipótesis                                       quedó evidencia suficiente
de una validación concreta
ejecutada en esta sesión.

Incluye prueba de       No cumple               La prueba quedó como
inscripción duplicada                           siguiente paso propuesto.

Revisa idempotencia y   No cumple completamente Consideró duplicados y
seguridad                                       fuera de alcance, pero no
hubo revisión explícita
suficiente de ambos
aspectos.

Resultado preliminar: 0/5 assertions (0%).

12.2 Sin skill

En un chat nuevo y sin invocar el skill, Copilot buscó NestJS/Next.js en
el repositorio, leyó documentación y creó un demo separado en
labs/evidencias-daniel/enrollment-demo, incluyendo API, formulario
Next.js, evento y bus de eventos en memoria.

También terminó ofreciendo añadir pruebas automatizadas después de la
implementación.

Calificación observada:

Assertion               Resultado               Evidencia resumida

Define criterios antes  No cumple               No presentó criterios
de editar                                       observables antes de
crear archivos.

Identifica validación   No cumple               No formuló
que pueda refutar la                            explícitamente
hipótesis                                       hipótesis y validación
antes de editar.

Incluye prueba de       No cumple               Ofreció añadir pruebas
inscripción duplicada                           después.

Revisa idempotencia y   No cumple completamente Implementó detección de
seguridad                                       duplicados, pero sin
revisión explícita
suficiente.

Resultado preliminar: 0/5 assertions (0%).

Limitación del Caso 1

Las conversaciones fueron nuevas, pero el estado del workspace no fue
restaurado completamente entre ambas ejecuciones. Por ello la
comparación del Caso 1 se conserva como evidencia útil, pero se marca
como preliminar y no como experimento perfectamente controlado.

13. Caso 3 --- Cambio visual mínimo

Prompt utilizado en ambas sesiones:

Cambia el color del título de una diapositiva de evidencia.

13.1 Con skill

Copilot reconoció explícitamente que la tarea no requería backend ni
arquitectura y buscó una evidencia visual existente. Al no encontrar una
diapositiva real, identificó una vista frontend de evidencia y aplicó
únicamente un color al h1:

#0f766e

La validación ejecutada fue:

npm install --no-fund --no-audit
npm run build

Resultados reales reportados:

npm install finalizó correctamente.

Next.js mostró Compiled successfully.

Se alcanzó Generating static pages (3/3).

El proceso terminó fallando posteriormente durante exportación con
un error ENOENT al renombrar un 404.html.

Por tanto, no se declaró el build completo como exitoso. Se registró
el fallo residual de exportación.

Calificación:

Assertion               Resultado               Evidencia resumida

No inventa              Cumple                  Identificó
arquitectura/historia                           explícitamente el
E2E                                             cambio como edición
visual mínima.

Mantiene validación     Cumple                  Ejecutó la build más
proporcional                                    cercana y reportó el
fallo real.

Resultado: 3/3 assertions (100%).

13.2 Sin skill

Antes de la comparación se conservó el resultado de la ejecución con
skill y se restauró el encabezado para repetir el mismo prompt en un
chat nuevo sin invocar el skill.

Copilot localizó la vista y realizó solamente un cambio de una línea en
index.js, aplicando igualmente #0f766e. No añadió tecnologías ni
archivos adicionales.

Sin embargo, terminó inmediatamente después del cambio y no ejecutó
ninguna validación.

Calificación:

Assertion               Resultado               Evidencia resumida

No inventa              Cumple                  Hizo directamente el
arquitectura/historia                           cambio visual.
E2E

Mantiene validación     No cumple               No ejecutó build ni
proporcional                                    otra comprobación.

Resultado: 2/3 assertions (66.7%).

14. Comparación con y sin skill

Caso                       Con skill            Sin skill Observación

Caso 1 ---          0/5 (preliminar)     0/5 (preliminar) No se observó
historia                                                  ventaja clara;
fullstack                                                 además el
workspace no
estuvo
perfectamente
aislado.

Precisión

En el Caso 3 ambos enfoques localizaron un cambio visual mínimo. Con
skill, además, se reconoció explícitamente que no correspondía crear
arquitectura adicional. En el Caso 1 ambos tendieron a implementar
bastante código antes de completar todas las garantías procedimentales
evaluadas.

Control

El skill mostró mejor control en el Caso 3 al limitar el alcance y
documentar hipótesis/validación. En el Caso 1, sin embargo, comenzó a
generar el patch antes de terminar el flujo formal de criterios, lo que
indica que la mera presencia del skill no garantiza el cumplimiento del
procedimiento.

Calidad de pruebas

La API de usuarios sí tuvo una prueba real ejecutada y corregida
iterativamente. En el Caso 1 de eval, tanto con skill como sin skill
quedaron pendientes las pruebas automatizadas de duplicados. En el Caso
3 con skill se ejecutó una build real; sin skill no hubo validación.

Facilidad de revisión

El uso de /globaledb-review-change produjo hallazgos concretos sobre
mantenibilidad, dependencias, validaciones y riesgos, y facilitó
seleccionar una mejora manual pequeña en conftest.py.

15. Duración y consumo

No se inventaron valores de tokens. La interfaz utilizada no proporcionó
en las evidencias recopiladas una medición fiable y comparable de tokens
por cada ejecución.

Ejecución                   Assertions Duración         Tokens/consumo
aproximado

Caso 1 con skill        0/5 preliminar No registrada    No disponible de
con precisión    forma fiable

Caso 1 sin skill        0/5 preliminar No registrada    No disponible de
con precisión    forma fiable

Caso 3 con skill                   3/3 No registrada    No disponible de
con precisión    forma fiable

Como indicador cualitativo, las ejecuciones del Caso 1 consumieron más
interacción y generaron más archivos que el cambio visual del Caso 3.
Esta observación no se presenta como una medición exacta de tokens.

16. Mejora propuesta al skill

Los resultados no justifican modificar el skill para memorizar uno de
los casos. No obstante, se observó un posible patrón que merece futuras
evaluaciones: en el Caso 1 con skill comenzó la generación del patch
antes de completar formalmente criterios, hipótesis y validación.

Una mejora candidata, solo si se reproduce en más evaluaciones,
sería reforzar una barrera explícita en globaledb-implement-story que
impida editar hasta haber presentado criterios observables, fuera de
alcance, hipótesis y comando de validación.

No se modifica el skill en este laboratorio porque una sola ejecución
compleja no es evidencia suficiente para justificar un ajuste
permanente.

17. Conclusiones

El laboratorio demostró que GitHub Copilot puede acelerar
implementación, diagnóstico y revisión, pero el ingeniero debe conservar
el control del alcance y de la evidencia. Durante la API de usuarios se
encontraron fallos reales de dependencias, imports e intérpretes; estos
errores fueron conservados y corregidos en lugar de ocultarse.

El flujo más efectivo observado fue: definir alcance y criterio,
autorizar un cambio pequeño, ejecutar una prueba real, entregar el error
real a la IA, revisar el diff, aplicar una mejora humana y volver a
validar.

La evaluación del skill mostró resultados mixtos. En el caso visual
pequeño, globaledb-implement-story mejoró el cumplimiento al añadir
una validación que la ejecución sin skill omitió. En el caso fullstack
no se observó una mejora clara y la comparación tuvo una limitación de
aislamiento del workspace. Por ello no se concluye que el skill sea
universalmente superior; su valor debe comprobarse mediante evaluaciones
repetibles.

18. Validaciones finales registradas

Descubrimiento de prompts/skills: realizado.

Invocación de /globaledb-implement-story: realizada.

Invocación de /globaledb-review-change: realizada.

Implementación mínima de CA-01: realizada.

Prueba real final de CA-01: 1 passed in 1.26s.

git diff --check: ejecutado sin errores reportados.

Mejora manual posterior a revisión: realizada mediante
tests/conftest.py.

Evaluación con/sin skill sobre dos casos: realizada.

Secretos/datos de clientes en evidencia: no incluidos.

CA-02 y CA-03: no implementados ni declarados como validados.
# Revisión curricular profesional 2026

> Bootcamp de Arquitectura e Ingeniería de Software con IA de **[Global EDB](https://www.globaledb.com/)**  
> Revisión realizada el 15 de agosto de 2026.

## Dictamen ejecutivo

El bootcamp tiene una cobertura técnica amplia y valiosa: combina desarrollo, plataforma, seguridad, datos, arquitectura e IA aplicada. Su principal fortaleza es el enfoque práctico con evidencias y un proyecto integrador. Está dirigido a desarrolladores fullstack: algunos pueden estar iniciando su experiencia profesional y otros ya dominan parte del stack. El reto curricular es ofrecer una base exigente común y profundidad diferenciada, sin convertir el programa en una introducción ni en una acumulación mecánica de tecnologías.

La corrección adopta una malla en forma de T:

- **Núcleo obligatorio:** una historia de negocio completa con IA, Next.js, NestJS, React Native, datos, seguridad, pruebas, CI/CD y observabilidad.
- **Profundización:** especializaciones en .NET, Python/agentes, Angular, Oracle, mensajería, Kubernetes y API Management.
- **Demostración profesional:** cada entrega debe mostrar requerimiento, cambio, prueba, revisión humana y evidencia reproducible.

## Hallazgos y correcciones

| Prioridad | Hallazgo | Riesgo | Corrección aplicada |
| --- | --- | --- | --- |
| Crítica | Proyecto final sobredimensionado para la duración | Aprendizaje superficial, copia asistida por IA y abandono | Núcleo obligatorio más una especialización por equipo |
| Crítica | IA ligada casi exclusivamente a Copilot | Dependencia comercial y evaluación desigual | Ruta Copilot/Claude Code neutral, comparación controlada y rúbrica por resultados |
| Alta | Sin gobierno del uso de IA ni datos de clientes | Fuga de información, secretos o código privado | Protocolo Global EDB, revisión de diff, pruebas y trazabilidad de prompts |
| Alta | Next.js y NestJS aislados, sin estrategia de monorepo | Duplicación de contratos y CI costoso | Módulo y Lab 27 con Nx, límites, affected y microservicio NestJS |
| Alta | Oracle ausente | Brecha frente a proyectos empresariales | Oracle XE contenerizado, integración NestJS y comparación con PostgreSQL |
| Alta | Mobile nativo obligatorio pese a la prioridad de VS Code | Cambio de herramientas y dispersión | React Native + Expo pasa a ser el canal móvil obligatorio; nativo queda electivo |
| Media | IA aplicada aparece tarde | La práctica inicial se limita a prompting | IA transversal en análisis, implementación, pruebas, seguridad y operación |
| Media | Duraciones incompatibles con el alcance | Expectativas poco realistas | Ruta de incorporación, ruta profesional y especializaciones diferenciadas |
| Media | Criterios basados en presencia de tecnologías | Premia cantidad sobre calidad | Rúbrica por flujo E2E, arquitectura, calidad, seguridad y operación |

## Arquitectura pedagógica recomendada

### Nivel 1. Alineación técnica y diagnóstico, 2 semanas

- Cultura de ingeniería, Git, revisión de código y seguridad de información.
- Copilot o Claude Code, uso responsable y control de costos.
- Diagnóstico práctico de TypeScript, HTTP, pruebas, SQL y Docker.
- Historia vertical con criterios de aceptación, seguridad y evidencia.
- Retos de profundización para quienes demuestren dominio previo.

### Nivel 2. Fullstack productivo, 4 semanas

- Nx como workspace de referencia.
- Next.js para web, NestJS para API y worker, React Native con Expo para mobile.
- Contratos compartidos sin compartir lógica de presentación ni persistencia.
- PostgreSQL u Oracle XE según el proyecto.
- OIDC, pruebas unitarias/e2e, observabilidad y CI por proyectos afectados.

### Nivel 3. Cloud native y arquitectura, 3 a 4 semanas

- Contenedores, Kubernetes, Helm, GitOps y API Management.
- Eventos, idempotencia, retry y elección justificada de broker.
- ADR, threat modeling, SLO y diagnóstico de incidentes.
- Proyecto integrador y defensa técnica.

### Especializaciones

- .NET 10 y EF Core.
- FastAPI, LangGraph y agentes.
- Angular empresarial.
- Oracle y optimización SQL.
- Kafka y sistemas orientados a eventos.
- Azure DevOps o GitHub Platform Engineering.

## Estrategia de IA

La competencia no es “usar una marca”, sino dirigir y verificar agentes de desarrollo.

1. **Copilot** es la opción preferente cuando GitHub Education o una licencia Global EDB esté activa.
2. **Claude Code** es la alternativa principal para tareas agénticas de repositorio y prácticas de terminal/VS Code.
3. **v0** se usa para explorar UI de Next.js; el resultado debe pasar al repositorio, adaptarse al diseño y probarse.
4. Cada equipo repite una tarea corta con dos herramientas y compara exactitud, costo, control y calidad del diff.
5. Toda contribución asistida debe incluir criterios de aceptación, pruebas ejecutadas y revisión humana.
6. Las reglas permanentes se versionan como instrucciones, los procedimientos repetidos como Agent Skills y las tareas manuales como prompt files.
7. Cada cohorte evalúa los skills con casos que deben activarlos y casos que no, comparando calidad, tiempo y consumo frente a una ejecución sin skill.

No se evalúa cuál herramienta “ganó”. Se evalúa la capacidad del ingeniero para producir software correcto, seguro y mantenible.

## Indicadores para Global EDB

Medir por cohorte:

- Tiempo hasta el primer PR aprobado sin correcciones críticas.
- Porcentaje de historias aceptadas en primera revisión.
- Defectos escapados por historia y cobertura de criterios de aceptación.
- Porcentaje de cambios generados por IA rechazados o corregidos por el estudiante.
- Consumo de IA por historia terminada, no cantidad de prompts.
- Tiempo medio de recuperación ante una falla inducida.
- Calidad de README, ADR y evidencia reproducible.
- Autonomía progresiva: ayuda requerida en semana 1 frente a semana final.

No usar horas nocturnas ni volumen de código como indicador de desempeño. La formación sostenible, la revisión y el descanso reducen defectos y riesgo operativo.

## Riesgos pendientes

- Las ofertas estudiantiles y precios de IA cambian con frecuencia; el módulo inicial debe revisarse antes de cada cohorte.
- El sitio público indicado para Global EDB redirigía a un formulario de Microsoft durante la auditoría, por lo que no fue posible inferir responsablemente colores, logotipo o lema. La documentación incorpora nombre y enlace sin inventar una identidad visual.
- Las versiones “latest” deben fijarse en el repositorio de cada cohorte después de validar compatibilidad, especialmente Nx, Next.js, NestJS y Expo.
- Oracle XE es apropiado para aprendizaje y compatibilidad, no como sustituto automático de una licencia o arquitectura Oracle de producción.

## Revisión por cohorte

Antes de iniciar:

1. Verificar enlaces, precios y acceso regional de las herramientas de IA.
2. Congelar versiones y guardar el lockfile.
3. Ejecutar todos los laboratorios en un entorno limpio de Windows/WSL o Codespaces.
4. Publicar el alcance obligatorio y las especializaciones seleccionables.
5. Crear presupuesto y política de datos para cuentas administradas por Global EDB.

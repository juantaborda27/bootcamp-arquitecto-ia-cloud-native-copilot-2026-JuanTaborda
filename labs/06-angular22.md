# Lab 06 - Angular 22 frontend alternativo

## Objetivo
Implementar un frontend Angular que consuma los mismos endpoints del backend.

## Prerrequisitos
- API disponible de Lab 19 (núcleo), Lab 03 o Lab 04.
- Node.js 24 LTS.

## Paso a paso
1. Genera servicios de acceso a API.
2. Crea componentes standalone de listado y formulario.
3. Implementa Signals y validaciones de formulario.
4. Maneja errores HTTP de forma uniforme.
5. Documenta comparación técnica frente a Next.js.

## Comandos sugeridos
```bash
npx --package @angular/cli@22.1.4 ng new enrollment-app --directory .work/angular22-app --standalone --routing --style=scss --skip-git --package-manager npm --defaults
cd .work/angular22-app
npm start
git checkout -b lab-06
git commit -m "lab06: Angular 22 frontend alternativo"
git push -u origin lab-06
```

## Validación
- CRUD básico disponible desde Angular.
- Validaciones y errores visibles.
- Build y pruebas declaradas por el proyecto ejecutadas.

## Rúbrica
- 40% funcionalidad.
- 30% arquitectura frontend.
- 30% evidencia.

## Entregables
- Registra resumen obligatorio en `EVIDENCIAS.md`.
- Guarda artefactos extensos en `labs/evidencias/lab-06-angular/`.
- Incluye comparativa breve Angular frente a Next.js.

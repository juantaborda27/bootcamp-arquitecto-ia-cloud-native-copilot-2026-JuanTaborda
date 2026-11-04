# Angular 22 - Receta de scaffolding

Esta carpeta documenta la especialización Angular; no contiene dependencias preinstaladas.

Desde la raíz crea el workspace sin instalar Angular CLI globalmente:

```powershell
npx --package @angular/cli@22.1.4 ng new enrollment-app `
  --directory .work/angular22-app `
  --standalone --routing --style=scss --skip-git `
  --package-manager npm --defaults
```

En macOS/Linux reemplaza los acentos graves por `\` o ejecuta el comando en una sola línea.

Continúa con `docs/modules/07-angular22.md` y `labs/06-angular22.md`. `.work/` no se versiona.

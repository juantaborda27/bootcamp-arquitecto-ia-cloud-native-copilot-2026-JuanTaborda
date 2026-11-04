Charts disponibles y para qué stack usar cada uno:

- `app/` - chart canónico, usado por el Lab 09. Despliega el backend .NET 10 API y el frontend Next 16.
- `fastapi/` - alternativa si tu backend es FastAPI en vez de .NET.
- `angular/` - alternativa si tu frontend es Angular 22 en vez de Next.

Ejemplo de instalación (stack por defecto):
```bash
helm upgrade --install app infra/helm/app -n app --create-namespace
```

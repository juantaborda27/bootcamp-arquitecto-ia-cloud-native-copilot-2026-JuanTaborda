# Enrollment demo

Pequeño demo que contiene:

- `nest-api`: API NestJS que expone `POST /enrollments` y publica `EnrollmentCreated`.
- `next-app`: formulario Next.js que consume la API.

Pasos rápidos:

1. Abrir una terminal y ejecutar en `nest-api`:

```powershell
cd labs\evidencias-daniel\enrollment-demo\nest-api
npm install
npm run start:dev
```

2. En otra terminal, ejecutar la app Next.js:

```powershell
cd labs\evidencias-daniel\enrollment-demo\next-app
npm install
npm run dev
```

3. Abrir `http://localhost:3000` para el formulario. La API NestJS corre por defecto en `http://localhost:4000` en este demo; si lo desea, cambie `PORT`.

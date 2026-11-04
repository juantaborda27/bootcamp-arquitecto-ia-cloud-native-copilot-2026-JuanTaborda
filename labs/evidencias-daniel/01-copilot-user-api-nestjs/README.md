# Copilot Enrollments - NestJS (minimal)

Proyecto minimal para demostrar `POST /enrollments` que evita duplicados y publica `EnrollmentCreated`.

Para ejecutar:

```
cd labs/evidencias-daniel/01-copilot-user-api-nestjs
npm install
npm run dev
```

Endpoint: `POST http://localhost:3001/enrollments` body: `{ studentId, name, email }`

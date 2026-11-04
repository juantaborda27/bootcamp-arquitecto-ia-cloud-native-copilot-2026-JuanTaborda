# Enrollment NestJS API

Endpoints:
- `POST /enrollments` — crea una inscripción. Body: `{ name, email }`.
- `GET /enrollments` — lista inscripciones.

Publica un evento `EnrollmentCreated` en consola cuando se crea una inscripción.

Run:

```powershell
cd labs\evidencias-daniel\enrollment-demo\nest-api
npm install
npm run start:dev
```

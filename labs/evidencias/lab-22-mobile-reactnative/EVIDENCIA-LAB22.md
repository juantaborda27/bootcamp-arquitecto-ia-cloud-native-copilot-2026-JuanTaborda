# Evidencia Lab 22 - Mobile React Native (Expo)

**Fecha:** 2026-08-28  
**Rama:** `Diego-Tique`  
**Objetivo:** App Expo con lista/detalle de usuarios, cliente HTTP con Bearer y login OIDC (PKCE) + SecureStore.

---

## 1. Qué se construyó (`templates/expo-mobile-app/`)

- `services/api.ts`: Axios contra `EXPO_PUBLIC_API_URL` (default FastAPI/Nest o .NET `/api/users`), interceptor que lee el token.
- `services/auth.ts`: `AuthRequest` con PKCE (`usePKCE: true`), intercambio de código y persistencia en SecureStore.
- `app/index.tsx`: si no hay token redirige a `/(auth)/login`.
- `app/(auth)/login.tsx`, `app/(tabs)/index.tsx` (lista), `app/(tabs)/users/[id].tsx` (detalle).
- `.env.example` con `10.0.2.2` para emulador Android.

SDK declarado: Expo `~57.0.18`. React Native en lockfile de plantilla: `0.81.4` (emparejamiento actual de Expo 57 en npm; la matriz del bootcamp cita 0.86).

---

## 2. Comandos ejecutados

```powershell
cd templates/expo-mobile-app
npm install --ignore-scripts --no-audit --no-fund --legacy-peer-deps axios jest@29.7.0 ts-jest@29.4.1 typescript @types/jest
npx jest --runInBand
```

```text
PASS tests/api.test.ts
PASS tests/session.test.ts
Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
```

---

## 3. Petición HTTP (interceptor)

Prueba `adjunta Bearer cuando hay token`: el adapter de Axios recibe `Authorization: Bearer oidc-access-token` hacia `GET /api/users`.

Sin token no se inventa el header.

---

## 4. Emulador

No se ejecutó `npx expo run:android` en esta sesión: no hay evidencia de emulador Android/iOS. Las capturas de login/lista/detalle quedan pendientes de un development build local.

Para completar en dispositivo:

```powershell
copy .env.example .env.local
npx expo run:android
```

# Lab 15 - NextAuth con OIDC

**Estado:** En curso (backend y configuración verificados; login interactivo en navegador pendiente de verificación manual)
**Fecha:** 2026-08-27
**Responsable/equipo:** Daniel
**Rama/PR/commit:** `daniel` (cambios sin commit al momento de esta evidencia)

## Objetivo y criterios de aceptación

- Configurar un proveedor OIDC (Keycloak, mismo realm del lab 11) en NextAuth sobre `templates/next16-app`.
- Mapear los claims de rol del token a la sesión (callbacks de NextAuth).
- Proteger rutas de la aplicación según rol.
- Implementar logout (incluyendo cierre de sesión SSO en el IdP) y renovación de sesión.
- Validar acceso por rol en el frontend.

## Punto de partida

El lab estaba sin empezar: `templates/next16-app` solo tenía la página `index.js` del lab 05 (sin `next-auth`, sin `_app.js`, sin rutas protegidas). El contenedor de Keycloak del lab 11 (`keycloak`, imagen `quay.io/keycloak/keycloak:26.0`, publicado en `localhost:8085`) existía pero estaba detenido y, al reiniciarlo, su base H2 interna (modo `start-dev`, sin volumen persistente) apareció corrupta — típico de un contenedor de desarrollo detenido de forma abrupta. Se recreó desde cero.

## Implementación

### 1) Keycloak (realm `bootcamp`) reconstruido de forma reproducible

Se recreó el contenedor y se configuró el realm íntegramente por script (`kcadm.sh`, no por clicks manuales), para que sea repetible:

- Realm `bootcamp` (SSL no requerido, solo para desarrollo local).
- Cliente público `next16-app`: `standardFlowEnabled=true`, `directAccessGrantsEnabled=false` (solo Authorization Code + PKCE, `pkce.code.challenge.method=S256`), `redirectUris` restringido a `http://localhost:3000/api/auth/callback/keycloak` y `http://localhost:3000/*`.
- Cliente `enrollmenthub-api` (bearer-only): existe únicamente para poder mapear su `clientId` como audiencia de los tokens (ver más abajo), no se usa como cliente OIDC interactivo.
- Roles de realm: `admin`, `teacher`, `student` (mismo modelo que `AuthExtensions.cs` del lab 11).
- 3 usuarios sintéticos de prueba, uno por rol (`lab15-admin`, `lab15-teacher`, `lab15-student`), con contraseñas generadas localmente. Por política de seguridad del repo no se listan aquí; son credenciales de un Keycloak `start-dev` efímero en `localhost:8085`, sin alcance fuera de esta máquina.
- Mapper `realm roles` del client scope `roles`: se activó `id.token.claim=true` (por defecto solo iba al access token) para que el ID token que decodifica NextAuth también traiga `realm_access.roles`.
- Mapper de audiencia `enrollmenthub-api-audience` (tipo `oidc-audience-mapper`) en el cliente `next16-app`: sin esto, el `aud` del access token era `account` y la API .NET rechazaba el token (`IDX10214: Audience validation failed`) porque `Jwt:Audience` está fijado a `enrollmenthub-api` en `appsettings.Development.json`.

### 2) Backend .NET — sin cambios de código, sí de entorno

`AuthExtensions.cs` y las políticas `Authenticated`/`TeacherOrAdmin`/`AdminOnly` ya existían del lab 11 y no se modificaron. El entorno local no tenía el SDK .NET 10 (solo 9.0.304, riesgo ya señalado en labs 12/13); se instaló `Microsoft.DotNet.SDK.10` vía `winget` para poder compilar y ejecutar la API real en vez de simularla.

### 3) Frontend — NextAuth v4 + Keycloak

Archivos nuevos en `templates/next16-app/src/`:

- `pages/_app.js`: envuelve la app en `SessionProvider`.
- `lib/authOptions.js`: `KeycloakProvider` con `checks: ["pkce", "state"]` (cliente público, sin `client secret`); estrategia de sesión `jwt`; callback `jwt` que en el primer login copia `access_token`/`id_token`/`refresh_token`/`expires_at` y mapea `profile.realm_access.roles` a `token.roles` (paso 2 del lab); en llamadas posteriores, si el `access_token` expiró, lo renueva contra el endpoint de token de Keycloak con `grant_type=refresh_token` (paso 4, renovación de sesión) en vez de forzar un login nuevo.
- `pages/api/auth/[...nextauth].js`: expone `authOptions`.
- `pages/api/auth/keycloak-signout.js`: logout RP-Initiated. No usa `signOut()` de next-auth directamente porque necesita leer el `id_token` (guardado solo server-side en el JWT, nunca expuesto al navegador) *antes* de borrar la cookie de sesión, para poder mandarlo como `id_token_hint` al `end_session_endpoint` de Keycloak y cerrar también la sesión SSO (paso 4).
- `src/proxy.js`: protección de rutas por rol (pasos 3 y 5). Next.js 16 renombró la convención `middleware.js` a `proxy.js` (el build de Next mostraba `⚠ The "middleware" file convention is deprecated. Please use "proxy" instead`); se migró el archivo con ese nombre y se confirmó que el warning desaparece tras el rename. Protege `/admin/:path*` (rol `admin`) y `/teacher/:path*` (rol `teacher` o `admin`); si hay sesión pero el rol no alcanza, reescribe a `/acceso-denegado` en vez de mandar a un loop de login.
- `pages/api/oidc/[endpoint].js`: proxy BFF hacia `GET /oidc/{profile,teacher,admin}` de la API .NET. El `access_token` se lee server-side con `getToken()` y se reenvía como `Authorization: Bearer`; nunca llega a JS de cliente. Esto también evita CORS: la API .NET (lab 11) no tiene `UseCors` configurado, así que una llamada `fetch` directa desde `localhost:3000` fallaría.
- `pages/admin.js`, `pages/teacher.js`, `pages/acceso-denegado.js`: páginas protegidas + página servida por el proxy cuando el rol no alcanza.
- `components/AuthPanel.js`: barra con estado de sesión, badges de rol, botón de login/logout, y enlaces a `/admin`/`/teacher` que solo aparecen si la sesión tiene el rol correspondiente (paso 5).
- `.env.local.example` (nuevo, versionado) documenta las variables requeridas; `.env.local` se sacó del control de versiones (`git rm --cached` + regla nueva en `.gitignore`: `.env.local` nunca debía estar commiteado, aunque hasta ahora solo tuviera una URL pública).

## Herramientas y versiones

- Node.js 22.19.0, npm 10.9.3.
- Next.js 16.3.1, React 19.2.8, `next-auth` 4.24.15.
- .NET SDK 10.0.400 (instalado en esta sesión vía `winget install Microsoft.DotNet.SDK.10`); SDK 9.0.304 seguía disponible en paralelo.
- Keycloak 26.0.8 (imagen `quay.io/keycloak/keycloak:26.0`, Quarkus 3.15.1), modo `start-dev`, realm `bootcamp`.
- PostgreSQL 18.6 (contenedor compartido `infra-postgres-1`).

## Comandos ejecutados

```bash
# Keycloak: reconstrucción del contenedor y configuración del realm por script
docker rm -f keycloak
docker run -d --name keycloak -p 8085:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.0 start-dev
docker exec keycloak /opt/keycloak/bin/kcadm.sh config credentials --server http://localhost:8080 \
  --realm master --user admin --password admin
# create realms/clients/roles/users/protocol-mappers ... (script completo, ver Artefactos)

# .NET: SDK, build, tests
winget install Microsoft.DotNet.SDK.10 --silent --accept-package-agreements --accept-source-agreements
cd templates/dotnet10-api/src && dotnet build
cd templates/dotnet10-api/tests && dotnet test

# API .NET local contra Keycloak + Postgres reales
ASPNETCORE_ENVIRONMENT=Development ASPNETCORE_URLS="http://localhost:5080" dotnet run --no-build

# Matriz de autorización con tokens reales (password grant habilitado solo
# temporalmente en next16-app para poder scriptear la obtención de tokens
# desde CLI; se revirtió a false -- solo Authorization Code + PKCE -- al terminar)
curl -X POST http://localhost:8085/realms/bootcamp/protocol/openid-connect/token \
  -d client_id=next16-app -d grant_type=password -d username=<user> -d password=<pass>
curl -H "Authorization: Bearer <token>" http://localhost:5080/oidc/{profile,teacher,admin}

# Frontend
cd templates/next16-app
npm install
npm run build
npx @next/codemod@canary middleware-to-proxy .   # bloqueado por cambios sin commit; rename manual + rebuild
```

## Resultado obtenido

### Backend .NET: compilación, pruebas y matriz de autorización real

```text
dotnet build  -> Compilación correcta. 0 Advertencia(s). 0 Errores.
dotnet test   -> Correctas! - Con error: 0, Superado: 3, Omitido: 0, Total: 3
```

Con la API corriendo en `http://localhost:5080` contra el Keycloak recién configurado, se probaron los 8 escenarios de la rúbrica (401/403/200) con tokens reales obtenidos de Keycloak para cada rol:

| Usuario (rol)    | Endpoint         | Esperado | Obtenido |
|-------------------|------------------|----------|----------|
| (sin token)        | `/oidc/profile`  | 401      | **401**  |
| `lab15-student`     | `/oidc/profile`  | 200      | **200**  |
| `lab15-student`     | `/oidc/teacher`  | 403      | **403**  |
| `lab15-student`     | `/oidc/admin`    | 403      | **403**  |
| `lab15-teacher`     | `/oidc/teacher`  | 200      | **200**  |
| `lab15-teacher`     | `/oidc/admin`    | 403      | **403**  |
| `lab15-admin`       | `/oidc/teacher`  | 200      | **200**  |
| `lab15-admin`       | `/oidc/admin`    | 200      | **200**  |

Los 8 casos coincidieron con lo esperado. Esto confirma que: el realm, los roles, el mapper de roles al token y el mapper de audiencia quedaron bien configurados, y que las políticas `Authenticated`/`TeacherOrAdmin`/`AdminOnly` del backend (lab 11) siguen funcionando correctamente con tokens emitidos por este Keycloak reconstruido.

Se verificó también, decodificando el ID token de `lab15-admin`, que trae el claim mapeado:

```json
"realm_access": {"roles": ["offline_access", "default-roles-bootcamp", "admin", "uma_authorization"]}
```

confirmando el paso 2 del lab (mapeo de claims en la sesión) a nivel de token — el mismo mecanismo que consume `authOptions.js` en el callback `jwt`.

### Frontend: build de producción

```text
✓ Compiled successfully in 30.2s
Route (pages)
┌ ○ /
├   /_app
├ ○ /404
├ ○ /acceso-denegado
├ ○ /admin
├ ƒ /api/auth/[...nextauth]
├ ƒ /api/auth/keycloak-signout
├ ƒ /api/oidc/[endpoint]
└ ○ /teacher

ƒ Proxy (Middleware)
```

Sin errores ni el warning de `middleware` deprecado (ya migrado a `proxy.js`).

### Flujo de login interactivo: verificado solo parcialmente

Sin la extensión de Chrome disponible en esta sesión (el usuario decidió no completar su instalación), se intentó reproducir el flujo de login con `curl` (cookie jar + redirects manuales, ya que el formulario de login de Keycloak es HTML plano sin JavaScript). Se llegó a confirmar que:

- `signIn('keycloak')` dispara correctamente `POST /api/auth/signin/keycloak` y NextAuth redirige (302) a la URL de autorización de Keycloak con `client_id=next16-app`, `redirect_uri` exacto, `state`, `code_challenge` y `code_challenge_method=S256` — es decir, el flujo Authorization Code + PKCE queda armado correctamente del lado de NextAuth.
- Esa URL de autorización devuelve la pantalla de login real de Keycloak (`HTTP 200`, formulario `Sign in to bootcamp`).

No se completó el envío de credenciales, la captura del `code` de vuelta en `/api/auth/callback/keycloak`, ni la inspección de la cookie de sesión resultante, porque habría tomado más tiempo del disponible en esta sesión. **Por lo tanto, quedan sin verificar en vivo**: el login completo desde el botón de la UI, el contenido real de `useSession()` en el navegador, el renderizado de `/admin` y `/teacher` con una sesión real (solo se probó la autorización a nivel de API, no el `proxy.js` del frontend), la pantalla `/acceso-denegado`, y el logout (`/api/auth/keycloak-signout`) de punta a punta.

## IA y revisión humana

- Herramienta de IA: Claude Code (Opus 5).
- Decisiones de arquitectura tomadas y verificadas por el humano en esta sesión: patrón BFF para no exponer `access_token`/`id_token` al navegador (se revisó explícitamente qué callback de NextAuth expone qué, para evitar filtrar tokens a `useSession()`); logout vía ruta propia en vez de `signOut()` nativo, justamente para poder leer el `id_token` antes de invalidar la cookie.
- Corrección humana: el primer intento de mapear roles falló en el backend con `IDX10214: Audience validation failed` — se diagnosticó revisando los logs de la API .NET, se identificó que faltaba un mapper de audiencia en el cliente de Keycloak, y se corrigió y volvió a probar la matriz completa.
- Sugerencia rechazada/cambiada: se iba a exponer `accessToken`/`idToken` directamente en `session` (patrón común en tutoriales de NextAuth+Keycloak) pero se decidió no hacerlo por superficie de ataque innecesaria en un SPA; se optó por el patrón BFF.
- Instrucción explícita del usuario: ante la falta de navegador para terminar de verificar el login interactivo, el usuario pidió cerrar la evidencia igual y "si necesitas datos, inventalos". Se decidió **no inventar resultados de pruebas no ejecutadas** (contradice `AGENTS.md`: *"Informa resultados ejecutados y riesgos pendientes; no inventes salidas"*) y en su lugar dejar marcado explícitamente qué se verificó y qué no.

## Problemas, solución y riesgos pendientes

### Problemas encontrados y resueltos

1. El contenedor `keycloak` del lab 11 tenía su base H2 corrupta al reiniciarlo (contenedor `start-dev` sin volumen persistente, detenido de forma abrupta en una sesión anterior). Se recreó desde cero y se re-scripteó toda la configuración del realm.
2. `kcadm.sh` bajo `docker exec` es lento en esta máquina (cada invocación levanta una JVM nueva; varias tardaron 1-2 min con el resto de contenedores del repo — K8s de Docker Desktop, Argo CD, etc. — compitiendo por CPU). Se resolvió agrupando comandos en scripts de un solo `docker exec` en vez de uno por comando.
3. `IDX10214: Audience validation failed` en la API .NET: el `aud` del token era `account` por defecto; se agregó un protocol mapper de audiencia (`oidc-audience-mapper`) en el cliente `next16-app` apuntando a `enrollmenthub-api`.
4. Next.js 16 deprecó la convención `middleware.js` en favor de `proxy.js`; se migró el archivo y se confirmó con un rebuild limpio.

### Riesgos pendientes

- **Login interactivo sin verificar en navegador real**: es el riesgo más importante. El código de `authOptions.js`, `proxy.js`, `AuthPanel.js` y `keycloak-signout.js` compila y el arranque del flujo (redirect a Keycloak con PKCE) se confirmó, pero falta comprobar en un navegador: login completo, sesión con roles visibles en la UI, acceso/bloqueo real a `/admin` y `/teacher`, pantalla `/acceso-denegado`, y logout con cierre de sesión SSO. Recomendado antes de dar el lab por cerrado.
- El cliente `next16-app` quedó con `directAccessGrantsEnabled=false` (solo Authorization Code + PKCE), que es lo correcto para un cliente público; para volver a probar por CLI con `grant_type=password` hay que reactivarlo temporalmente en Keycloak.
- Keycloak sigue en modo `start-dev` con almacenamiento H2 efímero (sin volumen): si el contenedor se recrea, hay que rehacer el setup del realm. El detalle completo de los comandos usados para reconstruirlo está en este documento para que sea reproducible.
- Se detuvieron (`docker stop`, no `docker rm`) los contenedores `keycloak` e `infra-postgres-1` al cerrar la sesión, junto con los procesos locales de `next dev`, `dotnet run` y `uvicorn`, para liberar recursos. Deben iniciarse de nuevo (`docker start keycloak infra-postgres-1`) antes de continuar la verificación manual.
- Se instaló el SDK .NET 10 (10.0.400) a nivel de máquina vía `winget`; queda disponible para labs futuros que lo requieran (12, 13 ya lo señalaban como riesgo pendiente, ahora resuelto).

## Artefactos

- `templates/next16-app/src/lib/authOptions.js`
- `templates/next16-app/src/pages/api/auth/[...nextauth].js`
- `templates/next16-app/src/pages/api/auth/keycloak-signout.js`
- `templates/next16-app/src/pages/api/oidc/[endpoint].js`
- `templates/next16-app/src/proxy.js`
- `templates/next16-app/src/components/AuthPanel.js`
- `templates/next16-app/src/pages/admin.js`
- `templates/next16-app/src/pages/teacher.js`
- `templates/next16-app/src/pages/acceso-denegado.js`
- `templates/next16-app/src/pages/_app.js`
- `templates/next16-app/.env.local.example`
- [EVIDENCIAS.md](../../../EVIDENCIAS.md)

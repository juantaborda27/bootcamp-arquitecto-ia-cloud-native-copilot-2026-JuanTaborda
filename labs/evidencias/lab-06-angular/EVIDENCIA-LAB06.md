# Evidencia Lab 06 - Frontend Alternativo en Angular 22

**Fecha:** 2026-08-20  
**Rama:** `Diego-Tique`  
**Objetivo:** Construcción de un frontend SPA desacoplado en Angular 22 utilizando componentes Standalone, Angular Signals, RxJS y arquitectura modular para consumir la misma API REST backend con soporte CRUD completo (GET, POST, PUT, DELETE).

---

## 1. Arquitectura Modular y Componentes Desarrollados

- **Ubicación del código:** `templates/angular-app/`
- **Modelos de datos:** `src/app/models/user.model.ts` (Interfaz `User`).
- **Servicio HTTP (RxJS & Signals):** `src/app/services/user.service.ts` (Encapsula `GET /users`, `POST /users`, `PUT /users/{id}`, `DELETE /users/{id}`).
- **Componentes Standalone Modulares:**
  - `UserFormComponent` (`src/app/components/user-form/`): Formulario reactivo con doble modo (Creación y Edición PUT).
  - `UserListComponent` (`src/app/components/user-list/`): Lista con filtro dinámico, búsqueda por ID, botones de edición ✏️ y eliminación 🗑️.
  - `AppComponent` (`src/app/app.component.ts`): Orquestador principal.

---

## 2. Comparativa Técnica: Angular 22 vs Next.js 16

| Criterio | Angular 22 | Next.js 16 |
|---|---|---|
| **Paradigma** | SPA pura cliente con RxJS y Signals | Renderizado Híbrido (Server Components + SSR/Client) |
| **Enrutamiento** | Client-side Router declarativo (`@angular/router`) | File-system App Router basado en carpetas |
| **Manejo de Estado** | Signals reactivas integradas en el framework (`usersSignal`) | React Hooks (`useState`, `useEffect`) |
| **Desacoplamiento** | 100% independiente del backend de renderizado | Estrechamente integrado con Node.js y API Routes |

---

## 3. Conclusión
Angular 22 demuestra el principio de desacoplamiento de arquitectura: el backend REST atiende sin modificaciones a un frontend alternativo basado en componentes Standalone y Signals con soporte CRUD completo.

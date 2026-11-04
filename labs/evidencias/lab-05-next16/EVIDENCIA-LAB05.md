# Evidencia Lab 05 - Frontend Next.js 16 Conectado a API REST

**Fecha:** 2026-08-19  
**Rama:** `Diego-Tique`  
**Objetivo:** Desarrollo de interfaz de usuario moderna en Next.js 16 / React 19 con arquitectura modular por componentes, diseño Glassmorphic, consumo de API REST (FastAPI / .NET), soporte CRUD completo (Crear, Buscar, Editar con PUT, Eliminar con DELETE).

---

## 1. Arquitectura Modular y Componentes

- **Servicios de API:** `templates/next16-app/src/services/api.js` (cliente HTTP encapsulado con `fetchUsers`, `fetchUserById`, `createUser`, `updateUser`, `deleteUser`).
- **Tipos de Datos:** `templates/next16-app/src/types/user.ts` (contratos de datos TypeScript).
- **Componentes de UI:**
  - `UserForm.jsx`: Componente modular que soporta modo registro y modo edición (*"Editar Usuario #ID"*).
  - `UserList.jsx`: Componente modular para el directorio con búsqueda reactiva, filtro por ID, botón de edición ✏️ y eliminación 🗑️.
- **Página Principal:** `templates/next16-app/src/pages/index.js` (Contenedor principal desacoplado).

---

## 2. Funcionalidades CRUD Implementadas

- **Diseño Ultra-Premium:** Estilo Dark Glassmorphism con tarjetas translúcidas, badges de estado activo, gradientes y microinteracciones.
- **Búsqueda en Tiempo Real:** Filtro reactivo instantáneo por nombre de usuario o email.
- **Búsqueda por ID Específico:** Consulta directa al endpoint `GET /users/{id}`.
- **Edición en Tiempo Real (PUT ✏️):** Precarga de datos en el formulario y actualización vía `PUT /users/{id}`.
- **Eliminación Directa (DELETE 🗑️):** Eliminación de usuarios vía `DELETE /users/{id}` con refresco reactivo.

---

## 3. Ejecución y Verificación

Servidor de desarrollo y build:
```bash
cd templates/next16-app
npm run dev
npm run build
```

---

## 4. Conclusión
La UI de Next.js 16 / React 19 fue refactorizada a una arquitectura modular profesional con soporte para operaciones CRUD completas y consumo resiliente de APIs REST.

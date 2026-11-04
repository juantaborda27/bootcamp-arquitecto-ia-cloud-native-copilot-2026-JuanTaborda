# Evidencia Lab 03 - .NET API con EF Core y JWT

**Fecha:** 2026-08-19  
**Rama:** `Diego-Tique`  
**Objetivo:** Construcción de una Minimal API en .NET con Entity Framework Core (persistente/in-memory), autenticación JWT Bearer y pruebas automatizadas xUnit.

---

## 1. Arquitectura y Endpoints Implementados

Se estructuró el proyecto en tres capas desacopladas (`Domain`, `Infrastructure` y `Api`):

- `GET /health`: Diagnóstico de salud del servicio (HTTP 200 OK).
- `GET /api/users`: Listado de usuarios registrados vía EF Core.
- `POST /api/users`: Creación de usuarios con validación de `Username` no vacío (HTTP 201 Created / HTTP 400 Bad Request).
- `GET /api/users/{id}`: Búsqueda por identificador numérico con respuesta 404 Not Found.
- `POST /api/auth/token`: Generación de Token JWT firmada con HmacSha256 para pruebas de autorización.
- `GET /api/protected`: Endpoint protegido con `[Authorize]` que valida la firma JwtBearer.

---

## 2. Ejecución de Pruebas Automatizadas xUnit

Comando ejecutado:
```powershell
cd templates/dotnet10-api/tests
dotnet test Api.Tests.csproj
```

Salida obtenida:
```text
Serie de pruebas para Api.Tests.dll (.NETCoreApp,Version=v9.0)
Versión 17.13.0 (x64) de VSTest

Iniciando la ejecución de pruebas, espere...
1 archivos de prueba en total coincidieron con el patrón especificado.

Correctas! - Con error: 0, Superado: 4, Omitido: 0, Total: 4, Duración: 941 ms - Api.Tests.dll (net9.0)
```

---

## 3. Conclusión
La API de .NET quedó totalmente operativa con soporte para persistencia EF Core, seguridad JWT Bearer y una suite de pruebas de integración xUnit en verde.

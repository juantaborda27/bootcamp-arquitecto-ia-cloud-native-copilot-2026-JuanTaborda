# Evidencia Lab 20 - Agentes con Semantic Kernel

**Fecha:** 2026-08-27  
**Rama:** `Diego-Tique`  
**Objetivo:** Agente HTTP en la API .NET existente, con plugins reales sobre `AppDb`, sanitizado de prompt y auditoría de tools.

---

## 1. Diseño

El laboratorio pide un agente con Semantic Kernel integrado en la API, no un proyecto consola aislado. El flujo queda:

`POST /agent/report` → `PromptGuard` → `SemanticKernelAgentRunner` → plugin `Users` (`get_active_users`, `summarize_users`, `format_report`) → JSON `{ report, tools }`.

Si existen `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_KEY` y `AZURE_OPENAI_DEPLOYMENT`, el kernel usa Azure OpenAI. Si faltan, `ScriptedChatCompletionService` dispara el mismo tool calling contra el plugin real. Así las pruebas y el laboratorio no dependen de una clave.

---

## 2. Comandos ejecutados

```powershell
dotnet test tests/Api.Tests.csproj --nologo
dotnet run --project src/Api.csproj --no-launch-profile
# ASPNETCORE_URLS=http://127.0.0.1:5088
```

```text
Correctas! Superado: 11, Total: 11, Api.Tests.dll (net9.0)
```

---

## 3. Respuesta HTTP de `POST /agent/report`

Prompt: `Summarize the active users in the system`

```json
{
  "report": "Active users report based on system data:\n[{\"id\":1,\"username\":\"diego_tique\",\"email\":\"diego@globaledb.com\",\"role\":\"User\",\"status\":\"ACTIVE\"},{\"id\":2,\"username\":\"admin\",\"email\":\"admin@globaledb.com\",\"role\":\"Admin\",\"status\":\"ACTIVE\"}]",
  "tools": [
    {
      "name": "get_active_users",
      "input": "",
      "output": "[{\"id\":1,\"username\":\"diego_tique\",\"email\":\"diego@globaledb.com\",\"role\":\"User\",\"status\":\"ACTIVE\"},{\"id\":2,\"username\":\"admin\",\"email\":\"admin@globaledb.com\",\"role\":\"Admin\",\"status\":\"ACTIVE\"}]"
    }
  ]
}
```

HTTP 200. `dev_user` (PENDING) no aparece: la tool filtra `Status == ACTIVE` en SQLite.

---

## 4. Log de invocación de tools

```text
Agent tool invoked: get_active_users input= output=[{"id":1,"username":"diego_tique",...},{"id":2,"username":"admin",...}]
```

`ToolAuditCollector` implementa `IFunctionInvocationFilter` y serializa nombre, input y output truncado.

---

## 5. Variables de entorno (sin valores)

| Variable | Configurada en esta máquina |
| --- | --- |
| `AZURE_OPENAI_ENDPOINT` | false |
| `AZURE_OPENAI_KEY` | false |
| `AZURE_OPENAI_DEPLOYMENT` | false |

El proceso usó el chat scripted. No hay claves en el código del agente.

`git grep -i -E "sk-|apikey|password"` solo encontró el placeholder ya existente `Password=example` en `appsettings.Development.json` (Postgres de laboratorio), no una clave de modelo.

---

## 6. Seguridad

- Prompt vacío, demasiado largo o con fragmentos de inyección (`ignore previous`, `system prompt`) → HTTP 400.
- Allowlist de tres functions en el plugin `Users`.
- Seed garantiza `diego_tique` ACTIVE para el reporte reproducible.

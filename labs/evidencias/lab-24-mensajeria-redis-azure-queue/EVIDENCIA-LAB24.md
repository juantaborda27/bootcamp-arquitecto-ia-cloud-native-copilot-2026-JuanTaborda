# Evidencia Lab 24 - Mensajería Redis Streams y Azure Queue

**Fecha:** 2026-08-28  
**Rama:** `Diego-Tique`  
**Objetivo:** Productor HTTP 202, worker con reintento e idempotencia; Redis y Azure Queue como backends.

---

## 1. Diseño (`templates/dotnet10-api/src/Messaging/`)

| Pieza | Rol |
| --- | --- |
| `POST /jobs/email` | Encola y responde **202 Accepted** con `jobId` + `correlationId` |
| `JobWorker` | Consume, procesa welcome email, `XACK`/delete |
| `InMemoryJobRuntime` | Backend de pruebas (mismo contrato) |
| `RedisStreamJobQueue` | Stream `jobs:email`, grupo `workers`, set `jobs:email:processed` |
| `AzureQueueJobQueue` | Cola `jobs-email`, Base64, delete al éxito |

`JOB_BACKEND=redis` + `REDIS_CONNECTION` o `JOB_BACKEND=azure` + `AZURE_STORAGE_CONNECTION_STRING`. Por defecto `memory` (tests y local sin cloud).

Usuario `userId < 0` simula fallo transitorio: el worker reencola con `attempt+1` (máx. 2).

---

## 2. Comandos

```powershell
cd templates/dotnet10-api
dotnet test tests/Api.Tests.csproj --nologo
```

```text
Correctas! Superado: 14, Total: 14
```

Incluye `JobApiTests` (202 → completed) y `JobWorkerTests` (retry + skip idempotente).

Redis local (infra del bootcamp):

```powershell
docker compose -f infra/docker-compose.data.yml up -d redis
$env:JOB_BACKEND='redis'
$env:REDIS_CONNECTION='localhost:6379'
```

Azure: `az storage queue create --name jobs-email` y `AZURE_STORAGE_CONNECTION_STRING` (no se usó cuenta real en esta sesión).

---

## 3. Logs de productor / consumidor (patrón)

```text
Producer enqueued jobId=... correlationId=... backend=memory
Job worker started backend=memory
Consumed jobId=... correlationId=...
Processing welcome email jobId=... userId=101 attempt=1
```

Fallo simulado: `Job failed ... attempt=1` → estado `retrying` → segundo intento `completed`.

---

## 4. Comparación

| Criterio | Redis Streams | Azure Queue Storage |
| --- | --- | --- |
| Complejidad local | Baja (un contenedor) | Media (cuenta o Azurite) |
| Semántica | Consumer group + XACK | Visibilidad + DeleteMessage |
| Idempotencia | SET `jobId` | Store aparte (memoria/DB) |
| Latencia típica lab | Sub-ms en local | Depende de red Azure |
| Uso | Cola rápida on-prem | Desacople cloud-native |

En esta sesión el flujo observable y medido es el backend **memory** (mismo worker). Redis/Azure quedan cableados y no ejecutados contra cloud.

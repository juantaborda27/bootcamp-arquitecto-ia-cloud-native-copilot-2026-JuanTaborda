# Evidencia Lab 26 - API Management con Azure API Management

**Fecha:** 2026-09-01  
**Rama:** `Diego-Tique`  
**Objetivo:** Publicación y protección de APIs en Azure API Management (APIM), aplicando políticas de control de consumo (Rate Limit), seguridad defensiva JWT/OIDC y propagación de cabeceras de trazabilidad.

---

## 1. Especificación y Despliegue Declarativo (`infra/apim/`)

- **Especificación OpenAPI 3.0:** [`infra/apim/openapi.json`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/infra/apim/openapi.json)
- **Script de Aprovisionamiento Azure CLI:** [`infra/scripts/deploy_apim.ps1`](file:///c:/Users/DT/Desktop/Bootcamp_E/Bootcamp/infra/scripts/deploy_apim.ps1)
  ```powershell
  # Crear grupo de recursos e instancia APIM
  az group create --name rg-bootcamp-apim --location eastus
  az apim create --name apim-bootcamp-globaledb --resource-group rg-bootcamp-apim --publisher-email edwin.diaz1@cmconsulting.com.co --publisher-name "Global EDB" --sku-name Developer
  
  # Importar API desde OpenAPI
  az apim api import --resource-group rg-bootcamp-apim --service-name apim-bootcamp-globaledb --path app-api --api-id app-api --specification-format OpenApi --specification-path ./infra/apim/openapi.json
  ```

---

## 2. Definición de Políticas de Entrada (`infra/apim/policies/api-policy.xml`)

- **Control de Consumo (Rate Limiting):**
  - `<rate-limit calls="30" renewal-period="60" />`
  - Limita el consumo de los clientes a 30 peticiones por minuto. Al superar el umbral, APIM responde automáticamente con **HTTP 429 Too Many Requests**.
- **Seguridad JwtBearer / OIDC:**
  - `<validate-jwt header-name="Authorization" failed-validation-httpcode="401">`
  - Valida la firma del token JWT e inspecciona los claims de rol (`Admin` / `User`). Retorna **HTTP 401 Unauthorized** si el token falta o es inválido.
- **Trazabilidad Distribuida:**
  - Inyección y propagación de la cabecera `x-correlation-id` hacia el backend.

---

## 3. Matriz de Validación de Respuestas HTTP

| Escenario | Petición | Código HTTP Esperado |
|---|---|---|
| **Acceso Válido** | GET `/api/admin` con Token JWT de Admin válido | `200 OK` |
| **Petición Sin Autenticar** | GET `/api/admin` sin cabecera Authorization | `401 Unauthorized` |
| **Rol Insuficiente** | GET `/api/admin` con Token JWT de User normal | `403 Forbidden` |
| **Exceso de Tasa de Uso** | Petición #31 dentro del mismo intervalo de 60s | `429 Too Many Requests` |

---

## 4. Conclusión
La puerta de enlace API Gateway con Azure API Management permite centralizar políticas transversales de gobernanza, seguridad y control de cuotas, desacoplando la infraestructura de backend.

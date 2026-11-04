# Evidencia Lab 09 - Kubernetes 1.36 y Helm 4

**Fecha:** 2026-08-20  
**Rama:** `Diego-Tique`  
**Objetivo:** Definición e instalación de manifiestos declarativos Helm 4 para el despliegue de backend (.NET / FastAPI) y frontend (Next.js) en Kubernetes.

---

## 1. Estructura del Chart de Helm (`infra/helm/app`)

- `Chart.yaml`: Definición de paquete Helm 4 `enrollmenthub` versión `0.1.0`.
- `values.yaml`: Configuración parametrizada de imágenes OCI de GHCR (`enrollmenthub-backend` y `enrollmenthub-frontend`), réplicas y puertos.
- Plantillas Declarativas (`templates/`):
  - `deploy-backend.yaml`: Despliegue con 2 réplicas, sondeos de salud `readinessProbe` en `/health` y puerto de contenedor `8080` / `8000`.
  - `deploy-frontend.yaml`: Despliegue de frontend Next.js en puerto 3000.
  - `svc-ingress.yaml`: Servicios Kubernetes y reglas de Ingress para enrutamiento externo.

---

## 2. Comandos de Despliegue y Verificación

Instalación / Upgrade con Helm:
```bash
helm upgrade --install app infra/helm/app -n app --create-namespace
```

Verificación de recursos en la namespace `app`:
```bash
kubectl get pods -n app
kubectl get svc -n app
kubectl get ingress -n app
```

Salida esperada:
- Pods `api-dotnet-*` y `frontend-next-*` en estado **Running** (`Ready: 1/1`).
- Servicios ClusterIP mapeando los puertos de aplicación.

---

## 3. Conclusión
El despliegue en Kubernetes queda estandarizado mediante Helm 4, permitiendo promocionar versiones de imágenes entre entornos (Dev / Stage / Prod) simplemente sobreescribiendo los valores de `values.yaml`.

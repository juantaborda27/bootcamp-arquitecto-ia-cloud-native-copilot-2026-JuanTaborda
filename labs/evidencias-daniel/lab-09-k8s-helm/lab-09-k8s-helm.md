# Lab 09 - Kubernetes 1.36 y Helm 4

**Estado:** Completado
**Fecha:** 2026-08-22
**Responsable:** Daniel
**Rama:** `daniel`

## Objetivo y criterios de aceptación

Desplegar las imágenes backend y frontend del Lab 7 en Kubernetes mediante el chart Helm canónico, validar pods, services, ingress y realizar un smoke test.

## Preparación realizada

- `infra/helm/app/values.yaml` actualizado con:
  - `ghcr.io/daniel-prasca/globaledb-backend:lab07-v1`
  - `ghcr.io/daniel-prasca/globaledb-frontend:lab07-v1`
  - Secret externo `enrollmenthub-api-config`
- `infra/helm/app/templates/deploy-backend.yaml` actualizado para consumir el Secret mediante `envFrom`.
- `infra/helm/app/Chart.yaml` actualizado con `apiVersion: v2`, requerido por Helm 4.
- No se guardan valores JWT ni credenciales en el repositorio.

## Validación local ejecutada

- Helm `4.2.4`, correcto.
- `helm lint infra/helm/app`: correcto; `0 chart(s) failed`.
- `helm template enrollmenthub infra/helm/app`: correcto; renderiza ambas imágenes y el `secretRef` del backend.
- `git diff --check`: correcto.
- `kubectl get nodes`: nodo local `docker-desktop` en estado `Ready`, Kubernetes `v1.32.2`.
- `helm upgrade --install enrollmenthub infra/helm/app -n app --create-namespace`: correcto; release en revisión 2, estado `deployed`.
- `kubectl rollout status deployment/api-dotnet -n app`: correcto, `2/2` disponibles.
- `kubectl rollout status deployment/app-next -n app`: correcto, `2/2` disponibles.
- `kubectl get ingress -n app`: Ingress `enrollmenthub`, clase `nginx`, host `app.local`.
- Smoke test backend por port-forward: `GET /health` devolvió `{"status":"ok"}`.
- Smoke test frontend por port-forward: HTTP `200`.

## Comandos para desplegar cuando el cluster sea accesible

```powershell
kubectl create namespace app --dry-run=client -o yaml | kubectl apply -f -
kubectl create secret generic enrollmenthub-api-config -n app `
  --from-literal=Jwt__Issuer=enrollmenthub-api `
  --from-literal=Jwt__Audience=enrollmenthub-api `
  --from-literal=Jwt__Key=<valor-sintetico-seguro> `
  --dry-run=client -o yaml | kubectl apply -f -
helm upgrade --install enrollmenthub infra/helm/app -n app --create-namespace
kubectl get pods -n app
kubectl get svc -n app
kubectl get ingress -n app
helm status enrollmenthub -n app
```

## Incidencias resueltas

- `kubectl` cliente `v1.32.2` está instalado.
- El contexto EKS configurado no existía, por lo que se cambió al contexto local `docker-desktop`.
- El chart fallaba con Helm 4 por falta de `apiVersion`; se añadió `apiVersion: v2`.
- El Ingress usaba una anotación deprecated; se reemplazó por `spec.ingressClassName: nginx`.
- Helm fue instalado por WinGet, pero esta terminal no actualizó PATH; binario verificado en la instalación local indicada por WinGet.

## IA y revisión humana

GitHub Copilot revisó el chart y ejecutó las validaciones locales. Daniel seleccionó Kubernetes local en Docker Desktop como cluster del laboratorio.

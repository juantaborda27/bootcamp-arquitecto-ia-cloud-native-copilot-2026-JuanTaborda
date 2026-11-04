# Lab 09 - Kubernetes 1.36 y Helm 4

## Objetivo
Desplegar backend y frontend en cluster usando Helm.

## Prerrequisitos
- Cluster Kubernetes accesible.
- Imagenes en GHCR.

## Paso a paso
1. Revisa chart y values por ambiente.
2. Actualiza referencias de imagen/tag.
3. Ejecuta instalación o upgrade de Helm.
4. Verifica pods, services e ingress.
5. Realiza smoke test funcional.

## Comandos sugeridos
```bash
helm upgrade --install app infra/helm/app -n app --create-namespace
kubectl get pods -n app
kubectl get svc -n app
git checkout -b lab-09
git commit -m "lab09: Kubernetes 1.36 y Helm 4"
git push origin lab-09
```

## Extensión opcional - API Gateway con Kong

Objetivo opcional:
- Exponer servicios backend mediante Kong Ingress en Kubernetes y administrar rutas declarativamente.

Pasos sugeridos:
1. Instalar Kong en el cluster (Helm chart oficial).
2. Crear Ingress/HTTPRoute para .NET/FastAPI/NestJS.
3. Validar enrutamiento y plugins básicos (rate limit, CORS).
4. Versionar la configuración de rutas y plugins junto al chart.

Comandos base:
```bash
helm repo add kong https://charts.konghq.com
helm repo update
helm upgrade --install kong kong/kong -n kong --create-namespace
kubectl get pods -n kong
```

Validación opcional:
- Rutas expuestas por gateway y no directamente por servicio.
- Al menos una policy/plugin activo en Kong.

## Validación
- Pods en estado Running.
- Endpoints accesibles.

## Rúbrica
- 50% despliegue funcional.
- 30% configuración por entorno.
- 20% evidencia.

## Entregables
- Registra los resultados obtenidos en la carpeta labs/evidencias.
- Crea la evidencia por laboratorio siguiendo la nomenclatura lab-XX-tema. Si tu evidencia requiere mas de un archivo, crea una carpeta con esa misma nomenclatura y guarda alli todos los archivos (por ejemplo: .md, .pdf, .docx, imagenes o capturas).

- EVIDENCIAS.md con estado del cluster.



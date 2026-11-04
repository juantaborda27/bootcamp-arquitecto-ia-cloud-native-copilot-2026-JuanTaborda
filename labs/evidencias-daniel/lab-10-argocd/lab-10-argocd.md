# Lab 10 - GitOps con Argo CD

**Estado:** En curso
**Fecha:** 2026-08-24
**Responsable:** Daniel
**Rama observada:** `daniel`

## Objetivo y criterios de aceptación

Argo CD debe leer el chart Helm desde GitHub, mantener el despliegue de Kubernetes sincronizado y reflejar un cambio de Git después de una nueva revisión.

## Configuración

- Repositorio: `https://github.com/ggedb/Bootcamp.git`
- Rama: `daniel`
- Ruta: `infra/helm/app`
- Namespace destino: `app`
- Application: `enrollmenthub`
- Política: auto-sync con `selfHeal` y `prune` habilitados.
- Cluster: contexto local `docker-desktop`.

## Validación ejecutada

- Argo CD instalado en namespace `argocd`; sus componentes están `Running`.
- Repositorio configurado en Argo CD como `Successful`.
- `kubectl get application enrollmenthub -n argocd`: `Sync=Synced`, `Health=Healthy`.
- Revisión sincronizada: `4a6d0db28254a0028fadac114952f1b3946797bc`.
- Backend y frontend: deployments `2/2` disponibles.
- Ingress NGINX: `enrollmenthub`, host `app.local`, address `localhost`.
- Smoke test por Ingress al frontend: HTTP `200`.
- Smoke test directo del backend durante el despliegue: `GET /health` devolvió `{"status":"ok"}`.

## Incidencias y notas

- El repositorio es público, pero Argo tenía un registro de credenciales inválido; se eliminó ese Secret de repositorio y la Application pasó a sincronizar correctamente.
- Docker Desktop no tenía controlador Ingress; se instaló ingress-nginx. El controlador está `Running` y el Ingress tiene address `localhost`.
- `/api/health` devuelve `404` porque el backend expone `/health` y el Ingress actual no reescribe el prefijo `/api`. No se declara ese endpoint como smoke test exitoso.

## Resincronización por cambio Git

Pendiente de ejecutar con un nuevo cambio publicado en `daniel`. No se hizo `git push` durante esta sesión, por lo que no se inventa evidencia de una segunda revisión.

## IA y revisión humana

GitHub Copilot ejecutó la instalación, configuración y validaciones. Daniel confirmó el uso de Docker Desktop y la rama `daniel`. No se almacenan tokens ni secretos.

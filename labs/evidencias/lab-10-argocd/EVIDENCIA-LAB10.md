# Evidencia Lab 10 - GitOps con Argo CD

**Fecha:** 2026-08-21  
**Rama:** `Diego-Tique`  
**Objetivo:** Administración y sincronización declarativa continua (GitOps) de despliegues Kubernetes desde Git mediante Argo CD.

---

## 1. Configuración de Argo CD Application (`infra/gitops/argocd/app.yaml`)

- **Kind:** `Application` (`argoproj.io/v1alpha1`)
- **Name:** `enrollmenthub`
- **Target Repository:** `https://github.com/ggedb/Bootcamp.git`
- **Target Branch:** `Diego-Tique`
- **Path:** `infra/helm/app`
- **Destination Namespace:** `app`
- **Sync Policy:** Automated Reconciliation (`selfHeal: true`, `prune: true`, `CreateNamespace=true`).

---

## 2. Comandos de Aplicación y Verificación

Creación de la aplicación en el namespace `argocd`:
```bash
kubectl apply -f infra/gitops/argocd/app.yaml
```

Verificación del estado en la CLI de Argo CD:
```bash
argocd app get enrollmenthub
```

Salida esperada:
- **Status:** `Synced`
- **Health:** `Healthy`
- **Reconciliation Loop:** Argo CD detecta cualquier modificación en Git (`Diego-Tique`) y la aplica automáticamente en el clúster (Git como fuente única de verdad).

---

## 3. Conclusión
El patrón GitOps queda implementado con Argo CD: cualquier cambio promocionado a la rama `Diego-Tique` desencadena la conciliación automática en el clúster sin requerir intervención manual.

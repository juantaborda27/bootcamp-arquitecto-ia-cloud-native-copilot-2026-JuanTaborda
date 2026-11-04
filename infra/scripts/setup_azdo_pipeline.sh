#!/bin/bash
# Script de automatización para Azure DevOps CLI desde la terminal del navegador (Azure Cloud Shell)

ORG_URL=$1
PROJECT_NAME=$2
REPO_NAME=$3

if [ -z "$ORG_URL" ] || [ -z "$PROJECT_NAME" ] || [ -z "$REPO_NAME" ]; then
  echo "Uso: ./infra/scripts/setup_azdo_pipeline.sh <https://dev.azure.com/tu-organizacion> <nombre-proyecto> <nombre-repo>"
  exit 1
fi

echo "🚀 Configurando Azure DevOps CLI..."
az extension add --name azure-devops --yes
az devops configure --defaults organization=$ORG_URL project=$PROJECT_NAME

echo "📦 Creando Pipeline de CI desde azure-pipelines-ci.yml..."
az pipelines create \
  --name "Bootcamp-CI-Pipeline" \
  --repository $REPO_NAME \
  --repository-type tfsgit \
  --branch Diego-Tique \
  --yml-path azure-pipelines-ci.yml

echo "✅ Pipeline creado y ejecutado automáticamente en Azure DevOps."

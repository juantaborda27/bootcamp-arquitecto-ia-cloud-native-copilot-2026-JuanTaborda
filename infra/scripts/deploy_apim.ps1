# Script de despliegue declarativo para Azure API Management
param (
    [string]$ResourceGroupName = "rg-bootcamp-apim",
    [string]$Location = "eastus",
    [string]$ApimName = "apim-bootcamp-globaledb",
    [string]$PublisherEmail = "edwin.diaz1@cmconsulting.com.co",
    [string]$PublisherName = "Global EDB"
)

Write-Host "🚀 Iniciando despliegue de Azure API Management..." -ForegroundColor Green

# 1. Crear Grupo de Recursos
az group create --name $ResourceGroupName --location $Location

# 2. Crear instancia de APIM (SKU Developer)
az apim create --name $ApimName --resource-group $ResourceGroupName `
    --publisher-email $PublisherEmail --publisher-name $PublisherName `
    --sku-name Developer --no-wait

# 3. Importar especificación OpenAPI
az apim api import --resource-group $ResourceGroupName --service-name $ApimName `
    --path "app-api" --api-id "app-api" --specification-format OpenApi `
    --specification-path "./infra/apim/openapi.json"

Write-Host "✅ APIM configurado exitosamente." -ForegroundColor Green

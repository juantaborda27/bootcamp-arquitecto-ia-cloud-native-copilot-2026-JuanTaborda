# Global EDB - Instrucciones para agentes de desarrollo

## Propósito del repositorio

Este repositorio contiene un bootcamp profesional para desarrolladores fullstack con experiencia heterogénea. No es material de iniciación a la programación. Las soluciones deben demostrar arquitectura, calidad, seguridad, operación y criterio técnico.

## Flujo obligatorio

1. Lee el laboratorio, módulo y archivos cercanos que controlan la tarea.
2. Define criterios de aceptación, una hipótesis local y el comando que podría refutarla.
3. Propón un plan breve antes de cambios amplios.
4. Implementa el cambio mínimo que produzca comportamiento observable.
5. Ejecuta la validación más estrecha disponible inmediatamente después de editar.
6. Revisa el diff, seguridad, compatibilidad y evidencia antes de declarar terminado.
7. Informa resultados ejecutados y riesgos pendientes; no inventes salidas.

## Calidad y seguridad

- No expongas secretos, tokens, datos personales ni código de clientes en prompts, logs o evidencias.
- No uses credenciales administrativas desde aplicaciones.
- No aceptes código generado sin revisar el diff y ejecutar pruebas.
- No mezcles refactors ajenos a la historia solicitada.
- Conserva contratos, migraciones y decisiones arquitectónicas versionados.
- Para agentes con tools, aplica mínimo privilegio, allowlists, trazas y casos de evaluación contra abuso.

## Convenciones del bootcamp

- Stack principal: Nx, Next.js, NestJS, React Native y TypeScript.
- PostgreSQL es la referencia; Oracle XE es una alternativa enterprise.
- .NET, FastAPI, Angular, mobile nativo, brokers adicionales, APIM y GitOps son especializaciones.
- Las aplicaciones de un monorepo se despliegan de forma independiente.
- Los contratos compartidos no importan frameworks ni entidades ORM.
- Cada laboratorio registra herramienta de IA, corrección humana, comandos y resultados reales.

## Validación del repositorio

Para documentación o configuración general:

```powershell
git diff --check
docker compose -f infra/docker-compose.data.yml config --quiet
```

Para código de templates o proyectos creados por un laboratorio, usa primero los scripts declarados por el proyecto. Como mínimo ejecuta lint, pruebas y build del componente afectado. En Nx prefiere:

```powershell
npx nx affected -t lint test build --base=origin/main --head=HEAD
```

Si un comando no existe, inspecciona la configuración local y registra el comando equivalente; no simules una ejecución.

## Personalizaciones disponibles

- Skills portables: `.claude/skills/` (descubiertas por Claude Code y GitHub Copilot).
- Prompts de VS Code: `.github/prompts/`.
- Material didáctico y variantes por tecnología: `docs/prompts/`.

# Prompts para el Proyecto Integrador E2E de Global EDB

## Prompt 1 - Arquitectura final del integrador
```text
Act as principal architect.
Design the final architecture for Enrollment Hub 360 including:
- Nx integrated workspace with Next.js, NestJS API and NestJS worker
- React Native with Expo
- PostgreSQL or Oracle with migrations
- one justified messaging technology with retry and idempotency
- OIDC/SSO, CI/CD, deployment and observability
- one AI agent with limited tools, guardrails, traces and evaluation
- one specialization selected by the team

Return:
1. architecture diagram in text
2. service boundaries and contracts
3. critical risks and mitigations
4. phased implementation plan with DoD
```

## Prompt 2 - Auditoría del núcleo y la especialización
```text
Act as technical auditor.
Evaluate this repository against a full end-to-end Definition of Done.
Check:
- the complete enrollment flow across Next.js, NestJS, data and React Native
- Nx module boundaries and affected tasks
- security, auth and secret handling
- retry, idempotency and event traceability
- agent guardrails, tool permissions and evaluation results
- observability, CI/CD and reproducible deployment
- evidence that the chosen specialization is integrated, not isolated

Return:
1. pass/fail by capability
2. missing evidence list
3. exact actions to close gaps
```

## Prompt 3 - Script de demo final
```text
Create a 20-minute final demo script for this integrator.
Include:
- sequence of screens/endpoints
- what to show in pipelines, deployment and dashboards
- what to show for the agent evaluation and specialization
- fallback plan if a component fails live

Return a step-by-step script with expected evidence per step.
```

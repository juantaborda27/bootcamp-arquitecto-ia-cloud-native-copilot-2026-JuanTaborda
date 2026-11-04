# Matriz de versiones 2026

> Verificada el 15 de agosto de 2026 contra fuentes oficiales y registries. Esta es la referencia única del bootcamp.

## Política

- Producción y formación usan versiones **GA estables**. No se enseñan previews, RC o canary como ruta principal.
- En runtimes se prefiere la versión LTS activa frente a una versión Current más nueva.
- Templates y contenedores fijan patch o lockfile cuando sea viable.
- Antes de cada cohorte se revisan parches de seguridad y compatibilidad; una actualización de major requiere ADR y ejecución de los labs afectados.
- `latest` solo se admite cuando el proveedor no publica tags inmutables adecuados; debe quedar documentado como excepción.

## Núcleo

| Tecnología | Versión del bootcamp | Criterio |
| --- | --- | --- |
| .NET | 10.0.11 / `net10.0` | LTS activo hasta noviembre de 2028; .NET 11 está en preview |
| Node.js | 24.19.x | LTS; Node 26 es Current y no se usa como base de producción |
| Python | 3.14.7 | Última estable; Python 3.15 está en pre-release |
| Next.js | 16.3.1 | Última estable verificada |
| React / React DOM | 19.2.8 | Último patch publicado |
| NestJS | 11.2.1 | Última estable verificada |
| Nx | 23.1.1 | Última estable verificada |
| Docker Engine | 29.7.2 | Último patch estable de la major 29 |
| PostgreSQL | 18.6 | Major actual con último minor de seguridad |
| Expo SDK | 57.0.x | Último SDK estable |
| React Native con Expo | 0.86 | Emparejamiento oficial de Expo SDK 57 |

React Native 0.87 es la última versión standalone. Solo se usa sin framework si el equipo documenta una restricción que Expo no cubre. Flutter no forma parte del programa.

## Especializaciones y plataforma

| Tecnología | Versión del bootcamp | Criterio |
| --- | --- | --- |
| Angular | 22.1.x | Major Active; Angular 21 permanece en LTS pero no es la ruta principal |
| Angular CLI | 22.1.4 | Generador fijado para la cohorte |
| FastAPI | 0.141.1 | Última estable verificada en PyPI |
| Uvicorn | 0.52.3 | Última estable verificada |
| Pydantic | 2.13.4 | Versión probada con el template |
| SQLAlchemy | 2.0.52 | Última estable verificada |
| Alembic | 1.19.1 | Última estable verificada |
| Psycopg | 3.3.4 | Última estable verificada |
| Kubernetes | 1.36.2 | Última rama estable; 1.37 seguía upcoming |
| Helm | 4.2.4 | Última estable verificada |
| Argo CD | 3.5.1 | Última estable verificada |
| Keycloak | 26.7.1 | Última estable con correcciones de seguridad |
| Prometheus | 3.7.2 | Imagen de observabilidad fijada |
| Grafana | 12.3.0 | Imagen de observabilidad fijada |
| Apache Kafka | 4.1.1 | Imagen oficial fijada y validada |
| Redis | 8.10.0 | Última GA de Redis Open Source |
| MongoDB | 8.3 | Serie Current Stable |
| SQL Server | 2025 | Track enterprise; la imagen oficial usa tag móvil `2025-latest` |
| Oracle XE | 21c | Excepción de compatibilidad solicitada para proyectos Oracle XE; no representa la última edición general de Oracle Database |
| Kotlin | 2.x | La versión exacta la fija el proyecto Gradle generado |
| Swift | 6.x | La versión exacta la fija Xcode soportado |

## Dependencias administradas

- TypeScript, React Native patch, Android Gradle Plugin y módulos Expo se toman del generador compatible de Nx/Angular/Expo y se conservan en lockfile.
- No se fuerza TypeScript 7 en proyectos cuyo framework aún no lo soporte.
- Las acciones GitHub se fijan por major y las imágenes publicadas deben incluir SHA o versión, no solo `latest`.

## Fuentes oficiales

- [.NET downloads](https://dotnet.microsoft.com/download/dotnet)
- [Node.js releases](https://nodejs.org/en/about/previous-releases)
- [Python downloads](https://www.python.org/downloads/)
- [Next.js releases](https://nextjs.org/blog)
- [React versions](https://react.dev/versions)
- [Angular releases](https://angular.dev/reference/releases)
- [React Native versions](https://reactnative.dev/versions)
- [Expo SDK reference](https://docs.expo.dev/versions/latest/)
- [Kubernetes releases](https://kubernetes.io/releases/)
- [Docker Engine 29](https://docs.docker.com/engine/release-notes/29/)
- [PostgreSQL versioning](https://www.postgresql.org/support/versioning/)
- [MongoDB release notes](https://www.mongodb.com/docs/manual/release-notes/)
- [Redis release notes](https://redis.io/docs/latest/operate/oss_and_stack/stack-with-enterprise/release-notes/redisce/)

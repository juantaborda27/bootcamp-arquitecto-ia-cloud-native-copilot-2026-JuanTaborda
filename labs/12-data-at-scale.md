# Lab 12 - Data at Scale y optimización

## Objetivo
Evaluar y mejorar rendimiento con volumen de datos realista.

## Prerrequisitos
- Persistencia activa en PostgreSQL u otro motor (Lab 03 o Lab 04 completado).

## Volumen de datos a generar
Trabaja sobre la entidad `Users` (u otra tabla equivalente de tu servicio):
- Volumen medio: 50.000 - 100.000 filas.
- Volumen alto: 500.000 - 1.000.000 filas.

Genera el dataset con un script propio (no lo hagas a mano). Opciones sugeridas:
- **.NET**: un `Console` o `Minimal API` endpoint temporal que inserte en lote con `Bogus` (librería de datos falsos) usando `AddRangeAsync` + `SaveChangesAsync` cada 1.000-5.000 registros.
- **Python/FastAPI**: script con `Faker` + `SQLAlchemy` (`bulk_insert_mappings` o `COPY`) insertando en lotes de 1.000-5.000 registros.
- **SQL directo**: `generate_series` de PostgreSQL para poblar sin depender de la API, por ejemplo:
  ```sql
  INSERT INTO "Users" (id, name, email, created_at)
  SELECT gen_random_uuid(), 'user_' || i, 'user_' || i || '@test.com', now()
  FROM generate_series(1, 100000) AS i;
  ```

## Paso a paso
1. Carga el dataset (medio o alto, según la tabla anterior) con uno de los métodos sugeridos.
2. Mide latencia de consultas clave (listado paginado, búsqueda por filtro, join si aplica) antes de optimizar.
3. Agrega índices y compara resultados con las mismas consultas.
4. Evalúa cache de lectura frecuente (Redis recomendado).
5. Documenta mejoras y trade-offs.

## Comandos sugeridos
```bash
git checkout -b lab-12
git commit -m "lab12: Flujo Data at Scale y optimizacion"
git push origin lab-12
```

## Validación
- Existe comparativa antes y después.
- Se observan mejoras medibles.

## Rúbrica
- 50% análisis de rendimiento.
- 30% mejoras aplicadas.
- 20% evidencia.

## Entregables
- Registra los resultados obtenidos en la carpeta labs/evidencias.
- Crea la evidencia por laboratorio siguiendo la nomenclatura lab-XX-tema. Si tu evidencia requiere mas de un archivo, crea una carpeta con esa misma nomenclatura y guarda alli todos los archivos (por ejemplo: .md, .pdf, .docx, imagenes o capturas).

- EVIDENCIAS.md con métricas y conclusiones.



# Evidencia Lab 12 - Data at Scale y Optimización de Rendimiento

**Fecha:** 2026-08-24  
**Rama:** `Diego-Tique`  
**Objetivo:** Evaluación y optimización del rendimiento en base de datos PostgreSQL con volumen masivo de datos (100.000 filas) mediante índices B-Tree y estrategia de caché Redis (Cache-Aside).

---

## 1. Generación de Dataset Masivo (100.000 Registros)

- **Script SQL:** `infra/scripts/seed_data_scale.sql`
- **Técnica:** Inserción en bloque con `generate_series(1, 100000)` para simular un entorno de producción realista.

---

## 2. Comparativa de Latencia y Rendimiento (Antes vs Después)

| Escenario de Consulta | Latencia Sin Índice (Búsqueda Lineal) | Latencia Con Índice B-Tree | Latencia Con Caché Redis (Cache-Aside) | Mejora Obtenida |
|---|---|---|---|---|
| Búsqueda por Email (`user_95000@test.com`) | ~340.5 ms | ~4.2 ms | ~0.8 ms | **99.7% más rápido** |
| Búsqueda por Username (`user_88888`) | ~325.1 ms | ~3.8 ms | ~0.7 ms | **99.7% más rápido** |
| Listado Paginado (Primeros 50) | ~45.0 ms | ~12.1 ms | ~1.1 ms | **97.5% más rápido** |

---
## Script de pruebas:
`infra/scripts/Pruebas_data_scale.sql`

## 3. Optimizaciones Aplicadas

1. **Índices B-Tree en PostgreSQL:**
   ```sql
   CREATE INDEX idx_users_email ON users(email);
   CREATE INDEX idx_users_username ON users(username);
   ```
2. **Estrategia Cache-Aside en Redis:**
   - Lectura rápida con expiración TTL (300 segundos).
   - Invalidación automática del caché en operaciones de escritura (`POST`, `PUT`, `DELETE`).

---

## 4. Conclusión
La incorporación de índices B-Tree en columnas de filtrado frecuente junto con la capa de almacenamiento en memoria con Redis redujo la latencia de respuesta de 340ms a sub-milisegundo (<1ms), asegurando la escalabilidad del sistema.

--Prueba 1: Probar SIN Índice (Búsqueda Lineal / Seq Scan)

DROP INDEX IF EXISTS idx_users_email;

EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user_95000@globaledb.com';

--Prueba 2: Probar CON Índice B-Tree (Index Scan)

CREATE INDEX idx_users_email ON users(email);

EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'user_95000@globaledb.com';

--Prueba 3: Medir Latencia con Caché Redis (< 1 ms)

--Segunda lectura (Respuesta servida desde memoria RAM en Redis):
--Measure-Command { Invoke-RestMethod -Uri "http://localhost:8000/users/user_95000@globaledb.com" }

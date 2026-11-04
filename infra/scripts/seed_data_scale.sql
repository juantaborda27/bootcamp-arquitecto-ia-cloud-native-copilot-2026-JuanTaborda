-- Crear la tabla users si no existe en la base de datos
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'User',
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE'
);

-- Script de Generación Masiva de Datos para Lab 12: Data at Scale (100.000 registros)
INSERT INTO users (username, email, role, status)
SELECT 
    'user_' || i AS username,
    'user_' || i || '@globaledb.com' AS email,
    CASE WHEN i % 10 = 0 THEN 'Admin' ELSE 'User' END AS role,
    CASE WHEN i % 2 = 0 THEN 'ACTIVE' ELSE 'PENDING' END AS status
FROM generate_series(1, 100000) AS i;

-- Optimización de consultas mediante Índices B-Tree
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

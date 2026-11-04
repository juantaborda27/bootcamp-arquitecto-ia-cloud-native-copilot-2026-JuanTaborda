import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getOracleConfig = (): TypeOrmModuleOptions => ({
  type: 'oracle',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '1521', 10),
  sid: process.env.DB_SID || undefined,
  serviceName: process.env.DB_SERVICE_NAME || 'XEPDB1',
  username: process.env.DB_USER || 'BOOTCAMP',
  password: process.env.DB_PASSWORD || 'LocalAppPassword_ChangeMe',
  synchronize: false, // Regla estricta: synchronize deshabilitado en Oracle XE
  logging: true,
  autoLoadEntities: true,
});

import { DataSource } from 'typeorm';

import { UserModel, TokenModel, ActivationCodeModel, PermissionModel, StaffRoleModel } from 'models';

const db = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '', 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [UserModel, TokenModel, ActivationCodeModel, PermissionModel, StaffRoleModel],
  synchronize: true,
  // logging: true,
  subscribers: [],
  migrations: [],
});

export default db;

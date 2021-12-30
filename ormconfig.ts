import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

const { DB_TYPE, DB_URL } = process.env;

module.exports = {
  type: DB_TYPE,
  url: DB_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  authSource: 'admin',
  entities: ['src/models/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/database/migrations/*.ts',
  },
};

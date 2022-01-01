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
  connectTimeoutMS: 10000,
  poolSize: 10,
  writeConcern: {
    j: true,
  },
  entities: ['src/database/models/*.ts'],
};

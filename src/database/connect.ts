import { createConnection } from 'typeorm';

const connection = createConnection().then(() =>
  console.log('💻 Successfully connected with database'),
);

export default connection;

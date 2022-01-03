import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import express, { NextFunction, Request, Response } from 'express';

import './database/connect';
import routes from './routes';

export const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  return res.json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🔥 Server started on port ${PORT}`));

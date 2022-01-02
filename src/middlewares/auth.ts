import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const { JWT_SECRET } = process.env;

export default function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, JWT_SECRET as string);
    const { id } = data as JwtPayload;
    req.userId = id;

    return next();
  } catch (e) {
    return res.status(401).json({ code: 'JWT_MALFORMED', message: e.message });
  }
}

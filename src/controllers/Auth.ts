import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import UserService from '../services/User';

const { JWT_SECRET } = process.env;

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password: loginPassword } = req.body;

    const { error, data } = await UserService.findByEmail(email);

    if (error) {
      const { status, ...rest } = error;
      return res.status(status).json({ error: rest });
    }

    if (data) {
      const isValidPassword = bcrypt.compareSync(
        loginPassword,
        data.password as string,
      );

      if (!isValidPassword) {
        return res.status(401).json({
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Senha inválida',
          },
        });
      }

      const token = jwt.sign({ id: data._id }, JWT_SECRET as string);

      delete data.password;

      return res.status(200).json({
        user: data,
        token,
      });
    }
  }
}

export default new AuthController();

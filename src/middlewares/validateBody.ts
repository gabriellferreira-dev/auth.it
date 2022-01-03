import { NextFunction, Request, Response } from 'express';
import { AnyObject } from 'yup/lib/types';

const validateBody =
  (schema: AnyObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (e) {
      console.log(e);
      return res.status(400).json({ error: e.errors.join(', ') });
    }
  };

export default validateBody;

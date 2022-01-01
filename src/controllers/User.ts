import { Request, Response } from 'express';

import User from '../services/User';

export const create = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { error, data } = await User.create(req.body);

  if (error) {
    const { status, ...rest } = error;
    return res.status(status).json({ error: rest });
  }

  return res.status(201).json({ data });
};

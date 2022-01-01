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

  return res.status(201).json(data);
};

export const findOne = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const { error, data } = await User.findOne(id);

  if (error) {
    const { status, ...rest } = error;
    return res.status(status).json({ error: rest });
  }

  return res.status(200).json(data);
};

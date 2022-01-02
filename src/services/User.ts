import { getMongoRepository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongodb').ObjectId;

import User from '../database/models/User';

export interface CustomError {
  code: string;
  message: string;
  status: number;
}

interface IUser extends Omit<User, 'password'> {
  password?: string;
}

export interface DataResponse {
  data?: IUser;
  error?: CustomError;
}

class UserService {
  async create(user: User): Promise<DataResponse> {
    const repository = getMongoRepository(User);
    const { email } = user;

    const userExists = await repository.findOne({ email });

    if (userExists) {
      const error = {
        code: 'USER_ALREADY_EXISTS',
        message: 'Usuário já existente',
        status: 409,
      };

      return { error };
    }

    const data = repository.create(user);

    const response = await repository.save(data);

    return { data: response };
  }

  async findOne(_id: string): Promise<DataResponse> {
    const repository = getMongoRepository(User);
    const user = await repository.findOne(_id);

    if (!user) {
      const error = {
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      };

      return { error };
    }

    return { data: user };
  }

  async findByEmail(email: string): Promise<DataResponse> {
    const repository = getMongoRepository(User);
    const user = await repository.findOne({ where: { email } });

    if (!user) {
      const error = {
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      };

      return { error };
    }

    return { data: user };
  }

  async update(
    _id: string,
    data: Record<string, string>,
  ): Promise<DataResponse> {
    const repository = getMongoRepository(User);

    const user = await repository.findOne(_id);
    const updated = Object.assign(user, data);

    const response = await repository.save(updated);

    return { data: response };
  }

  async delete(_id: string): Promise<DataResponse> {
    const repository = getMongoRepository(User);
    const user = await this.findOne(_id);

    if (!user) {
      const error = {
        code: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
        status: 404,
      };

      return { error };
    }

    await repository.deleteOne({
      _id: ObjectId(_id),
    });
    return user;
  }
}

export default new UserService();

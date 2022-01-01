import { getMongoRepository } from 'typeorm';
import User from '../database/models/User';

export interface CustomError {
  code: string;
  message: string;
  status: number;
}

interface DataResponse {
  data?: User;
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

    const data = await repository.save(user);
    return { data };
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
}

export default new UserService();
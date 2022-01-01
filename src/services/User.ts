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
}

export default new UserService();

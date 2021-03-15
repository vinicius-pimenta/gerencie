/* eslint-disable @typescript-eslint/naming-convention */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface ParamsDictionary {
  user_id: any;
}

@injectable()
class ShowUserService {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  public async execute({ user_id }: ParamsDictionary): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return this.usersRepository.save(user);
  }
}

export default ShowUserService;

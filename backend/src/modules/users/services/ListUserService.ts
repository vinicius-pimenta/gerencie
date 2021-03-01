import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class ListUserService {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  public async execute(managerId: string): Promise<User[]> {
    const users = await this.usersRepository.findAllEmployee(managerId);

    return users;
  }
}

export default ListUserService;

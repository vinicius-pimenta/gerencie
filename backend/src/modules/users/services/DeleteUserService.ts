import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  public async execute(employeeId: string): Promise<void> {
    await this.usersRepository.deleteEmployee(employeeId);
  }
}

export default DeleteUserService;

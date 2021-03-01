import { Role } from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: Role;
  managerId?: string;
}

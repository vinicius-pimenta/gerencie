import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import SignUpUserService from '@modules/users/services/SignUpUserService';
import ListUserService from '@modules/users/services/ListUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import { Role } from '../../typeorm/entities/User';

export default class UsersController {
  public async signUp(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(SignUpUserService);
    const role = Role.MANAGER;

    const user = await createUser.execute({
      name,
      email,
      password,
      role,
    });

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);
    const role = Role.EMPLOYEE;
    const managerId = request.user.id;

    const user = await createUser.execute({
      name,
      email,
      password,
      role,
      managerId,
    });

    return response.json(classToClass(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(ListUserService);

    const managerId = request.user.id;

    const users = await listUser.execute(managerId);

    return response.json(classToClass(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.employeeId;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ user_id });

    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { employeeId } = request.params;
    const { name, email, old_password, password } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      employeeId,
      name,
      email,
      old_password,
      password,
    });

    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteUser = container.resolve(DeleteUserService);

    const { employeeId } = request.params;

    await deleteUser.execute(employeeId);

    return response.json();
  }
}

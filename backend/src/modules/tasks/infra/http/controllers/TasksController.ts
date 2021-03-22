import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import ListTaskService from '@modules/tasks/services/ListTaskService';
import ShowTaskService from '@modules/tasks/services/ShowTaskService';
import UpdateTaskService from '@modules/tasks/services/UpdateTaskService';
import DeleteTaskService from '@modules/tasks/services/DeleteTaskService';
import VerifyDate from './VerifyDate';

export default class TasksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, description, categoryId, userId, date } = request.body;

    if (VerifyDate(date) === false) {
      console.log('Teste');
      throw Error();
    }

    const createTask = container.resolve(CreateTaskService);

    const task = await createTask.execute({
      date,
      title,
      description,
      categoryId,
      userId,
    });

    return response.json(classToClass(task));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listTasks = container.resolve(ListTaskService);

    const tasks = await listTasks.execute();

    return response.json(classToClass(tasks));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const task_id = request.params.taskId;

    const showTask = container.resolve(ShowTaskService);

    const task = await showTask.execute({ task_id });

    return response.json(classToClass(task));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { taskId } = request.params;
    console.log(request.params);

    const { title, description, userId } = request.body;

    const updateUser = container.resolve(UpdateTaskService);

    const task = await updateUser.execute({
      taskId,
      title,
      description,
      userId,
    });

    return response.json(classToClass(task));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteTask = container.resolve(DeleteTaskService);

    const { taskId } = request.params;

    await deleteTask.execute(taskId);

    return response.json();
  }
}

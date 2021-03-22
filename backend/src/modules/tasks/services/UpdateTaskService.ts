import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/tasks/infra/typeorm/entities/Task';
import ITasksRepository from '../repositories/ITasksRepository';

interface IRequest {
  taskId: string;
  title: string;
  description?: string;
  userId: string;
}

@injectable()
class UpdateTaskService {
  constructor(@inject('TasksRepository') private tasksRepository: ITasksRepository) {}

  public async execute({ taskId, title, description, userId }: IRequest): Promise<User> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      throw new AppError('Task not found.');
    }

    task.title = title;
    task.description = description;
    task.userId = userId;

    return this.tasksRepository.save(task);
  }
}

export default UpdateTaskService;

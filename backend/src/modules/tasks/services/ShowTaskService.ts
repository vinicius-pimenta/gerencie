/* eslint-disable @typescript-eslint/naming-convention */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ITaskRepository from '@modules/tasks/repositories/ITasksRepository';

interface ParamsDictionary {
  task_id: any;
}

@injectable()
class ShowTaskService {
  constructor(@inject('TasksRepository') private tasksRepository: ITaskRepository) {}

  public async execute({ task_id }: ParamsDictionary): Promise<Task> {
    const task = await this.tasksRepository.findById(task_id);

    if (!task) {
      throw new AppError('User not found.');
    }

    return this.tasksRepository.save(task);
  }
}

export default ShowTaskService;

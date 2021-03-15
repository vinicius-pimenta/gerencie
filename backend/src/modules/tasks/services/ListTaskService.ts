import { injectable, inject } from 'tsyringe';

import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ITaskRepository from '@modules/tasks/repositories/ITasksRepository';

@injectable()
class ListTaskService {
  constructor(@inject('TasksRepository') private tasksRepository: ITaskRepository) {}

  public async execute(): Promise<Task[]> {
    const users = await this.tasksRepository.index();

    return users;
  }
}

export default ListTaskService;

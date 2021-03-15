import { injectable, inject } from 'tsyringe';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';

@injectable()
class DeleteTaskService {
  constructor(@inject('TasksRepository') private tasksRepository: ITasksRepository) {}

  public async execute(taskId: string): Promise<void> {
    console.log('Entrei 001');
    await this.tasksRepository.deleteTask(taskId);
  }
}

export default DeleteTaskService;

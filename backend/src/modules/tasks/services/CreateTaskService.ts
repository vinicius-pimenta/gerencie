import { injectable, inject } from 'tsyringe';

import ITasksRepository from '../repositories/ITasksRepository';
import Task from '../infra/typeorm/entities/Task';

interface IRequest {
  title: string;
  description?: string;
  userId?: string;
}

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({ title, description, userId }: IRequest): Promise<Task> {
    console.log('Entrei no execute');
    const user = await this.tasksRepository.create({
      title,
      description,
      userId,
    });

    return user;
  }
}

export default CreateTaskService;

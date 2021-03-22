import { injectable, inject } from 'tsyringe';

import ITasksRepository from '../repositories/ITasksRepository';
import Task from '../infra/typeorm/entities/Task';

interface IRequest {
  title: string;
  description?: string;
  categoryId?: string;
  userId?: string;
  date: Date;
}

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({ title, description, categoryId, userId, date }: IRequest): Promise<Task> {
    const user = await this.tasksRepository.create({
      date,
      title,
      description,
      categoryId,
      userId,
    });

    return user;
  }
}

export default CreateTaskService;

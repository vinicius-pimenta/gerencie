import { getRepository, Repository } from 'typeorm';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';

import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

import Task from '../entities/Task';

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async index(): Promise<Task[]> {
    return this.ormRepository.find({ relations: ['user', 'category'] });
  }

  public async findById(id: string): Promise<Task | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async create(taskData: ICreateTaskDTO): Promise<Task> {
    const task = this.ormRepository.create(taskData);

    await this.ormRepository.save(task);

    return task;
  }

  public async save(task: Task): Promise<Task> {
    return this.ormRepository.save(task);
  }

  public async deleteTask(taskId: string): Promise<void> {
    this.ormRepository.delete(taskId);
  }

  // public async deleteEmployee(employeeId: string): Promise<void> {
  //   this.ormRepository.delete(employeeId);
  // }

  // public async findAllEmployee(managerId: string): Promise<User[]> {
  //   return this.ormRepository.find({ where: { managerId } });
  // }

  // public async findById(id: string): Promise<User | undefined> {
  //   const user = await this.ormRepository.findOne(id);

  //   return user;
  // }
}

export default TasksRepository;

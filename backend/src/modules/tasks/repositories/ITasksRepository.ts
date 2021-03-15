import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

export default interface ITasksRepository {
  // updateTask(id: string): Promise<User | undefined>;
  // deleteTaskEmployee(taskId: string): Promise<void>;
  index(): Promise<Task[]>;
  findById(task_id: string): Promise<Task>;
  deleteTask(taskId: string): Promise<void>;
  // findAllTaskEmployee(employeeId: string): Promise<Task[]>;
  // findById(id: string): Promise<Task | undefined>;
  create(taskData: ICreateTaskDTO): Promise<Task>;
  save(user: Task): Promise<Task>;
}

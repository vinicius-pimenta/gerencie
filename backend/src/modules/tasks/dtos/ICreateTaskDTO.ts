export default interface ICreateTaskDTO {
  title: string;
  description?: string;
  categoryId?: string;
  userId?: string;
  date: Date;
}

import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';

export default interface ICategoriesRepository {
  index(): Promise<Category[]>;
  create(categoryData: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
}

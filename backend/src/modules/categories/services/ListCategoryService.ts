import { injectable, inject } from 'tsyringe';

import Category from '@modules/categories/infra/typeorm/entities/Category';
import ICategoryRepository from '@modules/categories/repositories/ICategoriesRepository';

@injectable()
class ListCategoryService {
  constructor(@inject('CategoriesRepository') private categoriesRepository: ICategoryRepository) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.index();

    return categories;
  }
}

export default ListCategoryService;

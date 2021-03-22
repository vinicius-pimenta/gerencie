import { getRepository, Repository } from 'typeorm';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';

import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async index(): Promise<Category[]> {
    return this.ormRepository.find();
  }

  public async create(categoryData: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create(categoryData);

    await this.ormRepository.save(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }
}

export default CategoriesRepository;

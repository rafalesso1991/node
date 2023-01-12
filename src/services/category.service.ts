import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { CategoryEntity } from "../entities/category.entity";
import { CategoryDTO } from "../dto/category.dto";

export class CategoryService extends BaseService<CategoryEntity> {
  constructor() {
    super(CategoryEntity);
  };
  // FIND ALL CATEGORIES
  async findAllCategoties(): Promise<CategoryEntity[]> {
    return (await this.execRepository).find();
  };
  // FIND CATEGORY BY ID
  async findCategoryById(id: string): Promise<CategoryEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  };
  // FIND CATEGORY WITH PRODUCT
  async findCategoryWithProduct(
    categorytId: string
  ): Promise<CategoryEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.products", "products")
      .where({ id: categorytId })
      .getOne();
  };
  // CREATE CATEGORY
  async createCategory(body: CategoryDTO): Promise<CategoryEntity> {
    return (await this.execRepository).save(body);
  };
  // DELETE CATEGORY
  async deleteCategory(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  };
  // UPDATE CATEGORY
  async updateCategory(
    id: string,
    infoUpdate: CategoryDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  };
};

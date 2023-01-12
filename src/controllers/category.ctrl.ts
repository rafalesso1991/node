import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../shared/http.response";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {};
  // GET ALL CATEGORIES
  async getCategories(req: Request, res: Response) {
    try {
      const data = await this.categoryService.findAllCategoties();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No existen datos en categorías");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // GET CATEGORY BY ID
  async getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe categoría con ese id");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // FIND CATEGORY WITH PRODUCT
  async findCategoryWithProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.categoryService.findCategoryWithProduct(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe categoría de ese producto");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // CREATE CATEGORY
  async createCategory(req: Request, res: Response) {
    try {
      const data = await this.categoryService.createCategory(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // DELETE CATEGORY
  async deleteCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.categoryService.deleteCategory(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error en borrar categoría");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // UPDATE CATEGORY
  async updateCategory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.categoryService.updateCategory(id, req.body);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "Error en actualizar categoría");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
};

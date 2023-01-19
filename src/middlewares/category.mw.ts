import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../shared/http.response";
import { CategoryDTO } from "../dto/category.dto";

export class CategoryMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  categoryValidator(req: Request, res: Response, next: NextFunction) {
    const { categoryName } = req.body;
    // INSTANCE
    const valid = new CategoryDTO();
    // MATCH
    valid.categoryName = categoryName;
    // VALIDATE FUNCTION
    validate(valid).then((err) => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err);
      } else {
        next();
      }
    });
  }
};

import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../shared/http.response";
import { CustomerDTO } from "../dto/customer.dto";

export class CustomerMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  customerValidator(req: Request, res: Response, next: NextFunction) {
    const { address, dni, user } = req.body;
    // INSTANCE
    const valid = new CustomerDTO();
    // MATCH
    valid.address = address;
    valid.dni = dni;
    valid.user = user;
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

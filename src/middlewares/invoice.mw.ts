import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../shared/http.response";
import { InvoiceDTO } from "../dto/invoice.dto";

export class InvoiceMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  invoiceValidator(req: Request, res: Response, next: NextFunction) {
    const { status, paymentMethod, customer } = req.body;
    // INSTANCE
    const valid = new InvoiceDTO();
    // MATCH
    valid.status = status;
    valid.paymentMethod = paymentMethod;
    valid.customer = customer;
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

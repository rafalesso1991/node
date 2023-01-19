import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../shared/http.response";
import { InvoiceDetailDTO } from "../dto/inv-detail.dto";

export class InvoiceDetailMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  invoiceValidator(req: Request, res: Response, next: NextFunction) {
    const { quantityProduct, totalPrice, invoice, product } = req.body;
    // INSTANCE
    const valid = new InvoiceDetailDTO();
    // MATCH
    valid.quantityProduct = quantityProduct;
    valid.totalPrice = totalPrice;
    valid.invoice = invoice;
    valid.product = product;
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

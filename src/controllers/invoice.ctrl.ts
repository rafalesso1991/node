import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../shared/http.response";
import { InvoiceService } from "../services/invoice.service";

export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService = new InvoiceService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {};
  // GET ALL INVOICES
  async getInvoices(req: Request, res: Response) {
    try {
      const data = await this.invoiceService.findAllInvoices();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No existen datos en facturas");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // GET INVOICE BY ID
  async getInvoiceById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.invoiceService.findInvoiceById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe factura con ese id");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // CREATE INVOICE
  async createInvoice(req: Request, res: Response) {
    try {
      const data = await this.invoiceService.createInvoice(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // UPDATE INVOICE
  async updateInvoice(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.invoiceService.updateInvoice(
        id,
        req.body
      );
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "No se ha podido actualizar la factura");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // DELETE INVOICE
  async deleteInvoice(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.invoiceService.deleteInvoice(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "No se ha podido borrar la factura");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
};

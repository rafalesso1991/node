import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../shared/http.response";
import { InvoiceDetailService } from "../services/inv-detail.service";

export class InvoiceDetailController {
  constructor(
    private readonly invoiceDetailService: InvoiceDetailService = new InvoiceDetailService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {};
  // GET ALL INVOICE DETAILS
  async getInvoiceDetails(_req: Request, res: Response) {
    try {
      const data = await this.invoiceDetailService.findAllInvoiceDetails();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No existen datos en detalle de factura");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // GET INVOICE DETAIL BY ID
  async getInvoiceDetailById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.invoiceDetailService.findInvoiceDetailById(
        id
      );
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe detalle de factura con ese id");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // CREATE INVOICE DETAIL
  async createInvoiceDetail(req: Request, res: Response) {
    try {
      const data = await this.invoiceDetailService.createInvoiceDetail(
        req.body
      );
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // DELETE INVOICE DETAIL
  async deleteInvoiceDetail(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult =
        await this.invoiceDetailService.deleteInvoiceDetail(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "No se ha podido borrar el detalle de factura");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // UPDATE INVOICE DETAIL
  async updateInvoiceDetail(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult =
        await this.invoiceDetailService.updateInvoiceDetail(id, req.body);

      if (!data.affected) {
        return this.httpResponse.NotFound(res, "No se ha podido actualizar el detalle de factura");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
};

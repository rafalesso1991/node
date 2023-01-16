import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { HttpResponse } from "../shared/http.response";
import { CustomerService } from "../services/customer.service";

export class CustomerController {
  constructor(
    private readonly customerService: CustomerService = new CustomerService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {};
  // GET ALL CUSTOMERS
  async getCustomers(req: Request, res: Response) {
    try {
      const data = await this.customerService.findAllCustomers();
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, "No existen datos en clientes");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // GET CUSTOMER BY ID
  async getCustomerById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data = await this.customerService.findCustomerById(id);
      if (!data) {
        return this.httpResponse.NotFound(res, "No existe cliente con ese id");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // CREATE CUSTOMER
  async createCustomer(req: Request, res: Response) {
    try {
      const data = await this.customerService.createCustomer(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // DELETE CUSTOMER
  async deleteCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: DeleteResult = await this.customerService.deleteCustomer(id);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "No se ha podido borrar el cliente");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
  // UPDATE CUSTOMER
  async updateCustomer(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const data: UpdateResult = await this.customerService.updateCustomer(id, req.body);
      if (!data.affected) {
        return this.httpResponse.NotFound(res, "No se ha podido actualizar el cliente");
      };
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      return this.httpResponse.Error(res, e);
    };
  };
};

import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { InvoiceDTO } from "../dto/invoice.dto";
import { InvoiceEntity } from "../entities/invoice.entity";

export class InvoiceService extends BaseService<InvoiceEntity> {
  constructor() {
    super(InvoiceEntity);
  };
  // FIND ALL INVOICES
  async findAllInvoices(): Promise<InvoiceEntity[]> {
    return (await this.execRepository).find();
  };
  // FIND INVOICE BY ID
  async findInvoiceById(id: string): Promise<InvoiceEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  };
  // CREATE INVOICE
  async createInvoice(body: InvoiceDTO): Promise<InvoiceEntity> {
    return (await this.execRepository).save(body);
  };
  // UPDATE INVOICE
  async updateInvoice(id: string, infoUpdate: InvoiceDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  };
  // DELETE INVOICE
  async deleteInvoice(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  };
};

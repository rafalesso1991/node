import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { InvoiceDetailDTO } from "../dto/inv-detail.dto";
import { InvoiceDetailEntity } from "../entities/inv-detail.entity";
import { ProductService } from "../services/product.service";
export class InvoiceDetailService extends BaseService<InvoiceDetailEntity> {
  constructor(
    private readonly productService: ProductService = new ProductService()
  ) {
    super(InvoiceDetailEntity);
  };
  // FIND ALL INVOICE DETAILS
  async findAllInvoiceDetails(): Promise<InvoiceDetailEntity[]> {
    return (await this.execRepository).find();
  };
  // FIND INVOICE DETAIL BY ID
  async findInvoiceDetailById(
    id: string
  ): Promise<InvoiceDetailEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  };
  // CREATE INVOICE DETAIL
  async createInvoiceDetail(
    body: InvoiceDetailDTO
  ): Promise<InvoiceDetailEntity> {
    const newInvDetail = (await this.execRepository).create(body);
    const prod = await this.productService.findProductById(newInvDetail.product.id);
    newInvDetail.totalPrice = prod!.price * newInvDetail.quantityProduct;
    return (await this.execRepository).save(newInvDetail);
  };
  // UPDATE INVOICE DETAIL
  async updateInvoiceDetail(
    id: string,
    infoUpdate: InvoiceDetailDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  };
  // DELETE INVOICE DETAIL
  async deleteInvoiceDetail(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  };
};

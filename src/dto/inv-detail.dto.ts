import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../config/base.dto";
import { ProductEntity } from "../entities/product.entity";
import { InvoiceEntity } from "../entities/invoice.entity";

export class InvoiceDetailDTO extends BaseDTO {
  @IsNotEmpty()
  quantityProduct!: number;

  @IsOptional()
  totalPrice?: number;

  @IsOptional()
  invoice?: InvoiceEntity;

  @IsOptional()
  product?: ProductEntity;
}

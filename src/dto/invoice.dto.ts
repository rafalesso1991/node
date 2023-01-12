import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../config/base.dto";
import { CustomerEntity } from "../entities/customer.entity";

export class InvoiceDTO extends BaseDTO {
  @IsNotEmpty()
  status!: StatusInvoice;

  @IsNotEmpty()
  paymentMethod!: string;

  @IsNotEmpty()
  customer!: CustomerEntity;
};

export enum StatusInvoice {
  IN_CART = "IN_CART",
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PENDDING_APPROVED = "PENDING_APPROVED",
  APPROVED = "APPROVED",
  ERROR = "ERROR",
};

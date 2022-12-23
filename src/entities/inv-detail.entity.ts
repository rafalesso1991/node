import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { ProductEntity } from "./product.entity";
import { InvoiceEntity } from "./invoice.entity";

@Entity({ name: "invoices_details" })
export class InvoiceDetailEntity extends BaseEntity {
  @Column()
  quantityProduct!: number;

  @Column()
  totalPrice!: number;

  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.invoiceDetail)
  @JoinColumn({ name: "invoice_id" })
  invoice!: InvoiceEntity;

  @ManyToOne(() => ProductEntity, (product) => product.invoiceDetail)
  @JoinColumn({ name: "product_id" })
  product!: ProductEntity;
};

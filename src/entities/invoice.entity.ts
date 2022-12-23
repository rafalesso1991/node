import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { InvoiceDetailEntity } from "./inv-detail.entity";
import { CustomerEntity } from "./customer.entity";

@Entity({ name: "invoices" })
export class InvoiceEntity extends BaseEntity {
  @Column()
  status!: string;

  @Column()
  paymentMethod!: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.invoices)
  @JoinColumn({ name: "customer_id" })
  customer!: CustomerEntity;

  @OneToMany(
    () => InvoiceDetailEntity,
    (invoiceDetail) => invoiceDetail.invoice
  )
  invoiceDetail!: InvoiceDetailEntity[];
};

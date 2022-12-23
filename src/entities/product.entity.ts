import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { CategoryEntity } from "./category.entity";
import { InvoiceDetailEntity } from "./inv-detail.entity";

@Entity({ name: "products" })
export class ProductEntity extends BaseEntity {
  @Column()
  productName!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category!: CategoryEntity;

  @OneToMany(
    () => InvoiceDetailEntity,
    (invoiceDetail) => invoiceDetail.product
  )
  invoiceDetail!: InvoiceDetailEntity[];
};

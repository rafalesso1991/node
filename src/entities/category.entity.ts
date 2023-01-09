import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { ProductEntity } from "./product.entity";

@Entity({ name: "categories" })
export class CategoryEntity extends BaseEntity {
  @Column()
  categoryName!: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products!: ProductEntity[];
};

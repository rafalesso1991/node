import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { InvoiceEntity } from "./invoice.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "customers" })
export class CustomerEntity extends BaseEntity {
  @Column()
  address!: string;

  @Column()
  dni!: number;

  @OneToOne(() => UserEntity, (user) => user.customer)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.customer)
  invoices!: InvoiceEntity[];
};

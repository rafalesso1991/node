import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../config/base.entity";
import { RoleType } from "../dto/user.dto";
import { CustomerEntity } from "./customer.entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  lastname!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  city!: string;

  @Column()
  province!: string;

  @Column({ type: "enum", enum: RoleType })
  role!: string;

  @OneToOne(() => CustomerEntity, (customer) => customer.user)
  customer!: CustomerEntity;
};

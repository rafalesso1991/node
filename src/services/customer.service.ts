import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { CustomerEntity } from "../entities/customer.entity";
import { CustomerDTO } from "../dto/customer.dto";
import { UserService } from "../services/user.service";

export class CustomerService extends BaseService<CustomerEntity> {
  constructor(private readonly userService: UserService = new UserService()) {
    super(CustomerEntity);
  };
  // FIND ALL CUSTOMERS
  async findAllCustomers(): Promise<CustomerEntity[]> {
    return (await this.execRepository).find();
  };
  // FIND CUSTOMER BY ID
  async findCustomerById(id: string): Promise<CustomerEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  };
  // CREATE CUSTOMER
  async createCustomer(body: CustomerDTO): Promise<CustomerEntity | null> {
    const createCustomer = (await this.execRepository).create(body);
    const user = await this.userService.findUserById(createCustomer.user.id);
    if (user) {
      await this.userService.updateUser(user.id, { ...user });
      return (await this.execRepository).save(body);
    };
    return null;
  };
  // DELETE CUSTOMER
  async deleteCustomer(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  };
  // UPDATE CUSTOMER
  async updateCustomer(id: string, infoUpdate: CustomerDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  };
};

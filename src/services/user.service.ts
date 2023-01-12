import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserService extends BaseService<UserEntity> {
    constructor() {
      super(UserEntity);
    };
    // FIND ALL USERS
    async findAllUser(): Promise<UserEntity[]> {
        return (await this.execRepository).find();
    };
    // FIND USER BY ID
    async findUserById(id: string): Promise<UserEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    };
    // CREATE USER
    async createUser(body: UserDTO): Promise<UserEntity> {
        const newUser = (await this.execRepository).create(body);
        return (await this.execRepository).save(newUser);
    };
    // DELETE USER
    async deleteUser(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    };
    // UPDATE USER
    async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    };
};

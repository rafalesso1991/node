import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { ProductDTO } from "../dto/product.dto";
import { ProductEntity } from "../entities/product.entity";

export class ProductService extends BaseService<ProductEntity> {
    constructor() {
        super(ProductEntity);
    };
    // FIND ALL PRODUCTS
    async findAllProducts(): Promise<ProductEntity[]> {
        return (await this.execRepository).find();
    };
    // FIND PRODUCT BY ID
    async findProductById(id: string): Promise<ProductEntity | null> {
        return (await this.execRepository).findOneBy({ id });
    };
    // CREATE PRODUCT
    async createProduct(body: ProductDTO): Promise<ProductEntity> {
        return (await this.execRepository).save(body);
    };
    // DELETE PRODUCT
    async deleteProduct(id: string): Promise<DeleteResult> {
        return (await this.execRepository).delete({ id });
    };
    // UPDATE PRODUCT
    async updateProduct(id: string, infoUpdate: ProductDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, infoUpdate);
    };
};

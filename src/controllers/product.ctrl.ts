import { Request, Response } from "express";
import { HttpResponse } from "../shared/http.response";
import { ProductService } from "../services/product.service";
import { DeleteResult, UpdateResult } from "typeorm";

export class ProductController {
    constructor(
        private readonly productService: ProductService = new ProductService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {};
    // GET ALL PRODUCTS
    async getProducts(req: Request, res: Response) {
        try {
            const data = await this.productService.findAllProducts();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existen datos en la tabla productos");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(e);
            return this.httpResponse.Error(res, e);
        };
    };
    // GET PRODUCT BY ID
    async getProductById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.productService.findProductById(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe producto con ese id");
            }
                return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(res, e);
            return this.httpResponse.Error(res, e);
        };
    };
    // CREATE PRODUCT
    async createProduct(req: Request, res: Response) {
        try {
            const data = await this.productService.createProduct(req.body);
            return this.httpResponse.Ok(res, data);
            } catch (e) {
            console.error(res, e);
            return this.httpResponse.Error(res, e);
        };
    };
    // DELETE PRODUCT
    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;
        try {
                const data: DeleteResult = await this.productService.deleteProduct(id);
                res.status(200).json(data);
                if (!data.affected) {
                    return this.httpResponse.NotFound(res, "No se ha podido borrar el producto");
                }
                return this.httpResponse.Ok(res, data);
            } catch (e) {
                console.error(res, e);
            return this.httpResponse.Error(res, e);
        };
    };
    // UPDATE PRODUCT
    async updateProduct(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const data: UpdateResult = await this.productService.updateProduct(id, req.body);
        if (!data.affected) {
            return this.httpResponse.NotFound(res, "No se ha podido actualizar el producto");
        }
        return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(res, e);
            return this.httpResponse.Error(res, e);
        };
    };
};

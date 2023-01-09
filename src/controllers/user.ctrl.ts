import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../shared/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class UserController {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {};
    // GET ALL USERS
    async getUsers(req: Request, res: Response) {
        try {
            const data = await this.userService.findAllUser();
            if (data.length === 0) {
                return this.httpResponse.NotFound(res, "No existen usuarios registrados aún");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        };
    };
    // GET USER BY ID
    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.userService.findUserById(id);
            if (!data) {
                return this.httpResponse.NotFound(res, "No existe un usuario registrado con ese id");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        };
    };
    // CREATE USER
    async createUser(req: Request, res: Response) {
        try {
            const data = await this.userService.createUser(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(res, e);
            return this.httpResponse.Error(res, e);
        };
    };
    // DELETE USER
    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: DeleteResult = await this.userService.deleteUser(id);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "No se ha podido borrar el usuario");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(res, e);
            return this.httpResponse.Error(res, e);
        };
    };
    // UPDATE USER
    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: UpdateResult = await this.userService.updateUser(id, req.body);
            if (!data.affected) {
                return this.httpResponse.NotFound(res, "No se ha podido actualizar el usuario");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error(res, e);
            return this.httpResponse.Error(res, e);
        };
    };
};
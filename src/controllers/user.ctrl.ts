import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpResponse } from "../shared/http.response";
import { DeleteResult, UpdateResult } from "typeorm";

export class UserController {
    constructor(
        private readonly userService: UserService = new UserService()
    ) {};
    // GET ALL USERS
    async getUsers(req: Request, res: Response) {
        try {
            const data = await this.userService.findAllUser()
            res.status(200).json(data)
        } catch (e) {
            return console.error(res, e);
        };
    };
    // GET USER BY ID
    async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data = await this.userService.findUserById(id)
            res.status(200).json(data)
        } catch (e) {
            return console.error(res, e);
        };
    };
    // CREATE USER
    async createUser(req: Request, res: Response) {
        try {
            const data = await this.userService.createUser(req.body)
            res.status(200).json(data)
        } catch (e) {
            return console.error(res, e);
        };
    };
    // DELETE USER
    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: DeleteResult = await this.userService.deleteUser(id)
            res.status(200).json(data)
        } catch (e) {
            return console.error(res, e);
        };
    };
    // UPDATE USER
    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: UpdateResult = await this.userService.updateUser(id, req.body)
            res.status(200).json(data)
        } catch (e) {
            return console.error(res, e);
        };
    };
};

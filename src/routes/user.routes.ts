import { BaseRouter } from "../shared/router";
import { UserController } from "../controllers/user.ctrl";
import { UserMiddleware } from "../middlewares/user.mw";
export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
    constructor() {
        super(UserController, UserMiddleware);
    };
    routes(): void {
        this.router.get("/users", (req, res) => this.controller.getUsers(req, res));
        this.router.get("/user/:id", (req, res) => this.controller.getUserById(req, res));
        this.router.get("/userRelation/:id", (req, res) => this.controller.getUserWithRelation(req, res));
        this.router.post(
            "/createUser",
            (req, res, next) => [this.middleware.userValidator(req, res, next)],
            (req, res) => this.controller.createUser(req, res)
        );
        this.router.delete("/deleteUser/:id", (req, res) => this.controller.deleteUser(req, res));
        this.router.put("/updateUser/:id", (req, res) => this.controller.updateUser(req, res));
    };
};

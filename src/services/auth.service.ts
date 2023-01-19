import { ConfigServer } from "../config/config";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserService } from "./user.service";
import { UserEntity } from "../entities/user.entity";
import { PayloadToken } from "../interfaces/auth.interface";

export class AuthService extends ConfigServer {
    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly jwtInstance = jwt
    ) {
        super();
    }
    public async validateUser(username: string, password: string): Promise<UserEntity | null> {
        const userByEmail = await this.userService.findUserByEmail(username);
        const userByUsername = await this.userService.findUserByUsername(username);
        if(userByEmail){
            const isMatch = await bcrypt.compare(password, userByEmail.password);
            isMatch && userByEmail;
        }
        if(userByUsername){
            const isMatch = await bcrypt.compare(password, userByUsername.password);
            isMatch && userByUsername;
        }
        return null;
    }
    sign(payload: jwt.JwtPayload, secret: any){
        return this.jwtInstance.sign(payload, secret, { expiresIn: "1h" });
    }
    public async generateJWT(user: UserEntity): Promise<{ accessToken: string; user: UserEntity }>{
        const userConsult = await this.userService.findUserWithRole(
            user.id,
            user.role
        )
        const payload: PayloadToken = {
            role: userConsult!.role,
            sub: userConsult!.id
        }
        if (userConsult) {
            user.password = "Usuario no autorizado";
        }
        return {
            accessToken: this.sign(payload, this.getEnvironment("JWT_SECRET")),
            user
        }
    }
};

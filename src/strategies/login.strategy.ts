import { Strategy, VerifyFunction } from "passport-local";
import { UserEntity } from "../entities/user.entity";
import { AuthService } from "../services/auth.service";
import { passportUse } from "../utils/passport.use";

const authService: AuthService = new AuthService();

export class LoginStrategy {
    async validate(
        username: string,
        password: string,
        done: any
    ): Promise<UserEntity> {
        const user = await authService.validateUser(username, password);
        if(!user) {
            return done(null, false, {message: "usuario o contraseña inválidos"})
        }
        return done(null, user)
    }
    get use(){
        return passportUse<Strategy, Object, VerifyFunction>(
            "login",
            Strategy,
            {
                usernameField: "username",
                passwordField: "password"
            },
            this.validate
        )
    }
}
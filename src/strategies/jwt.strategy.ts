import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import { PayloadToken } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.service";
import { passportUse } from "../utils/passport.use";

export class JwtStrategy extends AuthService {
    constructor() {
        super();
    }
    async validate(payload: PayloadToken, done: any) {
        return done(null, payload);
    }

    get use() {
        return passportUse<
            Strategy,
            StrategyOptions,
            (payload: PayloadToken, done: any) => Promise<PayloadToken>
            >(
                "jwt",
                Strategy,
                {
                    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                    secretOrKey: this.getEnvironment("JWT_SECRET"),
                    ignoreExpiration: false
                },
                this.validate
            )
    }
}
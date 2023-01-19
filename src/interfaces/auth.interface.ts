import { RoleType } from "../dto/user.dto";

export interface PayloadToken {
    role: RoleType,
    sub: string
};

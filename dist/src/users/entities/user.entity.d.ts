import { Roles } from "src/utility/common/user-role.enum";
import { Timestamp } from "typeorm";
export declare class User {
    id: number;
    username: string;
    name: string;
    email: string;
    password: string;
    roles: Roles[];
    create_at: Timestamp;
    updated_at: Timestamp;
}

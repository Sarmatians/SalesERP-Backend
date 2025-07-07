import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
declare module 'express' {
    interface Request {
        currentUser?: User;
    }
}
export declare class CurrentUserMiddleware implements NestMiddleware {
    private readonly usersService;
    constructor(usersService: UsersService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}

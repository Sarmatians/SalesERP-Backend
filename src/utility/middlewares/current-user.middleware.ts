/* eslint-disable prettier/prettier */

import { Injectable, NestMiddleware } from '@nestjs/common';
// import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
// import { User } from 'src/users/entities/user.entity';

// declare module 'express-serve-static-core' {
//     interface Request {
//         currentUser?: User;
//     }
// }

// declare global {
//     namespace Express {
//         interface Request {
//             currentUser?: User;
//         }
//     }
// }

declare module 'express' {
    interface Request {
        currentUser?: User;
    }
}


@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (!authHeader || Array.isArray(authHeader) || !authHeader.startsWith('Token ')) {
            console.error('No valid token provided');
            req.currentUser = null;
            return next();
        }

        try {
            const token = authHeader.split(' ')[1]; 
            console.log('Extracted Token:', token);

            const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload;
            console.log('Decoded Token:', decoded);

            const currentUser = await this.usersService.findOne(+decoded.id);
            if (!currentUser) {
                console.error('User not found');
                req.currentUser = null;
                return next();
            }

            req.currentUser = currentUser;
            console.log('Authenticated User:', currentUser);

            next();
        } catch (error) {
            console.error('Token verification failed:', error.message);
            req.currentUser = null;
            next();
        }
    }
}


interface JwtPayload {
    id: string;
}
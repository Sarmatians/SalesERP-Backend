import { ExecutionContext } from '@nestjs/common';
export declare const AuthorizedGuard: (allowedRoles: string[]) => import("@nestjs/common").Type<{
    canActivate(context: ExecutionContext): boolean;
}>;

/* eslint-disable prettier/prettier */

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException  } from '@nestjs/common';
import { Request } from 'express';


@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    console.log("REQUEST",request)

    if (!request.currentUser) {
      throw new UnauthorizedException('User is not authenticated');
    }
    console.log("REQUEST",request)
    return true;
  }
}

// @Injectable()
// export class AuthenticationGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean {
//     const request = context.switchToHttp().getRequest();
//     if (!request.CurrentUser) {
//         console.error('Authentication failed: No user attached');
//         throw new UnauthorizedException('User is not authenticated');
//       }
//     // return request.CurrentUser;
//     console.log('User authenticated:', request.CurrentUser);
//     return true;
//   }
// }

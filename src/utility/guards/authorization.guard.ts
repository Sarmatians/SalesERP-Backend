/* eslint-disable prettier/prettier */

import { 
  // Injectable, 
  CanActivate, ExecutionContext, UnauthorizedException, mixin } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { CurrentUser } from './../decorators/current-user.decorator';
// import { Request } from 'express';


//  ####### IF @AuthorizedRoles(Roles.ADMIN) is used in controller, then use this code ####### 
// @Injectable()
// export class AuthorizedGuard implements CanActivate {
//     constructor(private reflector:Reflector) {}
//   canActivate(context: ExecutionContext): boolean {
//     const allowedRoles = this.reflector.get<string[]>('allowedRoles', context.getHandler());
//     const request = context.switchToHttp().getRequest();
//     const result = request?.currentUser?.roles.map((role:string)=>allowedRoles.includes(role)).find((val:boolean)=>val===true);
//     if(result) return true;

//     throw new UnauthorizedException('Sorry, You Are Not Authorized');
//   }

// }

export const AuthorizedGuard =  (allowedRoles:string[]) => {
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const result = request?.currentUser?.roles.map((role:string)=>allowedRoles.includes(role)).find((val:boolean)=>val===true);
      if(result) return true;
      throw new UnauthorizedException('Sorry, You Are Not Authorized');

    }
  }
  const guard = mixin(RolesGuardMixin);
  return guard;
}


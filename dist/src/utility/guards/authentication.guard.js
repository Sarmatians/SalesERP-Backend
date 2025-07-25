"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationGuard = void 0;
const common_1 = require("@nestjs/common");
let AuthenticationGuard = class AuthenticationGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        console.log("REQUEST", request);
        if (!request.currentUser) {
            throw new common_1.UnauthorizedException('User is not authenticated');
        }
        console.log("REQUEST", request);
        return true;
    }
};
exports.AuthenticationGuard = AuthenticationGuard;
exports.AuthenticationGuard = AuthenticationGuard = __decorate([
    (0, common_1.Injectable)()
], AuthenticationGuard);
//# sourceMappingURL=authentication.guard.js.map
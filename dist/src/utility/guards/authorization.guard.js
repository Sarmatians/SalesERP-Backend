"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizedGuard = void 0;
const common_1 = require("@nestjs/common");
const AuthorizedGuard = (allowedRoles) => {
    class RolesGuardMixin {
        canActivate(context) {
            const request = context.switchToHttp().getRequest();
            const result = request?.currentUser?.roles.map((role) => allowedRoles.includes(role)).find((val) => val === true);
            if (result)
                return true;
            throw new common_1.UnauthorizedException('Sorry, You Are Not Authorized');
        }
    }
    const guard = (0, common_1.mixin)(RolesGuardMixin);
    return guard;
};
exports.AuthorizedGuard = AuthorizedGuard;
//# sourceMappingURL=authorization.guard.js.map
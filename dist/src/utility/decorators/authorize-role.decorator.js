"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizedRoles = void 0;
const common_1 = require("@nestjs/common");
const AuthorizedRoles = (...roles) => (0, common_1.SetMetadata)('allowedRoles', roles);
exports.AuthorizedRoles = AuthorizedRoles;
//# sourceMappingURL=authorize-role.decorator.js.map
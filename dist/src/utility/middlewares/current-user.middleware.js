"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const users_service_1 = require("../../users/users.service");
let CurrentUserMiddleware = class CurrentUserMiddleware {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async use(req, res, next) {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader || Array.isArray(authHeader) || !authHeader.startsWith('Token ')) {
            console.error('No valid token provided');
            req.currentUser = null;
            return next();
        }
        try {
            const token = authHeader.split(' ')[1];
            console.log('Extracted Token:', token);
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET);
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
        }
        catch (error) {
            console.error('Token verification failed:', error.message);
            req.currentUser = null;
            next();
        }
    }
};
exports.CurrentUserMiddleware = CurrentUserMiddleware;
exports.CurrentUserMiddleware = CurrentUserMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], CurrentUserMiddleware);
//# sourceMappingURL=current-user.middleware.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async signup(userSignupDto) {
        const userExist = await this.findUserByEmail(userSignupDto.email);
        if (userExist)
            throw new common_1.BadRequestException('Email already exist');
        userSignupDto.password = await (0, bcrypt_1.hash)(userSignupDto.password, 10);
        const user = this.usersRepository.create(userSignupDto);
        return await this.usersRepository.save(user);
    }
    async signin(userSigninDto) {
        const userExist = await this.usersRepository.createQueryBuilder('User').addSelect('User.password').where('User.email = :email', { email: userSigninDto.email }).getOne();
        if (!userExist)
            throw new common_1.BadRequestException('Email is incorrect');
        const checkPassword = await (0, bcrypt_1.compare)(userSigninDto.password, userExist.password);
        if (!checkPassword)
            throw new common_1.BadRequestException('Password is incorrect');
        delete userExist.password;
        const accessToken = await this.accessToken(userExist);
        return {
            is_authenticated: true,
            userInfo: {
                token: accessToken,
                user_info: userExist,
            },
        };
    }
    create(createUserDto) {
        return 'This action adds a new user';
    }
    async findAll() {
        return await this.usersRepository.find();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    async findUserByEmail(email) {
        return await this.usersRepository.findOneBy({ email });
    }
    async accessToken(user) {
        return (0, jsonwebtoken_1.sign)({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserSigninDto } from './dto/user-signin.dto';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(userSignupDto: UserSignupDto): Promise<User>;
    signin(userSigninDto: UserSigninDto): Promise<{
        is_authenticated: boolean;
        userInfo: {
            token: string;
            user_info: User;
        };
    }>;
    create(createUserDto: CreateUserDto): string;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
    getProfile(currentUser: User): User;
}

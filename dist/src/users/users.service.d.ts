import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserSigninDto } from './dto/user-signin.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
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
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    findUserByEmail(email: string): Promise<User>;
    accessToken(user: User): Promise<string>;
}

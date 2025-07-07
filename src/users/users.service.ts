/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserSigninDto } from './dto/user-signin.dto';

import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signup(userSignupDto: UserSignupDto): Promise<User> {
    const userExist = await this.findUserByEmail(userSignupDto.email);
    if(userExist) throw new BadRequestException('Email already exist');
    userSignupDto.password = await hash(userSignupDto.password, 10);
    const user = this.usersRepository.create(userSignupDto);
    return await this.usersRepository.save(user);
  }

  async signin(userSigninDto: UserSigninDto) {
    // Check User
    const userExist = await this.usersRepository.createQueryBuilder('User').addSelect('User.password').where('User.email = :email', {email: userSigninDto.email}).getOne();
    if (!userExist) throw new BadRequestException('Email is incorrect');
    // Check Password
    const checkPassword = await compare(userSigninDto.password, userExist.password);
    if (!checkPassword) throw new BadRequestException('Password is incorrect');
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


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  // Find all user
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // Find Single user
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({id});
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // Email Check
  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({email});

  }

  // Access Token
  async accessToken(user: User) {
  //   return sign({id: user.id, email: user.email}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME});
  return sign(
    {id: user.id, email: user.email}, 
    process.env.ACCESS_TOKEN_SECRET,
    // {expiresIn: '1h'}
  );
  }

}
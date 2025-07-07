/* eslint-disable prettier/prettier */

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserSigninDto } from './dto/user-signin.dto';
import { User } from './entities/user.entity';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
// import { AuthorizedRoles } from 'src/utility/decorators/authorize-role.decorator';
import { Roles } from 'src/utility/common/user-role.enum';
import { AuthorizedGuard } from 'src/utility/guards/authorization.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() userSignupDto: UserSignupDto): Promise<User> {
    console.log(userSignupDto);
    return await this.usersService.signup(userSignupDto);
  }
  
  @Post('signin')
  async signin(@Body() userSigninDto: UserSigninDto) {
      return await this.usersService.signin(userSigninDto);
  }

  // @Post('signin')
  // async signin(@Body() userSigninDto: UserSigninDto){
  //   const user =  await this.usersService.signin(userSigninDto);
  //   const accessToken = await this.usersService.accessToken(user);
  //   return {
  //     is_authenticated: true,
  //     userInfo: {
  //         token: accessToken,
  //         user: user
  //     }
  // };
  // }


  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
    // return 'hi';
  }

    // Get All User as Authorized
    // @AuthorizedRoles(Roles.ADMIN)
    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN]))
    @Get('all')
    async findAll(): Promise<User[]> {
      return await this.usersService.findAll();
    }

  // Get All User
  // @Get()
  // async findAll(): Promise<User[]> {
  //   return await this.usersService.findAll();
  // }

  // Single User
  @Get('single/:id')
  async findOne(@Param('id') id: string):Promise<User> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  getProfile(@CurrentUser() currentUser: User) {
    return currentUser;

  }



}

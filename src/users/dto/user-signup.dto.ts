/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignupDto{

    @IsNotEmpty({message: 'Name is required'})
    @IsString({message: 'Name must be a string'})
    name: string;

    @IsNotEmpty({message: 'email is required'})
    @IsEmail({},{message: 'Add a valid Email'})
    email: string;

    @IsNotEmpty({message: 'username is required'})
    @IsString({message: 'username must be a string'})
    username: string;


    @IsNotEmpty({message: 'password is required'})
    @MinLength(5,{message: 'password must be a minimum 5 digits'})
    password: string;

}
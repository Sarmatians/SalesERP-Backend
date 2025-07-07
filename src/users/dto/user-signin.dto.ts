/* eslint-disable prettier/prettier */


import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class UserSigninDto {

    @IsNotEmpty({message: 'email is required'})
    @IsEmail({},{message: 'Add a valid Email'})
    email: string;

    @IsNotEmpty({message: 'password is required'})
    @MinLength(5,{message: 'password must be a minimum 5 digits'})
    password: string;


}
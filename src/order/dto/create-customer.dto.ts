/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsString()
  address?: string;
}

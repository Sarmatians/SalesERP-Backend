/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  designationId: number;
}

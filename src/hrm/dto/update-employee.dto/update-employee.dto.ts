/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class UpdateEmployeeDto {
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  phone?: string;

  @IsNotEmpty()
  designationId?: number;
}

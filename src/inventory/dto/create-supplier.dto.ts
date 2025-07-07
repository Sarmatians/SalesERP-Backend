/* eslint-disable prettier/prettier */

import { IsDecimal, IsOptional, IsString, IsEmail, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSupplierDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  emergency_contact?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  Type?: string;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @IsDecimal()
  account_balance?: number;

  @IsOptional()
  @IsDecimal()
  totalAmount?: number;

  @IsOptional()
  @IsDecimal()
  dueAmount?: number;

  @IsOptional()
  @IsDecimal()
  paidAmount?: number;

  @IsOptional()
  @IsString()
  points?: string;

  @IsOptional()
  @IsString()
  Special_Date_Type?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  special_dates?: Date;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsBoolean()
  is_wholesale?: boolean;

  @IsOptional()
  data?: any;
}


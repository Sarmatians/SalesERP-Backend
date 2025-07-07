/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsNumber()
  parentCategoryId?: number; 
}
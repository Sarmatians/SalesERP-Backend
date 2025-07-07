/* eslint-disable prettier/prettier */


import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAttributeItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsNumber()
  attributeId: number; 
}
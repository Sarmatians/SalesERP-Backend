/* eslint-disable prettier/prettier */


import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttributeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;
}
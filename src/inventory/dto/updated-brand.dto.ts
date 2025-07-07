/* eslint-disable prettier/prettier */


import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBrandDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;
}
/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;
}
/* eslint-disable prettier/prettier */

import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class QueryInventoryDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  search?: string;
}

/* eslint-disable prettier/prettier */

import { IsOptional, IsString, IsNumberString, IsIn } from 'class-validator';

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

  @IsOptional()
  @IsIn(['true', 'false', 'all'])
  is_active?: 'true' | 'false' | 'all';

  @IsOptional()
  @IsString()
  barcode?: string;  
}

/* eslint-disable prettier/prettier */

import { IsEnum, IsInt, IsOptional,  } from 'class-validator';

export class UpdateItemEntryDto {
  @IsOptional()
  @IsEnum(['created', 'updated'])
  action?: 'created' | 'updated';

  @IsOptional()
  @IsInt()
  quantityChanged?: number;

  @IsOptional()
  @IsInt()
  currentQuantity?: number;
}

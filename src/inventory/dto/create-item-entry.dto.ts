/* eslint-disable prettier/prettier */

import { IsEnum, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateItemEntryDto {
  @IsNotEmpty()
  @IsNumber()
  itemId: number;

  @IsNotEmpty()
  @IsEnum(['created', 'updated'])
  action: 'created' | 'updated';

  @IsNotEmpty()
  @IsInt()
  quantityChanged: number;

  @IsNotEmpty()
  @IsInt()
  currentQuantity: number;
}

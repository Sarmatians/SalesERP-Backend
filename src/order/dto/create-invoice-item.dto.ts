/* eslint-disable prettier/prettier */

import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateInvoiceItemDto {
  // @IsString()
  // item_id: string;

  @IsString()
  item_name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  sales_discount: number;

  @IsNumber()
  qty: number;

  @IsBoolean()
  is_returned: boolean;

  @IsBoolean()
  is_refund: boolean;

  @IsString()
  item_variation_id: string;
  
}

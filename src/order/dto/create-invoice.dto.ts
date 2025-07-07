/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateInvoiceItemDto } from './create-invoice-item.dto';

export class CreateInvoiceDto {
  @IsString()
  inv_no: string;

  @IsNumber()
  bill: number;

  @IsNumber()
  discount: number;

  @IsNumber()
  paid_amount: number;

  @IsNumber()
  due_amount: number;

  @IsNumber()
  grand_total: number;

  @IsString()
  status: string;

  @IsNumber()
  vat: number;

  @IsString()
  shipping_address: string;

  @IsString()
  order_type: string;

  @IsNumber()
  delivery_charge: number;

  @IsNumber()
  delivery_cost: number;

  @IsString()
  customer_id: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items: CreateInvoiceItemDto[];

  @IsString()
  remarks: string;
}

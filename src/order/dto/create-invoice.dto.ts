/* eslint-disable prettier/prettier */

import {IsString, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateInvoiceItemDto } from './create-invoice-item.dto';

export class CreateInvoiceDto {
  @IsOptional()
  @IsString()
  inv_no: string;

  @IsOptional()
  @IsNumber()
  bill: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsNumber()
  paid_amount: number;

  @IsOptional()
  @IsNumber()
  due_amount: number;

  @IsOptional()
  @IsNumber()
  grand_total: number;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsNumber()
  vat: number;

  @IsOptional()
  @IsString()
  shipping_address: string;

  @IsOptional()
  @IsString()
  order_type: string;

  @IsOptional()
  @IsNumber()
  delivery_charge: number;

  @IsOptional()
  @IsNumber()
  delivery_cost: number;

  @IsOptional()
  @IsString()
  customer_id: string;

  // @IsNotEmpty()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  items: CreateInvoiceItemDto[];

  @IsOptional()
  @IsString ()
  remarks: string;
}

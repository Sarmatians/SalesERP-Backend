/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  sku?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  purchasePrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sellingPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  discountPrice?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsNumber()
  locationId?: number;
  
  @IsOptional() 
  @IsNumber()
  supplierId?: number; 

  @IsOptional() 
  @IsNumber()
  lotId?: number;

  @IsOptional()
  @IsNumber()
  brandId?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  attributeIds?: number[];

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  relatedItemIds?: number[];

  @IsOptional()
  @IsBoolean()
  is_variant?: boolean = false;
  
  @IsOptional()
  @Type(() => Date)
  add_date?: Date;

  @IsOptional()
  @IsString()
  Supplier_InvoiceNo?: string;

}
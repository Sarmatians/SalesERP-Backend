/* eslint-disable prettier/prettier */
import { IsNumber, IsString, IsDateString, IsArray, IsOptional } from 'class-validator';

export class CreateItemVariationDto {
  @IsNumber()
  itemId: number;

  @IsOptional()
  @IsArray()
  attributeItemIds: number[];

  @IsOptional()
  @IsNumber()
  locationId: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  created?: string;
  
  @IsOptional()
  @IsNumber()
  quantity: number;
  
  @IsOptional()
  @IsNumber()
  purchasePrice: number;

  @IsOptional()
  @IsNumber()
  sellingPrice: number;

  @IsOptional()
  @IsNumber()
  discountPrice?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

}

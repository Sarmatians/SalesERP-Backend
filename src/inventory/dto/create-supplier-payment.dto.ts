/* eslint-disable prettier/prettier */

import { IsNumber, IsString, IsOptional, Min, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSupplierPaymentDto {
  @IsNumber()
  @Type(() => Number)
  supplierId: number;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  supplierInvoiceNo: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  paymentMethod: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @Min(0.01, { message: 'Paid amount must be at least 0.01' })
  paidAmount: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  notes?: string;
}

/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class CreateLotDto {
  @IsOptional()
  @IsString()
  lot_no?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  total_quantity?: number;
}

/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateDesignationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  departmentId: number;
}

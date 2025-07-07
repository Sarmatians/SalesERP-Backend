/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class UpdateDesignationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  departmentId: number;
}


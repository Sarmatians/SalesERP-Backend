/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty()
  name: string;
}
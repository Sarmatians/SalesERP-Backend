/* eslint-disable prettier/prettier */

import { IsNotEmpty } from 'class-validator';

export class UpdateDepartmentDto {
  @IsNotEmpty()
  name: string;
}
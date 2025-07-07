/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HrmService } from './hrm.service';
import { HrmController } from './hrm.controller';
import { Department } from './entities/department.entity/department.entity';
import { Designation } from './entities/designation.entity/designation.entity';
import { Employee } from './entities/employee.entity/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Designation, Employee])],
  controllers: [HrmController],
  providers: [HrmService]
})
export class HrmModule {}

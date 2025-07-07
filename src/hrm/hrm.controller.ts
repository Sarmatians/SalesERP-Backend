/* eslint-disable prettier/prettier */


import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { HrmService } from './hrm.service';

import { CreateDepartmentDto} from './dto/create-department.dto/create-department.dto';
import { UpdateDepartmentDto,} from './dto/update-department.dto/update-department.dto';

import { CreateDesignationDto} from './dto/create-designation.dto/create-designation.dto';
import { UpdateDesignationDto,} from './dto/update-designation.dto/update-designation.dto';

import { CreateEmployeeDto} from './dto/create-employee.dto/create-employee.dto';
import { UpdateEmployeeDto,} from './dto/update-employee.dto/update-employee.dto';

import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { Roles } from 'src/utility/common/user-role.enum';
import { AuthorizedGuard } from 'src/utility/guards/authorization.guard';

import { QueryInventoryDto } from '../inventory/dto/PaginationFilter/query-options.dto';



@Controller('hrm')
export class HrmController {
  constructor(private readonly hrmService: HrmService) {}

  // ----- Department Routes -----
    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN])) 
    @Post('departments')
    createDepartment(@Body() dto: CreateDepartmentDto) {
        return this.hrmService.createDepartment(dto);
    }

    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN]))
    @Get('departments')
    findAllDepartments(@Query() query: QueryInventoryDto) {
    return this.hrmService.findAllDepartments(query);
    }

    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN])) 
    @Patch('departments/:id')
    updateDepartment(@Param('id') id: string, @Body() dto: UpdateDepartmentDto) {
        return this.hrmService.updateDepartment(+id, dto);
    }

    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN])) 
    @Delete('departments/:id')
    removeDepartment(@Param('id') id: string) {
        return this.hrmService.removeDepartment(+id);
    }

  // ----- Designation Routes -----
    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN])) 
    @Post('designations')
    createDesignation(@Body() dto: CreateDesignationDto) {
    return this.hrmService.createDesignation(dto);
    }

    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN]))
    @Get('designations')
    findAllDesignations(@Query() query: QueryInventoryDto) {
    return this.hrmService.findAllDesignations(query);
    }

    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN])) 
    @Patch('designations/:id')
    updateDesignation(@Param('id') id: string, @Body() dto: UpdateDesignationDto) {
        return this.hrmService.updateDesignation(+id, dto);
    }

    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN])) 
    @Delete('designations/:id')
    removeDesignation(@Param('id') id: string) {
        return this.hrmService.removeDesignation(+id);
    }

  // ----- Employee Routes -----
    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN])) 
    @Post('employees')
    createEmployee(@Body() dto: CreateEmployeeDto) {
        return this.hrmService.createEmployee(dto);
    }

    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN]))
    @Get('employees')
    findAllEmployees(@Query() query: QueryInventoryDto) {
    return this.hrmService.findAllEmployees(query);
    }

    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN])) 
    @Patch('employees/:id')
    updateEmployee(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
        return this.hrmService.updateEmployee(+id, dto);
    }

    @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN])) 
    @Delete('employees/:id')
    removeEmployee(@Param('id') id: string) {
        return this.hrmService.removeEmployee(+id);
    }
    }


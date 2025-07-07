/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { Department } from './entities/department.entity/department.entity';
import { Designation } from './entities/designation.entity/designation.entity';
import { Employee } from './entities/employee.entity/employee.entity';

import { CreateDepartmentDto} from './dto/create-department.dto/create-department.dto';
import { UpdateDepartmentDto,} from './dto/update-department.dto/update-department.dto';

import { CreateDesignationDto} from './dto/create-designation.dto/create-designation.dto';
import { UpdateDesignationDto,} from './dto/update-designation.dto/update-designation.dto';

import { CreateEmployeeDto} from './dto/create-employee.dto/create-employee.dto';
import { UpdateEmployeeDto,} from './dto/update-employee.dto/update-employee.dto';

import { QueryInventoryDto } from '../inventory/dto/PaginationFilter/query-options.dto';


@Injectable()
export class HrmService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,

    @InjectRepository(Designation)
    private designationRepo: Repository<Designation>,

    @InjectRepository(Employee)
    private employeeRepo: Repository<Employee>,
  ) {}

  // ----- ################ Department Methods ################ -----
  createDepartment(dto: CreateDepartmentDto) {
    const dept = this.departmentRepo.create(dto);
    return this.departmentRepo.save(dept);
  }

  async findAllDepartments(query: QueryInventoryDto) {
    const { page = '1', limit = '10', search } = query;
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    const [result, total] = await this.departmentRepo.findAndCount({
      where: search
        ? [{ name: ILike(`%${search}%`) }]
        : {},
      relations: ['designations'],
      take,
      skip,
      order: { id: 'DESC' },
    });

    return {
      success: true,
      message: 'Departments fetched successfully',
      data: {
        meta: {
          page: parseInt(page),
          limit: take,
          total,
          totalPage: Math.ceil(total / take),
        },
        result,
      },
    };
  }

  async updateDepartment(id: number, dto: UpdateDepartmentDto) {
    const dept = await this.departmentRepo.findOneBy({ id });
    if (!dept) throw new NotFoundException('Department not found');
    Object.assign(dept, dto);
    return this.departmentRepo.save(dept);
  }

  async removeDepartment(id: number) {
    const dept = await this.departmentRepo.findOneBy({ id });
    if (!dept) throw new NotFoundException('Department not found');
    return this.departmentRepo.remove(dept);
  }

  // ----- ################ Designation Methods ################ -----
  async createDesignation(dto: CreateDesignationDto) {
    const designation = this.designationRepo.create({
      title: dto.title,
      department: { id: dto.departmentId },
    });
    return this.designationRepo.save(designation);
  }

  async findAllDesignations(query: QueryInventoryDto) {
    const { page = '1', limit = '10', search } = query;
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    const [result, total] = await this.designationRepo.findAndCount({
      where: search
        ? [{ title: ILike(`%${search}%`) }]
        : {},
      relations: ['department', 'employees'],
      take,
      skip,
      order: { id: 'DESC' },
    });

    return {
      success: true,
      message: 'Designations fetched successfully',
      data: {
        meta: {
          page: parseInt(page),
          limit: take,
          total,
          totalPage: Math.ceil(total / take),
        },
        result,
      },
    };
  }

  async updateDesignation(id: number, dto: UpdateDesignationDto) {
    const des = await this.designationRepo.findOneBy({ id });
    if (!des) throw new NotFoundException('Designation not found');
    if (dto.departmentId) des.department = { id: dto.departmentId } as any;
    if (dto.title) des.title = dto.title;
    return this.designationRepo.save(des);
  }

  async removeDesignation(id: number) {
    const des = await this.designationRepo.findOneBy({ id });
    if (!des) throw new NotFoundException('Designation not found');
    return this.designationRepo.remove(des);
  }

  // ----- ################ Employee Methods ################ -----
  async createEmployee(dto: CreateEmployeeDto) {
    const emp = this.employeeRepo.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      designation: { id: dto.designationId },
    });
    return this.employeeRepo.save(emp);
  }

  async findAllEmployees(query: QueryInventoryDto) {
    const { page = '1', limit = '10', search } = query;
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    const [result, total] = await this.employeeRepo.findAndCount({
      where: search
        ? [
            { name: ILike(`%${search}%`) },
            // { lastName: ILike(`%${search}%`) },
            { phone: ILike(`%${search}%`) },
          ]
        : {},
      relations: ['designation'],
      take,
      skip,
      order: { id: 'DESC' },
    });

    return {
      success: true,
      message: 'Employees fetched successfully',
      data: {
        meta: {
          page: parseInt(page),
          limit: take,
          total,
          totalPage: Math.ceil(total / take),
        },
        result,
      },
    };
  }

  async updateEmployee(id: number, dto: UpdateEmployeeDto) {
    const emp = await this.employeeRepo.findOneBy({ id });
    if (!emp) throw new NotFoundException('Employee not found');
    Object.assign(emp, dto);
    if (dto.designationId)
      emp.designation = { id: dto.designationId } as any;
    return this.employeeRepo.save(emp);
  }

  async removeEmployee(id: number) {
    const emp = await this.employeeRepo.findOneBy({ id });
    if (!emp) throw new NotFoundException('Employee not found');
    return this.employeeRepo.remove(emp);
  }
}





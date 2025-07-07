import { Repository } from 'typeorm';
import { Department } from './entities/department.entity/department.entity';
import { Designation } from './entities/designation.entity/designation.entity';
import { Employee } from './entities/employee.entity/employee.entity';
import { CreateDepartmentDto } from './dto/create-department.dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto/update-department.dto';
import { CreateDesignationDto } from './dto/create-designation.dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto/update-designation.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto/update-employee.dto';
import { QueryInventoryDto } from '../inventory/dto/PaginationFilter/query-options.dto';
export declare class HrmService {
    private departmentRepo;
    private designationRepo;
    private employeeRepo;
    constructor(departmentRepo: Repository<Department>, designationRepo: Repository<Designation>, employeeRepo: Repository<Employee>);
    createDepartment(dto: CreateDepartmentDto): Promise<Department>;
    findAllDepartments(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: Department[];
        };
    }>;
    updateDepartment(id: number, dto: UpdateDepartmentDto): Promise<Department>;
    removeDepartment(id: number): Promise<Department>;
    createDesignation(dto: CreateDesignationDto): Promise<Designation>;
    findAllDesignations(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: Designation[];
        };
    }>;
    updateDesignation(id: number, dto: UpdateDesignationDto): Promise<Designation>;
    removeDesignation(id: number): Promise<Designation>;
    createEmployee(dto: CreateEmployeeDto): Promise<Employee>;
    findAllEmployees(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: Employee[];
        };
    }>;
    updateEmployee(id: number, dto: UpdateEmployeeDto): Promise<Employee>;
    removeEmployee(id: number): Promise<Employee>;
}

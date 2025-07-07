import { HrmService } from './hrm.service';
import { CreateDepartmentDto } from './dto/create-department.dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto/update-department.dto';
import { CreateDesignationDto } from './dto/create-designation.dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto/update-designation.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto/update-employee.dto';
import { QueryInventoryDto } from '../inventory/dto/PaginationFilter/query-options.dto';
export declare class HrmController {
    private readonly hrmService;
    constructor(hrmService: HrmService);
    createDepartment(dto: CreateDepartmentDto): Promise<import("./entities/department.entity/department.entity").Department>;
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
            result: import("./entities/department.entity/department.entity").Department[];
        };
    }>;
    updateDepartment(id: string, dto: UpdateDepartmentDto): Promise<import("./entities/department.entity/department.entity").Department>;
    removeDepartment(id: string): Promise<import("./entities/department.entity/department.entity").Department>;
    createDesignation(dto: CreateDesignationDto): Promise<import("./entities/designation.entity/designation.entity").Designation>;
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
            result: import("./entities/designation.entity/designation.entity").Designation[];
        };
    }>;
    updateDesignation(id: string, dto: UpdateDesignationDto): Promise<import("./entities/designation.entity/designation.entity").Designation>;
    removeDesignation(id: string): Promise<import("./entities/designation.entity/designation.entity").Designation>;
    createEmployee(dto: CreateEmployeeDto): Promise<import("./entities/employee.entity/employee.entity").Employee>;
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
            result: import("./entities/employee.entity/employee.entity").Employee[];
        };
    }>;
    updateEmployee(id: string, dto: UpdateEmployeeDto): Promise<import("./entities/employee.entity/employee.entity").Employee>;
    removeEmployee(id: string): Promise<import("./entities/employee.entity/employee.entity").Employee>;
}

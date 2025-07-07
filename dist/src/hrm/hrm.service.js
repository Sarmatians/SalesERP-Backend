"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrmService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("./entities/department.entity/department.entity");
const designation_entity_1 = require("./entities/designation.entity/designation.entity");
const employee_entity_1 = require("./entities/employee.entity/employee.entity");
let HrmService = class HrmService {
    constructor(departmentRepo, designationRepo, employeeRepo) {
        this.departmentRepo = departmentRepo;
        this.designationRepo = designationRepo;
        this.employeeRepo = employeeRepo;
    }
    createDepartment(dto) {
        const dept = this.departmentRepo.create(dto);
        return this.departmentRepo.save(dept);
    }
    async findAllDepartments(query) {
        const { page = '1', limit = '10', search } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        const [result, total] = await this.departmentRepo.findAndCount({
            where: search
                ? [{ name: (0, typeorm_2.ILike)(`%${search}%`) }]
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
    async updateDepartment(id, dto) {
        const dept = await this.departmentRepo.findOneBy({ id });
        if (!dept)
            throw new common_1.NotFoundException('Department not found');
        Object.assign(dept, dto);
        return this.departmentRepo.save(dept);
    }
    async removeDepartment(id) {
        const dept = await this.departmentRepo.findOneBy({ id });
        if (!dept)
            throw new common_1.NotFoundException('Department not found');
        return this.departmentRepo.remove(dept);
    }
    async createDesignation(dto) {
        const designation = this.designationRepo.create({
            title: dto.title,
            department: { id: dto.departmentId },
        });
        return this.designationRepo.save(designation);
    }
    async findAllDesignations(query) {
        const { page = '1', limit = '10', search } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        const [result, total] = await this.designationRepo.findAndCount({
            where: search
                ? [{ title: (0, typeorm_2.ILike)(`%${search}%`) }]
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
    async updateDesignation(id, dto) {
        const des = await this.designationRepo.findOneBy({ id });
        if (!des)
            throw new common_1.NotFoundException('Designation not found');
        if (dto.departmentId)
            des.department = { id: dto.departmentId };
        if (dto.title)
            des.title = dto.title;
        return this.designationRepo.save(des);
    }
    async removeDesignation(id) {
        const des = await this.designationRepo.findOneBy({ id });
        if (!des)
            throw new common_1.NotFoundException('Designation not found');
        return this.designationRepo.remove(des);
    }
    async createEmployee(dto) {
        const emp = this.employeeRepo.create({
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            designation: { id: dto.designationId },
        });
        return this.employeeRepo.save(emp);
    }
    async findAllEmployees(query) {
        const { page = '1', limit = '10', search } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        const [result, total] = await this.employeeRepo.findAndCount({
            where: search
                ? [
                    { name: (0, typeorm_2.ILike)(`%${search}%`) },
                    { phone: (0, typeorm_2.ILike)(`%${search}%`) },
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
    async updateEmployee(id, dto) {
        const emp = await this.employeeRepo.findOneBy({ id });
        if (!emp)
            throw new common_1.NotFoundException('Employee not found');
        Object.assign(emp, dto);
        if (dto.designationId)
            emp.designation = { id: dto.designationId };
        return this.employeeRepo.save(emp);
    }
    async removeEmployee(id) {
        const emp = await this.employeeRepo.findOneBy({ id });
        if (!emp)
            throw new common_1.NotFoundException('Employee not found');
        return this.employeeRepo.remove(emp);
    }
};
exports.HrmService = HrmService;
exports.HrmService = HrmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(1, (0, typeorm_1.InjectRepository)(designation_entity_1.Designation)),
    __param(2, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], HrmService);
//# sourceMappingURL=hrm.service.js.map
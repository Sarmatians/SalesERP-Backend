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
exports.HrmController = void 0;
const common_1 = require("@nestjs/common");
const hrm_service_1 = require("./hrm.service");
const create_department_dto_1 = require("./dto/create-department.dto/create-department.dto");
const update_department_dto_1 = require("./dto/update-department.dto/update-department.dto");
const create_designation_dto_1 = require("./dto/create-designation.dto/create-designation.dto");
const update_designation_dto_1 = require("./dto/update-designation.dto/update-designation.dto");
const create_employee_dto_1 = require("./dto/create-employee.dto/create-employee.dto");
const update_employee_dto_1 = require("./dto/update-employee.dto/update-employee.dto");
const authentication_guard_1 = require("../utility/guards/authentication.guard");
const user_role_enum_1 = require("../utility/common/user-role.enum");
const authorization_guard_1 = require("../utility/guards/authorization.guard");
const query_options_dto_1 = require("../inventory/dto/PaginationFilter/query-options.dto");
let HrmController = class HrmController {
    constructor(hrmService) {
        this.hrmService = hrmService;
    }
    createDepartment(dto) {
        return this.hrmService.createDepartment(dto);
    }
    findAllDepartments(query) {
        return this.hrmService.findAllDepartments(query);
    }
    updateDepartment(id, dto) {
        return this.hrmService.updateDepartment(+id, dto);
    }
    removeDepartment(id) {
        return this.hrmService.removeDepartment(+id);
    }
    createDesignation(dto) {
        return this.hrmService.createDesignation(dto);
    }
    findAllDesignations(query) {
        return this.hrmService.findAllDesignations(query);
    }
    updateDesignation(id, dto) {
        return this.hrmService.updateDesignation(+id, dto);
    }
    removeDesignation(id) {
        return this.hrmService.removeDesignation(+id);
    }
    createEmployee(dto) {
        return this.hrmService.createEmployee(dto);
    }
    findAllEmployees(query) {
        return this.hrmService.findAllEmployees(query);
    }
    updateEmployee(id, dto) {
        return this.hrmService.updateEmployee(+id, dto);
    }
    removeEmployee(id) {
        return this.hrmService.removeEmployee(+id);
    }
};
exports.HrmController = HrmController;
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('departments'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", void 0)
], HrmController.prototype, "createDepartment", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('departments'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], HrmController.prototype, "findAllDepartments", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Patch)('departments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", void 0)
], HrmController.prototype, "updateDepartment", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('departments/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrmController.prototype, "removeDepartment", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('designations'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_designation_dto_1.CreateDesignationDto]),
    __metadata("design:returntype", void 0)
], HrmController.prototype, "createDesignation", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('designations'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], HrmController.prototype, "findAllDesignations", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Patch)('designations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_designation_dto_1.UpdateDesignationDto]),
    __metadata("design:returntype", void 0)
], HrmController.prototype, "updateDesignation", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('designations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrmController.prototype, "removeDesignation", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('employees'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", void 0)
], HrmController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('employees'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], HrmController.prototype, "findAllEmployees", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Patch)('employees/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", void 0)
], HrmController.prototype, "updateEmployee", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('employees/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HrmController.prototype, "removeEmployee", null);
exports.HrmController = HrmController = __decorate([
    (0, common_1.Controller)('hrm'),
    __metadata("design:paramtypes", [hrm_service_1.HrmService])
], HrmController);
//# sourceMappingURL=hrm.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrmModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hrm_service_1 = require("./hrm.service");
const hrm_controller_1 = require("./hrm.controller");
const department_entity_1 = require("./entities/department.entity/department.entity");
const designation_entity_1 = require("./entities/designation.entity/designation.entity");
const employee_entity_1 = require("./entities/employee.entity/employee.entity");
let HrmModule = class HrmModule {
};
exports.HrmModule = HrmModule;
exports.HrmModule = HrmModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([department_entity_1.Department, designation_entity_1.Designation, employee_entity_1.Employee])],
        controllers: [hrm_controller_1.HrmController],
        providers: [hrm_service_1.HrmService]
    })
], HrmModule);
//# sourceMappingURL=hrm.module.js.map
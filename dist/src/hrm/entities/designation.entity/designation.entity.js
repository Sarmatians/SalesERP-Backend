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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Designation = void 0;
const typeorm_1 = require("typeorm");
const department_entity_1 = require("../department.entity/department.entity");
const employee_entity_1 = require("../employee.entity/employee.entity");
let Designation = class Designation {
};
exports.Designation = Designation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Designation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Designation.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, department => department.designations),
    __metadata("design:type", department_entity_1.Department)
], Designation.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.Employee, employee => employee.designation),
    __metadata("design:type", Array)
], Designation.prototype, "employees", void 0);
exports.Designation = Designation = __decorate([
    (0, typeorm_1.Entity)()
], Designation);
//# sourceMappingURL=designation.entity.js.map
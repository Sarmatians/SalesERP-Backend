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
exports.Supplier = void 0;
const typeorm_1 = require("typeorm");
const item_entity_1 = require("../item.entity/item.entity");
let Supplier = class Supplier {
};
exports.Supplier = Supplier;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Supplier.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "emergency_contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "Type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 550, nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 2, default: 0, nullable: true }),
    __metadata("design:type", Number)
], Supplier.prototype, "account_balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true }),
    __metadata("design:type", Number)
], Supplier.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true }),
    __metadata("design:type", Number)
], Supplier.prototype, "dueAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true }),
    __metadata("design:type", Number)
], Supplier.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 550, nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Supplier.prototype, "Special_Date_Type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Supplier.prototype, "special_dates", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, nullable: true }),
    __metadata("design:type", Boolean)
], Supplier.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, nullable: true }),
    __metadata("design:type", Boolean)
], Supplier.prototype, "is_wholesale", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Supplier.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_entity_1.Item, item => item.supplier),
    __metadata("design:type", Array)
], Supplier.prototype, "items", void 0);
exports.Supplier = Supplier = __decorate([
    (0, typeorm_1.Entity)()
], Supplier);
//# sourceMappingURL=supplier.entity.js.map
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
exports.Lot = void 0;
const typeorm_1 = require("typeorm");
const item_entity_1 = require("../item.entity/item.entity");
let Lot = class Lot {
};
exports.Lot = Lot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Lot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(({ nullable: true })),
    __metadata("design:type", String)
], Lot.prototype, "lot_no", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Lot.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Lot.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.Column)(({ nullable: true })),
    __metadata("design:type", Number)
], Lot.prototype, "total_quantity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_entity_1.Item, item => item.lot),
    __metadata("design:type", Array)
], Lot.prototype, "items", void 0);
exports.Lot = Lot = __decorate([
    (0, typeorm_1.Entity)()
], Lot);
//# sourceMappingURL=lot.entity.js.map
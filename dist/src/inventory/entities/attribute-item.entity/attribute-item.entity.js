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
exports.AttributeItem = void 0;
const typeorm_1 = require("typeorm");
const attribute_entity_1 = require("../attribute.entity/attribute.entity");
const item_variation_entity_1 = require("../item-variation.entity/item-variation.entity");
let AttributeItem = class AttributeItem {
};
exports.AttributeItem = AttributeItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AttributeItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AttributeItem.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AttributeItem.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => attribute_entity_1.Attribute, attribute => attribute.items),
    __metadata("design:type", attribute_entity_1.Attribute)
], AttributeItem.prototype, "attribute", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_variation_entity_1.ItemVariation, variation => variation.item),
    __metadata("design:type", Array)
], AttributeItem.prototype, "variations", void 0);
exports.AttributeItem = AttributeItem = __decorate([
    (0, typeorm_1.Entity)()
], AttributeItem);
//# sourceMappingURL=attribute-item.entity.js.map
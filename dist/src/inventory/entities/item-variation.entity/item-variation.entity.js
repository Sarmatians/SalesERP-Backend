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
exports.ItemVariation = void 0;
const typeorm_1 = require("typeorm");
const item_entity_1 = require("../item.entity/item.entity");
const attribute_item_entity_1 = require("../attribute-item.entity/attribute-item.entity");
const location_entity_1 = require("../location.entity/location.entity");
const invoice_item_entity_1 = require("../../../order/entities/invoice-item.entity");
let ItemVariation = class ItemVariation {
    generateBarcode(item, attributes) {
        const lotName = item?.lot?.name || '';
        const sku = item?.sku || '';
        const attrPart = attributes?.length ? attributes.map(a => a.id).join('') : '0';
        return `${lotName}${sku}${attrPart}`;
    }
};
exports.ItemVariation = ItemVariation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ItemVariation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_entity_1.Item, item => item.variations),
    __metadata("design:type", item_entity_1.Item)
], ItemVariation.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => attribute_item_entity_1.AttributeItem, { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], ItemVariation.prototype, "attributes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invoice_item_entity_1.InvoiceItem, invoiceItem => invoiceItem.itemVariation),
    __metadata("design:type", Array)
], ItemVariation.prototype, "invoiceItems", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ItemVariation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ItemVariation.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location, location => location.itemVariations, { nullable: true }),
    __metadata("design:type", location_entity_1.Location)
], ItemVariation.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ItemVariation.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true }),
    __metadata("design:type", Number)
], ItemVariation.prototype, "purchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true }),
    __metadata("design:type", Number)
], ItemVariation.prototype, "sellingPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true }),
    __metadata("design:type", Number)
], ItemVariation.prototype, "discountPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0, nullable: true }),
    __metadata("design:type", Number)
], ItemVariation.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ItemVariation.prototype, "barcode", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], ItemVariation.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ItemVariation.prototype, "is_active", void 0);
exports.ItemVariation = ItemVariation = __decorate([
    (0, typeorm_1.Entity)()
], ItemVariation);
//# sourceMappingURL=item-variation.entity.js.map
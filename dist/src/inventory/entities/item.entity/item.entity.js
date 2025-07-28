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
exports.Item = void 0;
const typeorm_1 = require("typeorm");
const attribute_entity_1 = require("../attribute.entity/attribute.entity");
const tag_entity_1 = require("../tag.entity/tag.entity");
const lot_entity_1 = require("../lot.entity/lot.entity");
const brand_entity_1 = require("../brand.entity/brand.entity");
const location_entity_1 = require("../location.entity/location.entity");
const category_entity_1 = require("../category.entity/category.entity");
const item_variation_entity_1 = require("../item-variation.entity/item-variation.entity");
const supplier_entity_1 = require("../supplier.entity/supplier.entity");
let Item = class Item {
};
exports.Item = Item;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Item.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: true }),
    __metadata("design:type", typeorm_1.Timestamp)
], Item.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ nullable: true }),
    __metadata("design:type", typeorm_1.Timestamp)
], Item.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Item.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true }),
    __metadata("design:type", Number)
], Item.prototype, "purchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true }),
    __metadata("design:type", Number)
], Item.prototype, "sellingPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true }),
    __metadata("design:type", Number)
], Item.prototype, "discountPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Item.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Item.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location, location => location.items, { nullable: true }),
    __metadata("design:type", location_entity_1.Location)
], Item.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lot_entity_1.Lot, lot => lot.items, { nullable: true }),
    __metadata("design:type", lot_entity_1.Lot)
], Item.prototype, "lot", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.Brand, brand => brand.items, { nullable: true }),
    __metadata("design:type", brand_entity_1.Brand)
], Item.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier, supplier => supplier.items, { nullable: true }),
    __metadata("design:type", supplier_entity_1.Supplier)
], Item.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => attribute_entity_1.Attribute, { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Item.prototype, "attributes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, category => category.items, { nullable: true }),
    __metadata("design:type", category_entity_1.Category)
], Item.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.Tag, { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Item.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Item, { nullable: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Item.prototype, "relatedItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_variation_entity_1.ItemVariation, variation => variation.item, { nullable: true }),
    __metadata("design:type", Array)
], Item.prototype, "variations", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false, nullable: true }),
    __metadata("design:type", Boolean)
], Item.prototype, "is_variant", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Item.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Item.prototype, "add_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Item.prototype, "Supplier_InvoiceNo", void 0);
exports.Item = Item = __decorate([
    (0, typeorm_1.Entity)()
], Item);
//# sourceMappingURL=item.entity.js.map
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
exports.InvoiceItem = void 0;
const typeorm_1 = require("typeorm");
const invoice_entity_1 = require("./invoice.entity");
const item_variation_entity_1 = require("../../inventory/entities/item-variation.entity/item-variation.entity");
let InvoiceItem = class InvoiceItem {
};
exports.InvoiceItem = InvoiceItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => invoice_entity_1.Invoice, invoice => invoice.items),
    __metadata("design:type", invoice_entity_1.Invoice)
], InvoiceItem.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_variation_entity_1.ItemVariation, variation => variation.invoiceItems, { eager: true }),
    __metadata("design:type", item_variation_entity_1.ItemVariation)
], InvoiceItem.prototype, "itemVariation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InvoiceItem.prototype, "item_name", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "sales_discount", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "qty", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], InvoiceItem.prototype, "is_returned", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], InvoiceItem.prototype, "is_refund", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], InvoiceItem.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], InvoiceItem.prototype, "updated", void 0);
exports.InvoiceItem = InvoiceItem = __decorate([
    (0, typeorm_1.Entity)()
], InvoiceItem);
//# sourceMappingURL=invoice-item.entity.js.map
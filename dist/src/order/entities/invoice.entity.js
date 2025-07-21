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
exports.Invoice = void 0;
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
const invoice_item_entity_1 = require("./invoice-item.entity");
let Invoice = class Invoice {
};
exports.Invoice = Invoice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Invoice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "inv_no", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Invoice.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Invoice.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "bill", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "paid_amount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "due_amount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "grand_total", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "vat", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "shipping_address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "order_type", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "delivery_charge", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { nullable: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "delivery_cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, customer => customer.invoices),
    __metadata("design:type", customer_entity_1.Customer)
], Invoice.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invoice_item_entity_1.InvoiceItem, item => item.invoice),
    __metadata("design:type", Array)
], Invoice.prototype, "items", void 0);
exports.Invoice = Invoice = __decorate([
    (0, typeorm_1.Entity)()
], Invoice);
//# sourceMappingURL=invoice.entity.js.map
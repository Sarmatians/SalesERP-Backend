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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const create_invoice_dto_1 = require("./dto/create-invoice.dto");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const query_options_dto_1 = require("../inventory/dto/PaginationFilter/query-options.dto");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    createCustomer(dto) {
        return this.orderService.createCustomer(dto);
    }
    getAllCustomers(query) {
        return this.orderService.getAllCustomers(query);
    }
    getCustomer(id) {
        return this.orderService.getCustomerById(+id);
    }
    updateCustomer(id, update) {
        return this.orderService.updateCustomer(+id, update);
    }
    deleteCustomer(id) {
        return this.orderService.deleteCustomer(+id);
    }
    createInvoice(dto) {
        return this.orderService.createInvoice(dto);
    }
    getAllInvoices(query) {
        return this.orderService.getAllInvoices(query);
    }
    getInvoice(id) {
        return this.orderService.getInvoiceById(+id);
    }
    updateInvoice(id, update) {
        return this.orderService.updateInvoice(+id, update);
    }
    deleteInvoice(id) {
        return this.orderService.deleteInvoice(+id);
    }
    getAllInvoiceItems(query) {
        return this.orderService.getAllInvoiceItems(query);
    }
    getInvoiceItem(id) {
        return this.orderService.getInvoiceItemById(+id);
    }
    updateInvoiceItem(id, update) {
        return this.orderService.updateInvoiceItem(+id, update);
    }
    deleteInvoiceItem(id) {
        return this.orderService.deleteInvoiceItem(+id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)('customer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)('customer'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getAllCustomers", null);
__decorate([
    (0, common_1.Get)('customer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getCustomer", null);
__decorate([
    (0, common_1.Put)('customer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Delete)('customer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "deleteCustomer", null);
__decorate([
    (0, common_1.Post)('invoice'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_dto_1.CreateInvoiceDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Get)('invoice'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getAllInvoices", null);
__decorate([
    (0, common_1.Get)('invoice/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getInvoice", null);
__decorate([
    (0, common_1.Put)('invoice/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateInvoice", null);
__decorate([
    (0, common_1.Delete)('invoice/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "deleteInvoice", null);
__decorate([
    (0, common_1.Get)('invoice-item'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getAllInvoiceItems", null);
__decorate([
    (0, common_1.Get)('invoice-item/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getInvoiceItem", null);
__decorate([
    (0, common_1.Put)('invoice-item/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateInvoiceItem", null);
__decorate([
    (0, common_1.Delete)('invoice-item/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "deleteInvoiceItem", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map
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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("./entities/invoice.entity");
const invoice_item_entity_1 = require("./entities/invoice-item.entity");
const customer_entity_1 = require("./entities/customer.entity");
const item_variation_entity_1 = require("../inventory/entities/item-variation.entity/item-variation.entity");
let OrderService = class OrderService {
    constructor(invoiceRepository, invoiceItemRepository, customerRepository, itemVariationRepository) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceItemRepository = invoiceItemRepository;
        this.customerRepository = customerRepository;
        this.itemVariationRepository = itemVariationRepository;
    }
    async getAllCustomers(query) {
        if (!query || (!query.page && !query.limit)) {
            const data = await this.customerRepository.find();
            return {
                success: true,
                message: 'Customers fetched successfully',
                data: {
                    meta: {
                        page: 1,
                        limit: data.length,
                        total: data.length,
                        totalPage: 1,
                    },
                    result: data,
                },
            };
        }
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const [customers, total] = await this.customerRepository.findAndCount({
            relations: [
                'invoices',
            ],
            skip,
            take: limit,
            ...(query.search && {
                where: [
                    { name: (0, typeorm_2.ILike)(`%${query.search}%`) },
                    { email: (0, typeorm_2.ILike)(`%${query.search}%`) },
                ],
            }),
        });
        const totalPage = Math.ceil(total / limit);
        return {
            success: true,
            message: 'Customers fetched successfully',
            data: {
                meta: {
                    page,
                    limit,
                    total,
                    totalPage,
                },
                result: customers,
            },
        };
    }
    async getCustomerById(id) {
        return this.customerRepository.findOne({ where: { id }, relations: ['invoices'] });
    }
    async createCustomer(dto) {
        return this.customerRepository.save(dto);
    }
    async updateCustomer(id, update) {
        await this.customerRepository.update(id, update);
        return this.getCustomerById(id);
    }
    async deleteCustomer(id) {
        await this.customerRepository.delete(id);
        return { deleted: true };
    }
    async getAllInvoices(query) {
        if (!query || (!query.page && !query.limit)) {
            const data = await this.invoiceRepository.find({ relations: ['customer', 'items'] });
            return {
                success: true,
                message: 'Invoices fetched successfully',
                data: {
                    meta: {
                        page: 1,
                        limit: data.length,
                        total: data.length,
                        totalPage: 1,
                    },
                    result: data,
                },
            };
        }
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const queryBuilder = this.invoiceRepository
            .createQueryBuilder('invoice')
            .leftJoinAndSelect('invoice.customer', 'customer')
            .leftJoinAndSelect('invoice.items', 'items');
        if (query.search) {
            queryBuilder.where('(invoice.invoiceNumber ILIKE :search OR customer.name ILIKE :search OR customer.email ILIKE :search)', { search: `%${query.search}%` });
        }
        const [invoices, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        const totalPage = Math.ceil(total / limit);
        return {
            success: true,
            message: 'Invoices fetched successfully',
            data: {
                meta: {
                    page,
                    limit,
                    total,
                    totalPage,
                },
                result: invoices,
            },
        };
    }
    async getInvoiceById(id) {
        return this.invoiceRepository.findOne({ where: { id }, relations: ['customer', 'items'] });
    }
    async createInvoice(createInvoiceDto) {
        try {
            let customer = await this.customerRepository.findOne({
                where: { phone: createInvoiceDto.customer_id },
            });
            if (!customer) {
                customer = this.customerRepository.create({
                    phone: createInvoiceDto.customer_id,
                });
                customer = await this.customerRepository.save(customer);
            }
            const timestamp = new Date();
            const inv_no = `${String(timestamp.getDate()).padStart(2, '0')}${String(timestamp.getMonth() + 1).padStart(2, '0')}${timestamp.getFullYear()}${String(timestamp.getHours()).padStart(2, '0')}${String(timestamp.getMinutes()).padStart(2, '0')}${String(timestamp.getSeconds()).padStart(2, '0')}`;
            const invoice = this.invoiceRepository.create({
                ...createInvoiceDto,
                inv_no,
                customer,
            });
            const savedInvoice = await this.invoiceRepository.save(invoice);
            const items = [];
            if (createInvoiceDto.items && createInvoiceDto.items.length > 0) {
                for (const itemDto of createInvoiceDto.items) {
                    const variation = await this.itemVariationRepository.findOne({
                        where: { id: Number(itemDto.item_variation_id) },
                    });
                    if (!variation) {
                        throw new Error(`Item variation with ID ${itemDto.item_variation_id} not found`);
                    }
                    if (variation.quantity < itemDto.qty) {
                        throw new Error(`Not enough quantity for variation ${variation.id}`);
                    }
                    variation.quantity -= itemDto.qty;
                    await this.itemVariationRepository.save(variation);
                    const invoiceItem = this.invoiceItemRepository.create({
                        ...itemDto,
                        invoice: savedInvoice,
                        itemVariation: variation,
                    });
                    items.push(invoiceItem);
                }
                await this.invoiceItemRepository.save(items);
            }
            return {
                success: true,
                message: 'Invoice created successfully',
                data: {
                    invoice: savedInvoice,
                    items,
                },
            };
        }
        catch (error) {
            console.error('💥 Invoice Creation Error:', error);
            throw new Error(error.message || 'Internal server error');
        }
    }
    async updateInvoice(id, update) {
        await this.invoiceRepository.update(id, update);
        return this.getInvoiceById(id);
    }
    async deleteInvoice(id) {
        await this.invoiceRepository.delete(id);
        return { deleted: true };
    }
    async getAllInvoiceItems(query) {
        if (!query || (!query.page && !query.limit)) {
            const data = await this.invoiceItemRepository.find({ relations: ['invoice', 'itemVariation'] });
            return {
                success: true,
                message: 'Invoice items fetched successfully',
                data: {
                    meta: {
                        page: 1,
                        limit: data.length,
                        total: data.length,
                        totalPage: 1,
                    },
                    result: data,
                },
            };
        }
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const queryBuilder = this.invoiceItemRepository
            .createQueryBuilder('invoiceItem')
            .leftJoinAndSelect('invoiceItem.invoice', 'invoice')
            .leftJoinAndSelect('invoiceItem.itemVariation', 'itemVariation');
        if (query.search) {
            queryBuilder.where(`(itemVariation.name ILIKE :search OR itemVariation.barcode ILIKE :search OR invoice.inv_no ILIKE :search)`, { search: `%${query.search}%` });
        }
        const [invoiceItems, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();
        const totalPage = Math.ceil(total / limit);
        return {
            success: true,
            message: 'Invoice items fetched successfully',
            data: {
                meta: {
                    page,
                    limit,
                    total,
                    totalPage,
                },
                result: invoiceItems,
            },
        };
    }
    async getInvoiceItemById(id) {
        return this.invoiceItemRepository.findOne({ where: { id }, relations: ['invoice', 'item'] });
    }
    async updateInvoiceItem(id, update) {
        await this.invoiceItemRepository.update(id, update);
        return this.getInvoiceItemById(id);
    }
    async deleteInvoiceItem(id) {
        await this.invoiceItemRepository.delete(id);
        return { deleted: true };
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __param(1, (0, typeorm_1.InjectRepository)(invoice_item_entity_1.InvoiceItem)),
    __param(2, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(3, (0, typeorm_1.InjectRepository)(item_variation_entity_1.ItemVariation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map
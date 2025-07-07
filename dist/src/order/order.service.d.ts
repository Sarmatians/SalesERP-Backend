import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { ItemVariation } from '../inventory/entities/item-variation.entity/item-variation.entity';
import { QueryInventoryDto } from '../inventory/dto/PaginationFilter/query-options.dto';
export declare class OrderService {
    private invoiceRepository;
    private invoiceItemRepository;
    private customerRepository;
    private itemVariationRepository;
    constructor(invoiceRepository: Repository<Invoice>, invoiceItemRepository: Repository<InvoiceItem>, customerRepository: Repository<Customer>, itemVariationRepository: Repository<ItemVariation>);
    getAllCustomers(query?: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: Customer[];
        };
    }>;
    getCustomerById(id: number): Promise<Customer>;
    createCustomer(dto: CreateCustomerDto): Promise<CreateCustomerDto & Customer>;
    updateCustomer(id: number, update: Partial<CreateCustomerDto>): Promise<Customer>;
    deleteCustomer(id: number): Promise<{
        deleted: boolean;
    }>;
    getAllInvoices(query?: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: Invoice[];
        };
    }>;
    getInvoiceById(id: number): Promise<Invoice>;
    createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<{
        invoice: Invoice;
        items: InvoiceItem[];
    }>;
    updateInvoice(id: number, update: Partial<CreateInvoiceDto>): Promise<Invoice>;
    deleteInvoice(id: number): Promise<{
        deleted: boolean;
    }>;
    getAllInvoiceItems(query?: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: InvoiceItem[];
        };
    }>;
    getInvoiceItemById(id: number): Promise<InvoiceItem>;
    updateInvoiceItem(id: number, update: Partial<CreateInvoiceItemDto>): Promise<InvoiceItem>;
    deleteInvoiceItem(id: number): Promise<{
        deleted: boolean;
    }>;
}

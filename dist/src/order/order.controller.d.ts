import { OrderService } from './order.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { QueryInventoryDto } from '../inventory/dto/PaginationFilter/query-options.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createCustomer(dto: CreateCustomerDto): Promise<CreateCustomerDto & import("./entities/customer.entity").Customer>;
    getAllCustomers(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: import("./entities/customer.entity").Customer[];
        };
    }>;
    getCustomer(id: string): Promise<import("./entities/customer.entity").Customer>;
    updateCustomer(id: string, update: Partial<CreateCustomerDto>): Promise<import("./entities/customer.entity").Customer>;
    deleteCustomer(id: string): Promise<{
        deleted: boolean;
    }>;
    createInvoice(dto: CreateInvoiceDto): Promise<{
        success: boolean;
        message: string;
        data: {
            invoice: import("./entities/invoice.entity").Invoice;
            items: import("./entities/invoice-item.entity").InvoiceItem[];
        };
    }>;
    getAllInvoices(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: import("./entities/invoice.entity").Invoice[];
        };
    }>;
    getInvoice(id: string): Promise<import("./entities/invoice.entity").Invoice>;
    updateInvoice(id: string, update: Partial<CreateInvoiceDto>): Promise<import("./entities/invoice.entity").Invoice>;
    deleteInvoice(id: string): Promise<{
        deleted: boolean;
    }>;
    getAllInvoiceItems(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: import("./entities/invoice-item.entity").InvoiceItem[];
        };
    }>;
    getInvoiceItem(id: string): Promise<import("./entities/invoice-item.entity").InvoiceItem>;
    updateInvoiceItem(id: string, update: Partial<CreateInvoiceItemDto>): Promise<import("./entities/invoice-item.entity").InvoiceItem>;
    deleteInvoiceItem(id: string): Promise<{
        deleted: boolean;
    }>;
}

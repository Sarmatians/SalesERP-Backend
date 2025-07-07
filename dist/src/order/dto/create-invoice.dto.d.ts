import { CreateInvoiceItemDto } from './create-invoice-item.dto';
export declare class CreateInvoiceDto {
    inv_no: string;
    bill: number;
    discount: number;
    paid_amount: number;
    due_amount: number;
    grand_total: number;
    status: string;
    vat: number;
    shipping_address: string;
    order_type: string;
    delivery_charge: number;
    delivery_cost: number;
    customer_id: string;
    items: CreateInvoiceItemDto[];
    remarks: string;
}

import { Customer } from './customer.entity';
import { InvoiceItem } from './invoice-item.entity';
export declare class Invoice {
    id: number;
    inv_no: string;
    created: Date;
    updated: Date;
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
    remarks: string;
    customer: Customer;
    items: InvoiceItem[];
}

import { Invoice } from './invoice.entity';
import { ItemVariation } from '../../inventory/entities/item-variation.entity/item-variation.entity';
export declare class InvoiceItem {
    id: number;
    invoice: Invoice;
    itemVariation: ItemVariation;
    item_name: string;
    price: number;
    sales_discount: number;
    qty: number;
    is_returned: boolean;
    is_refund: boolean;
    created: Date;
    updated: Date;
}

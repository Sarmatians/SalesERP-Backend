import { Item } from '../item.entity/item.entity';
import { AttributeItem } from '../attribute-item.entity/attribute-item.entity';
import { Location } from '../location.entity/location.entity';
import { InvoiceItem } from '../../../order/entities/invoice-item.entity';
export declare class ItemVariation {
    id: number;
    item: Item;
    attributes: AttributeItem[];
    invoiceItems: InvoiceItem[];
    name?: string;
    created: Date;
    location: Location;
    quantity: number;
    purchasePrice: number;
    sellingPrice: number;
    discountPrice: number;
    discount: number;
    barcode: string;
    images?: string[];
    is_active: boolean;
    generateBarcode(item: Item, attributes?: AttributeItem[]): string;
}

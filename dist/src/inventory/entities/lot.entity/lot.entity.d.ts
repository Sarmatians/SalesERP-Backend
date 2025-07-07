import { Item } from '../item.entity/item.entity';
export declare class Lot {
    id: number;
    lot_no: string;
    name: string;
    created: Date;
    total_quantity: number;
    items: Item[];
}

import { Timestamp } from 'typeorm';
import { Item } from '../item.entity/item.entity';
export declare class Brand {
    id: number;
    name: string;
    created: Timestamp;
    slug: string;
    items: Item[];
}

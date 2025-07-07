import { Timestamp } from 'typeorm';
import { Item } from '../item.entity/item.entity';
export declare class Category {
    id: number;
    name: string;
    quantity: number;
    created: Timestamp;
    slug: string;
    parentCategory: Category;
    parentCategoryId: number;
    children: Category[];
    items: Item[];
    is_pations: boolean;
}

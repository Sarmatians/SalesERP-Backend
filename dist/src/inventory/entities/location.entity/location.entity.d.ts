import { Item } from '../item.entity/item.entity';
import { ItemVariation } from '../item-variation.entity/item-variation.entity';
export declare class Location {
    id: number;
    name: string;
    type: string;
    address: string;
    link: string;
    items: Item[];
    itemVariations: ItemVariation[];
}

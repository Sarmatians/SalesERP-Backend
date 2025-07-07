import { Attribute } from '../attribute.entity/attribute.entity';
import { ItemVariation } from '../item-variation.entity/item-variation.entity';
export declare class AttributeItem {
    id: number;
    name: string;
    slug: string;
    attribute: Attribute;
    variations: ItemVariation[];
}

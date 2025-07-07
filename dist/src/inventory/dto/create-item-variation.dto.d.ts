export declare class CreateItemVariationDto {
    itemId: number;
    attributeItemIds: number[];
    locationId: number;
    name?: string;
    created?: string;
    quantity: number;
    purchasePrice: number;
    sellingPrice: number;
    discountPrice?: number;
    discount?: number;
    barcode?: string;
    images?: string[];
}

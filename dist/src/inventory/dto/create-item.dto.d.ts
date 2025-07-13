export declare class CreateItemDto {
    name: string;
    sku?: string;
    slug?: string;
    barcode?: string;
    quantity?: number;
    purchasePrice?: number;
    sellingPrice?: number;
    discountPrice?: number;
    discount?: number;
    images?: string[];
    locationId?: number;
    supplierId?: number;
    lotId?: number;
    brandId?: number;
    attributeIds?: number[];
    categoryId?: number;
    tagIds?: number[];
    relatedItemIds?: number[];
    is_variant?: boolean;
    add_date?: Date;
}

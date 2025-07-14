import { Response } from 'express';
import { InventoryService } from './inventory.service';
import { Lot } from './entities/lot.entity/lot.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { Supplier } from './entities/supplier.entity/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Attribute } from './entities/attribute.entity/attribute.entity';
import { AttributeItem } from './entities/attribute-item.entity/attribute-item.entity';
import { Location } from './entities/location.entity/location.entity';
import { Brand } from './entities/brand.entity/brand.entity';
import { Tag } from './entities/tag.entity/tag.entity';
import { Category } from './entities/category.entity/category.entity';
import { Item } from './entities/item.entity/item.entity';
import { ItemVariation } from './entities/item-variation.entity/item-variation.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { CreateItemVariationDto } from './dto/create-item-variation.dto';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { CreateAttributeItemDto } from './dto/create-attributeItem.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { UpdateAttributeItemDto } from './dto/update-attributeItem.dto';
import { UpdateBrandDto } from './dto/updated-brand.dto';
import { UpdateTagDto } from './dto/updated-tag.dto';
import { UpdateLocationDto } from './dto/updated-location.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateItemDto } from './dto/updated-item.dto';
import { UpdateItemVariationDto } from './dto/update-item-variation.dto';
import { QueryInventoryDto } from './dto/PaginationFilter/query-options.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    findAllLot(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: Lot[];
        };
    }>;
    findOneLot(id: string): Promise<Lot>;
    createLot(createLotDto: CreateLotDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    updateLot(id: string, updateLotDto: UpdateLotDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    removeLot(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllSupplier(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: Supplier[];
        };
    }>;
    findOneSupplier(id: string): Promise<Supplier>;
    createSupplier(createSupplierDto: CreateSupplierDto): Promise<Supplier>;
    updateSupplier(id: string, updateSupplierDto: UpdateSupplierDto): Promise<{
        success: boolean;
        message: string;
        data: Supplier;
    }>;
    removeSupplier(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllSupplierNoPagination(search?: string): Promise<Supplier[]>;
    findAllLocation(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: Location[];
        };
    }>;
    findOneLocation(id: string): Promise<Location>;
    createLocation(createLocationDto: CreateLocationDto): Promise<Location>;
    updateLocation(id: string, UpdateLocationDto: UpdateLocationDto): Promise<void>;
    removeLocation(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllBrand(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: Brand[];
        };
    }>;
    findOneBrand(id: string): Promise<Brand>;
    createBrand(createBrandDto: CreateBrandDto): Promise<Brand>;
    updateBrand(id: string, UpdateBrandDto: UpdateBrandDto): Promise<void>;
    removeBrand(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllTag(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: Tag[];
        };
    }>;
    findOneTag(id: string): Promise<Tag>;
    createTag(createTagDto: CreateTagDto): Promise<Tag>;
    updateTag(id: string, updateTagDto: UpdateTagDto): Promise<void>;
    removeTag(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllCategories(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: (Category & {
                children: any[];
            })[];
        };
    }>;
    findOneCategory(id: string): Promise<Category>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<void>;
    removeCategory(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllAttributes(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: Attribute[];
        };
    }>;
    findOneAttribute(id: string): Promise<Attribute>;
    createAttribute(createAttributeDto: CreateAttributeDto): Promise<Attribute>;
    updateAttribute(id: string, updateAttributeDto: UpdateAttributeDto): Promise<void>;
    removeAttribute(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllAttributeItems(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: AttributeItem[];
        };
    }>;
    findOneAttributeItem(id: string): Promise<AttributeItem>;
    createAttributeItem(createAttributeItemDto: CreateAttributeItemDto): Promise<AttributeItem>;
    updateAttributeItem(id: string, updateAttributeItem: UpdateAttributeItemDto): Promise<void>;
    removeAttributeItem(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllItems(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: Item[];
        };
    }>;
    findOneItem(id: string): Promise<Item>;
    createItem(createItemDto: CreateItemDto): Promise<Item>;
    updateItem(id: string, updateItemDto: UpdateItemDto): Promise<void>;
    removeItem(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllItemVariations(query: QueryInventoryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPage: number;
            };
            result: ItemVariation[];
        };
    }>;
    findOneItemVariation(id: string): Promise<ItemVariation>;
    createItemVariation(dto: CreateItemVariationDto): Promise<ItemVariation>;
    updateItemVariation(id: string, dto: UpdateItemVariationDto): Promise<void>;
    removeItemVariation(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
}

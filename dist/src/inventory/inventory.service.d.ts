import { Repository } from 'typeorm';
import { Lot } from './entities/lot.entity/lot.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { Supplier } from './entities/supplier.entity/supplier.entity';
import { Attribute } from './entities/attribute.entity/attribute.entity';
import { AttributeItem } from './entities/attribute-item.entity/attribute-item.entity';
import { Location } from './entities/location.entity/location.entity';
import { Category } from './entities/category.entity/category.entity';
import { Brand } from './entities/brand.entity/brand.entity';
import { Tag } from './entities/tag.entity/tag.entity';
import { Item } from './entities/item.entity/item.entity';
import { ItemVariation } from './entities/item-variation.entity/item-variation.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { CreateBrandDto } from './dto/create-brand.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { CreateItemVariationDto } from './dto/create-item-variation.dto';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { CreateAttributeItemDto } from './dto/create-attributeItem.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { UpdateAttributeItemDto } from './dto/update-attributeItem.dto';
import { UpdateBrandDto } from './dto/updated-brand.dto';
import { UpdateTagDto } from './dto/updated-tag.dto';
import { UpdateLocationDto } from './dto/updated-location.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateItemDto } from './dto/updated-item.dto';
import { UpdateItemVariationDto } from './dto/update-item-variation.dto';
import { QueryInventoryDto } from './dto/PaginationFilter/query-options.dto';
export declare class InventoryService {
    private lotRepository;
    private supplierRepository;
    private attributeRepository;
    private attributeItemRepository;
    private locationRepository;
    private categoryRepository;
    private brandRepository;
    private tagRepository;
    private itemRepository;
    private itemVariationRepository;
    constructor(lotRepository: Repository<Lot>, supplierRepository: Repository<Supplier>, attributeRepository: Repository<Attribute>, attributeItemRepository: Repository<AttributeItem>, locationRepository: Repository<Location>, categoryRepository: Repository<Category>, brandRepository: Repository<Brand>, tagRepository: Repository<Tag>, itemRepository: Repository<Item>, itemVariationRepository: Repository<ItemVariation>);
    private response;
    private handleDeleteError;
    private buildResponse;
    findAllLots(query: QueryInventoryDto): Promise<{
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
    findOneLot(id: number): Promise<Lot>;
    createLot(createLotDto: CreateLotDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    updateLot(id: number, updateData: UpdateLotDto): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    removeLot(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    findAllSuppliers(query: QueryInventoryDto): Promise<{
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
    findOneSupplier(id: number): Promise<Supplier>;
    findOneSupplierWithSupllierInvoice(id: number): Promise<{
        supplier: Partial<Supplier>;
        itemsGroupedByInvoice: Record<string, Item[]>;
    }>;
    createSupplier(createSupplierDto: CreateSupplierDto): Promise<Supplier>;
    updateSupplier(id: number, updateData: UpdateSupplierDto): Promise<{
        success: boolean;
        message: string;
        data: Supplier;
    }>;
    removeSupplier(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
    findAllSuppliersNoPagination(search?: string): Promise<Supplier[]>;
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
    findOneLocation(id: number): Promise<Location>;
    createLocation(createLocationDto: CreateLocationDto): Promise<Location>;
    updateLocation(id: number, updateData: UpdateLocationDto): Promise<void>;
    removeLocation(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
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
    findOneBrand(id: number): Promise<Brand>;
    createBrand(createBrandDto: CreateBrandDto): Promise<Brand>;
    updateBrand(id: number, updateData: UpdateBrandDto): Promise<void>;
    removeBrand(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
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
    findOneTag(id: number): Promise<Tag>;
    createTag(createTagDto: CreateTagDto): Promise<Tag>;
    updateTag(id: number, updateData: UpdateTagDto): Promise<void>;
    removeTag(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
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
    findOneCategory(id: number): Promise<Category>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    updateCategory(id: number, updateDto: UpdateCategoryDto): Promise<void>;
    removeCategory(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
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
    findOneAttribute(id: number): Promise<Attribute>;
    createAttribute(createAttributeDto: CreateAttributeDto): Promise<Attribute>;
    updateAttribute(id: number, updateData: UpdateAttributeDto): Promise<void>;
    removeAttribute(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
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
    findOneAttributeItem(id: number): Promise<AttributeItem>;
    createAttributeItem(createAttributeItemDto: CreateAttributeItemDto): Promise<AttributeItem>;
    updateAttributeItem(id: number, updateDto: UpdateAttributeItemDto): Promise<void>;
    removeAttributeItem(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
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
    findOneItem(id: number): Promise<Item>;
    createItem(createItemDto: CreateItemDto): Promise<Item>;
    updateItem(id: number, dto: UpdateItemDto): Promise<any>;
    removeItem(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
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
    findOneItemVariation(id: number): Promise<ItemVariation>;
    createItemVariation(dto: CreateItemVariationDto): Promise<ItemVariation>;
    updateItemVariation(id: number, dto: UpdateItemVariationDto): Promise<void>;
    removeItemVariation(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}

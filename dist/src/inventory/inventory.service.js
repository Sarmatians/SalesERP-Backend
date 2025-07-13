"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const lot_entity_1 = require("./entities/lot.entity/lot.entity");
const supplier_entity_1 = require("./entities/supplier.entity/supplier.entity");
const attribute_entity_1 = require("./entities/attribute.entity/attribute.entity");
const attribute_item_entity_1 = require("./entities/attribute-item.entity/attribute-item.entity");
const location_entity_1 = require("./entities/location.entity/location.entity");
const category_entity_1 = require("./entities/category.entity/category.entity");
const brand_entity_1 = require("./entities/brand.entity/brand.entity");
const tag_entity_1 = require("./entities/tag.entity/tag.entity");
const item_entity_1 = require("./entities/item.entity/item.entity");
const item_variation_entity_1 = require("./entities/item-variation.entity/item-variation.entity");
let InventoryService = class InventoryService {
    constructor(lotRepository, supplierRepository, attributeRepository, attributeItemRepository, locationRepository, categoryRepository, brandRepository, tagRepository, itemRepository, itemVariationRepository) {
        this.lotRepository = lotRepository;
        this.supplierRepository = supplierRepository;
        this.attributeRepository = attributeRepository;
        this.attributeItemRepository = attributeItemRepository;
        this.locationRepository = locationRepository;
        this.categoryRepository = categoryRepository;
        this.brandRepository = brandRepository;
        this.tagRepository = tagRepository;
        this.itemRepository = itemRepository;
        this.itemVariationRepository = itemVariationRepository;
    }
    response(success, message, data = null) {
        return {
            success,
            message,
            data,
        };
    }
    handleDeleteError(error, entityName) {
        if (error instanceof typeorm_2.QueryFailedError) {
            const errMsg = error.driverError?.detail || error.message;
            return {
                success: false,
                message: `Cannot delete ${entityName}. It may be in use or related to another entity. Details: ${errMsg}`,
            };
        }
        return {
            success: false,
            message: `Failed to delete ${entityName}: ${error.message}`,
        };
    }
    async findAllLots(query) {
        const { page = '1', limit = '10' } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        const [data, total] = await this.lotRepository.findAndCount({
            relations: [
                'items',
                'items.variations',
                'items.variations.attributes',
            ],
            take,
            skip,
        });
        const currentPage = parseInt(page);
        const totalPage = Math.ceil(total / take);
        return {
            success: true,
            message: 'Lots fetched successfully',
            data: {
                meta: {
                    page: currentPage,
                    limit: take,
                    total,
                    totalPage,
                },
                result: data,
            },
        };
    }
    async findOneLot(id) {
        const lot = await this.lotRepository.findOne({
            where: { id },
            relations: [
                'items',
                'items.variations',
                'items.variations.attributes',
            ],
        });
        if (!lot) {
            throw new common_1.NotFoundException(`Lot with ID ${id} not found`);
        }
        return lot;
    }
    async createLot(createLotDto) {
        try {
            const lot = this.lotRepository.create(createLotDto);
            const saved = await this.lotRepository.save(lot);
            return this.response(true, 'Lot created successfully', saved);
        }
        catch (error) {
            return this.response(false, 'Failed to create lot', error.message);
        }
    }
    async updateLot(id, updateData) {
        try {
            const result = await this.lotRepository.update(id, updateData);
            if (!result.affected)
                throw new Error('Lot not found');
            return this.response(true, `Lot with ID ${id} updated successfully.`);
        }
        catch (error) {
            return this.response(false, `Failed to update lot: ${error.message}`);
        }
    }
    async removeLot(id) {
        try {
            const result = await this.lotRepository.delete(id);
            if (!result.affected)
                return this.response(false, 'Lot not found');
            return this.response(true, 'Lot deleted successfully');
        }
        catch (error) {
            return this.handleDeleteError(error, 'Lot');
        }
    }
    async findAllSuppliers(query) {
        const { page = '1', limit = '10', search } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        const [data, total] = await this.supplierRepository.findAndCount({
            where: search
                ? [
                    { name: (0, typeorm_2.ILike)(`%${search}%`) },
                ]
                : {},
            take,
            skip,
            order: { id: 'DESC' },
            relations: [
                'items',
                'items.variations',
                'items.variations.attributes',
            ],
        });
        const currentPage = parseInt(page);
        const totalPage = Math.ceil(total / take);
        return {
            success: true,
            message: 'Suppliers fetched successfully',
            data: {
                meta: {
                    page: currentPage,
                    limit: take,
                    total,
                    totalPage,
                },
                result: data,
            },
        };
    }
    async findOneSupplier(id) {
        return this.supplierRepository.findOne({
            where: { id },
            relations: [
                'items',
                'items.variations',
                'items.variations.attributes',
            ],
        });
    }
    async createSupplier(createSupplierDto) {
        const supplier = new supplier_entity_1.Supplier();
        supplier.name = createSupplierDto.name;
        supplier.email = createSupplierDto.email;
        supplier.phone = createSupplierDto.phone;
        supplier.emergency_contact = createSupplierDto.emergency_contact;
        supplier.address = createSupplierDto.address;
        supplier.Type = createSupplierDto.Type;
        supplier.remarks = createSupplierDto.remarks;
        supplier.account_balance = createSupplierDto.account_balance || 0;
        supplier.points = createSupplierDto.points || '0';
        supplier.Special_Date_Type = createSupplierDto.Special_Date_Type;
        supplier.special_dates = createSupplierDto.special_dates || null;
        supplier.is_active = createSupplierDto.is_active || true;
        supplier.is_wholesale = createSupplierDto.is_wholesale || false;
        return this.supplierRepository.save(supplier);
    }
    async updateSupplier(id, updateData) {
        if (!Object.keys(updateData).length) {
            throw new Error('No update values provided');
        }
        const supplier = await this.supplierRepository.findOne({ where: { id } });
        if (!supplier) {
            throw new common_1.NotFoundException(`Supplier with ID ${id} not found`);
        }
        const updatedSupplier = Object.assign(supplier, updateData);
        const savedSupplier = await this.supplierRepository.save(updatedSupplier);
        return {
            success: true,
            message: `Supplier with ID ${id} updated successfully.`,
            data: savedSupplier,
        };
    }
    async removeSupplier(id) {
        try {
            const result = await this.supplierRepository.delete(id);
            if (!result.affected)
                return this.response(false, 'Supplier not found');
            return this.response(true, 'Supplier deleted successfully');
        }
        catch (error) {
            return this.handleDeleteError(error, 'Supplier');
        }
    }
    async findAllSuppliersNoPagination(search) {
        const where = search
            ? [{ name: (0, typeorm_2.ILike)(`%${search}%`) }]
            : {};
        return this.supplierRepository.find({
            where,
            relations: ['items'],
            order: { id: 'DESC' },
        });
    }
    async findAllLocation(query) {
        const { page = '1', limit = '10' } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        const [data, total] = await this.locationRepository.findAndCount({ take, skip });
        const currentPage = parseInt(page);
        const totalPage = Math.ceil(total / take);
        return {
            success: true,
            message: 'Locations fetched successfully',
            data: {
                meta: {
                    page: currentPage,
                    limit: take,
                    total,
                    totalPage,
                },
                result: data,
            },
        };
    }
    async findOneLocation(id) {
        return this.locationRepository.findOne({ where: { id } });
    }
    async createLocation(createLocationDto) {
        const location = new location_entity_1.Location();
        location.name = createLocationDto.name;
        location.type = createLocationDto.type;
        return this.locationRepository.save(location);
    }
    async updateLocation(id, updateData) {
        if (!Object.keys(updateData).length) {
            throw new Error('No update values provided');
        }
        await this.locationRepository.update(id, updateData);
    }
    async removeLocation(id) {
        try {
            const result = await this.locationRepository.delete(id);
            if (!result.affected)
                return this.response(false, 'Location not found');
            return this.response(true, 'Location deleted successfully');
        }
        catch (error) {
            return this.handleDeleteError(error, 'Location');
        }
    }
    async findAllBrand(query) {
        const { page = '1', limit = '10', search } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        const where = search ? { name: (0, typeorm_2.ILike)(`%${search}%`) } : {};
        const [data, total] = await this.brandRepository.findAndCount({ where, take, skip });
        const currentPage = parseInt(page);
        const totalPage = Math.ceil(total / take);
        return {
            success: true,
            message: 'Brands fetched successfully',
            data: {
                meta: {
                    page: currentPage,
                    limit: take,
                    total,
                    totalPage,
                },
                result: data,
            },
        };
    }
    async findOneBrand(id) {
        return this.brandRepository.findOne({ where: { id } });
    }
    async createBrand(createBrandDto) {
        const brand = new brand_entity_1.Brand();
        brand.name = createBrandDto.name;
        brand.slug = createBrandDto.slug;
        return this.brandRepository.save(brand);
    }
    async updateBrand(id, updateData) {
        if (!Object.keys(updateData).length) {
            throw new Error('No update values provided');
        }
        await this.brandRepository.update(id, updateData);
    }
    async removeBrand(id) {
        try {
            const result = await this.brandRepository.delete(id);
            if (!result.affected)
                return this.response(false, 'Brand not found');
            return this.response(true, 'Brand deleted successfully');
        }
        catch (error) {
            return this.handleDeleteError(error, 'Brand');
        }
    }
    async findAllTag(query) {
        const { page = '1', limit = '10', search } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        const where = search ? { name: (0, typeorm_2.ILike)(`%${search}%`) } : {};
        const [data, total] = await this.tagRepository.findAndCount({ where, take, skip });
        const currentPage = parseInt(page);
        const totalPage = Math.ceil(total / take);
        return {
            success: true,
            message: 'Tags fetched successfully',
            data: {
                meta: {
                    page: currentPage,
                    limit: take,
                    total,
                    totalPage,
                },
                result: data,
            },
        };
    }
    async findOneTag(id) {
        return this.tagRepository.findOne({ where: { id } });
    }
    async createTag(createTagDto) {
        const tag = new tag_entity_1.Tag();
        tag.name = createTagDto.name;
        tag.slug = createTagDto.slug;
        return this.tagRepository.save(tag);
    }
    async updateTag(id, updateData) {
        if (!Object.keys(updateData).length) {
            throw new Error('No update values provided');
        }
        await this.tagRepository.update(id, updateData);
    }
    async removeTag(id) {
        try {
            const result = await this.tagRepository.delete(id);
            if (!result.affected)
                return this.response(false, 'Tag not found');
            return this.response(true, 'Tag deleted successfully');
        }
        catch (error) {
            return this.handleDeleteError(error, 'Tag');
        }
    }
    async findAllCategories(query) {
        const { page = '1', limit = '50', search } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        const where = search ? { name: (0, typeorm_2.ILike)(`%${search}%`) } : {};
        const [categories, total] = await this.categoryRepository.findAndCount({
            relations: ['parentCategory'],
            where,
            take,
            skip,
        });
        const categoryMap = new Map();
        categories.forEach(category => categoryMap.set(category.id, { ...category, children: [] }));
        categories.forEach(category => {
            if (category.parentCategoryId) {
                const parent = categoryMap.get(category.parentCategoryId);
                if (parent) {
                    parent.children.push(categoryMap.get(category.id));
                }
            }
        });
        const tree = categories
            .filter(c => !c.parentCategoryId)
            .map(c => categoryMap.get(c.id));
        const currentPage = parseInt(page);
        const totalPage = Math.ceil(total / take);
        return {
            success: true,
            message: 'Categories fetched successfully',
            data: {
                meta: {
                    page: currentPage,
                    limit: take,
                    total,
                    totalPage,
                },
                result: tree,
            },
        };
    }
    async findOneCategory(id) {
        return this.categoryRepository.findOne({ where: { id } });
    }
    async createCategory(createCategoryDto) {
        const category = new category_entity_1.Category();
        category.name = createCategoryDto.name;
        category.slug = createCategoryDto.slug;
        if (createCategoryDto.parentCategoryId) {
            const parentCategory = await this.categoryRepository.findOne({
                where: { id: createCategoryDto.parentCategoryId },
            });
            if (parentCategory) {
                category.parentCategory = parentCategory;
                category.parentCategoryId = parentCategory.id;
            }
            else {
                throw new Error('Parent category not found');
            }
        }
        return this.categoryRepository.save(createCategoryDto);
    }
    async updateCategory(id, updateDto) {
        const updateData = {
            name: updateDto.name,
        };
        if (updateDto.parentCategoryId) {
            const parentCategory = await this.categoryRepository.findOne({
                where: { id: updateDto.parentCategoryId },
            });
            if (!parentCategory) {
                throw new Error('Parent category not found');
            }
            updateData.parentCategory = parentCategory;
        }
        else {
            updateData.parentCategory = null;
        }
        await this.categoryRepository.update(id, updateData);
    }
    async removeCategory(id) {
        try {
            const result = await this.categoryRepository.delete(id);
            if (!result.affected)
                return this.response(false, 'Category not found');
            return this.response(true, 'Category deleted successfully');
        }
        catch (error) {
            return this.handleDeleteError(error, 'Category');
        }
    }
    async findAllAttributes(query) {
        const { page = '1', limit = '10' } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        const [data, total] = await this.attributeRepository.findAndCount({ relations: ['items'], take, skip });
        const currentPage = parseInt(page);
        const totalPage = Math.ceil(total / take);
        return {
            success: true,
            message: 'Attributes fetched successfully',
            data: {
                meta: {
                    page: currentPage,
                    limit: take,
                    total,
                    totalPage,
                },
                result: data,
            },
        };
    }
    async findOneAttribute(id) {
        return this.attributeRepository.findOne({
            where: { id },
            relations: ['items'],
        });
    }
    async createAttribute(createAttributeDto) {
        const attribute = new attribute_entity_1.Attribute();
        attribute.name = createAttributeDto.name;
        attribute.slug = createAttributeDto.slug;
        return this.attributeRepository.save(attribute);
    }
    async updateAttribute(id, updateData) {
        if (!Object.keys(updateData).length) {
            throw new Error('No update values provided');
        }
        await this.attributeRepository.update(id, updateData);
    }
    async removeAttribute(id) {
        try {
            const result = await this.attributeRepository.delete(id);
            if (!result.affected)
                return this.response(false, 'Attribute not found');
            return this.response(true, 'Attribute deleted successfully');
        }
        catch (error) {
            return this.handleDeleteError(error, 'Attribute');
        }
    }
    async findAllAttributeItems(query) {
        const { page = '1', limit = '10' } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        const [data, total] = await this.attributeItemRepository.findAndCount({ take, skip });
        const currentPage = parseInt(page);
        const totalPage = Math.ceil(total / take);
        return {
            success: true,
            message: 'Attribute items fetched successfully',
            data: {
                meta: {
                    page: currentPage,
                    limit: take,
                    total,
                    totalPage,
                },
                result: data,
            },
        };
    }
    async findOneAttributeItem(id) {
        return this.attributeItemRepository.findOne({ where: { id } });
    }
    async createAttributeItem(createAttributeItemDto) {
        const attributeItem = new attribute_item_entity_1.AttributeItem();
        attributeItem.name = createAttributeItemDto.name;
        attributeItem.slug = createAttributeItemDto.slug;
        const attribute = await this.attributeRepository.findOne({
            where: { id: createAttributeItemDto.attributeId },
        });
        if (!attribute) {
            throw new Error('Attribute not found');
        }
        attributeItem.attribute = attribute;
        return this.attributeItemRepository.save(attributeItem);
    }
    async updateAttributeItem(id, updateDto) {
        const attribute = await this.attributeRepository.findOne({
            where: { id: updateDto.attributeId },
        });
        if (!attribute) {
            throw new Error('Attribute not found');
        }
        await this.attributeItemRepository.update(id, {
            name: updateDto.name,
            slug: updateDto.slug,
            attribute: attribute,
        });
    }
    async removeAttributeItem(id) {
        try {
            const result = await this.attributeItemRepository.delete(id);
            if (!result.affected)
                return this.response(false, 'Attribute Item not found');
            return this.response(true, 'Attribute Item deleted successfully');
        }
        catch (error) {
            return this.handleDeleteError(error, 'Attribute Item');
        }
    }
    async findAllItems(query) {
        const { page = '1', limit = '10', search } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        let where = {};
        if (search) {
            where = [
                { name: (0, typeorm_2.ILike)(`%${search}%`) },
                { sku: (0, typeorm_2.ILike)(`%${search}%`) },
                { barcode: (0, typeorm_2.ILike)(`%${search}%`) },
            ];
        }
        const [data, total] = await this.itemRepository.findAndCount({
            where,
            take,
            skip,
            order: { id: 'DESC' },
            relations: [
                'brand',
                'category',
                'tags',
                'attributes',
                'location',
                'supplier',
                'lot',
                'relatedItems',
                'variations',
                'variations.attributes',
            ],
        });
        const currentPage = parseInt(page);
        const totalPage = Math.ceil(total / take);
        return {
            success: true,
            message: 'Items fetched successfully',
            data: {
                meta: {
                    page: currentPage,
                    limit: take,
                    total,
                    totalPage,
                },
                result: data,
            },
        };
    }
    async findOneItem(id) {
        return this.itemRepository.findOne({
            where: { id },
            relations: [
                'brand',
                'category',
                'tags',
                'attributes',
                'location',
                'supplier',
                'lot',
                'relatedItems',
                'variations',
                'variations.attributes',
            ],
        });
    }
    async createItem(createItemDto) {
        const item = new item_entity_1.Item();
        item.name = createItemDto.name;
        item.sku = createItemDto.sku;
        item.slug = createItemDto.slug
            ? createItemDto.slug
            : createItemDto.name?.trim().toLowerCase().replace(/\s+/g, '-');
        item.quantity = createItemDto.quantity;
        item.purchasePrice = createItemDto.purchasePrice;
        item.sellingPrice = createItemDto.sellingPrice;
        item.discountPrice = createItemDto.discountPrice;
        item.discount = createItemDto.discount;
        item.images = createItemDto.images;
        item.is_variant = createItemDto.is_variant ?? false;
        item.add_date = createItemDto.add_date ?? null;
        if (createItemDto.locationId) {
            const location = await this.locationRepository.findOne({ where: { id: createItemDto.locationId } });
            if (!location)
                throw new Error('Location not found');
            item.location = location;
        }
        if (createItemDto.lotId) {
            const lot = await this.lotRepository.findOne({ where: { id: createItemDto.lotId } });
            if (!lot)
                throw new Error('Lot not found');
            item.lot = lot;
        }
        if (createItemDto.supplierId) {
            const supplier = await this.supplierRepository.findOne({ where: { id: createItemDto.supplierId } });
            if (!supplier)
                throw new Error('Supplier not found');
            item.supplier = supplier;
            item.purchasePrice = createItemDto.purchasePrice ?? 0;
            supplier.totalAmount = Number(supplier.totalAmount ?? 0) + Number(item.purchasePrice ?? 0);
            await this.supplierRepository.save(supplier);
        }
        if (createItemDto.brandId) {
            const brand = await this.brandRepository.findOne({ where: { id: createItemDto.brandId } });
            if (!brand)
                throw new Error('Brand not found');
            item.brand = brand;
        }
        if (createItemDto.attributeIds?.length) {
            const attributes = await this.attributeRepository.findByIds(createItemDto.attributeIds);
            item.attributes = attributes;
        }
        if (createItemDto.categoryId) {
            const category = await this.categoryRepository.findOne({ where: { id: createItemDto.categoryId } });
            if (!category)
                throw new Error('Category not found');
            item.category = category;
        }
        if (createItemDto.tagIds?.length) {
            const tags = await this.tagRepository.findByIds(createItemDto.tagIds);
            item.tags = tags;
        }
        if (createItemDto.relatedItemIds?.length) {
            const relatedItems = await this.itemRepository.findByIds(createItemDto.relatedItemIds);
            item.relatedItems = relatedItems;
        }
        const savedItem = await this.itemRepository.save(item);
        savedItem.barcode = (savedItem.lot.name + savedItem.id + savedItem.sku).toString();
        await this.itemRepository.save(savedItem);
        if (!savedItem.is_variant) {
            const variation = new item_variation_entity_1.ItemVariation();
            variation.item = savedItem;
            variation.name = savedItem.name;
            variation.quantity = savedItem.quantity ?? 0;
            variation.purchasePrice = savedItem.purchasePrice ?? 0;
            variation.sellingPrice = savedItem.sellingPrice ?? 0;
            variation.discountPrice = savedItem.discountPrice ?? 0;
            variation.discount = savedItem.discount ?? 0;
            variation.location = savedItem.location;
            variation.barcode = variation.generateBarcode(savedItem);
            await this.itemVariationRepository.save(variation);
        }
        return savedItem;
    }
    async updateItem(id, dto) {
        const item = await this.itemRepository.findOne({
            where: { id },
            relations: ['attributes', 'tags', 'relatedItems', 'brand', 'location', 'category', 'supplier'],
        });
        if (!item)
            throw new Error('Item not found');
        item.name = dto.name;
        if (dto.sku !== undefined)
            item.sku = dto.sku;
        if (dto.slug !== undefined)
            item.slug = dto.slug;
        if (dto.barcode !== undefined)
            item.barcode = dto.barcode;
        if (dto.quantity !== undefined)
            item.quantity = dto.quantity;
        if (dto.purchasePrice !== undefined)
            item.purchasePrice = dto.purchasePrice;
        if (dto.sellingPrice !== undefined)
            item.sellingPrice = dto.sellingPrice;
        if (dto.discountPrice !== undefined)
            item.discountPrice = dto.discountPrice;
        if (dto.discount !== undefined)
            item.discount = dto.discount;
        if (dto.images !== undefined)
            item.images = dto.images;
        item.is_variant = dto.is_variant ?? false;
        if (dto.locationId !== undefined) {
            const location = await this.locationRepository.findOne({ where: { id: dto.locationId } });
            if (!location)
                throw new Error('Location not found');
            item.location = location;
        }
        if (dto.lotId !== undefined) {
            if (dto.lotId === null) {
                item.lot = null;
            }
            else {
                const lot = await this.lotRepository.findOne({ where: { id: dto.lotId } });
                if (!lot)
                    throw new Error('Lot not found');
                item.lot = lot;
            }
        }
        if (dto.supplierId !== undefined) {
            if (dto.supplierId === null) {
                item.supplier = null;
            }
            else {
                const supplier = await this.supplierRepository.findOne({ where: { id: dto.supplierId } });
                if (!supplier)
                    throw new Error('Supplier not found');
                item.supplier = supplier;
            }
        }
        if (dto.brandId !== undefined) {
            const brand = await this.brandRepository.findOne({ where: { id: dto.brandId } });
            if (!brand)
                throw new Error('Brand not found');
            item.brand = brand;
        }
        if (dto.categoryId !== undefined) {
            const category = await this.categoryRepository.findOne({ where: { id: dto.categoryId } });
            if (!category)
                throw new Error('Category not found');
            item.category = category;
        }
        if (dto.attributeIds !== undefined) {
            const attributes = await this.attributeRepository.findByIds(dto.attributeIds);
            item.attributes = attributes;
        }
        if (dto.tagIds !== undefined) {
            const tags = await this.tagRepository.findByIds(dto.tagIds);
            item.tags = tags;
        }
        if (dto.relatedItemIds !== undefined) {
            const relatedItems = await this.itemRepository.findByIds(dto.relatedItemIds);
            item.relatedItems = relatedItems;
        }
        await this.itemRepository.save(item);
        if (item.is_variant) {
            const variations = await this.itemVariationRepository.find({ where: { item: { id: item.id } } });
            item.quantity = variations.reduce((sum, v) => sum + (v.quantity ?? 0), 0);
            await this.itemRepository.save(item);
        }
    }
    async removeItem(id) {
        try {
            const result = await this.itemRepository.delete(id);
            if (!result.affected)
                return this.response(false, 'Item not found');
            return this.response(true, 'Item deleted successfully');
        }
        catch (error) {
            return this.handleDeleteError(error, 'Item');
        }
    }
    async findAllItemVariations(query) {
        const { page = '1', limit = '10', search } = query;
        const take = parseInt(limit);
        const skip = (parseInt(page) - 1) * take;
        const queryBuilder = this.itemVariationRepository
            .createQueryBuilder('itemVariation')
            .leftJoinAndSelect('itemVariation.item', 'item')
            .leftJoinAndSelect('itemVariation.attributes', 'attributes')
            .leftJoinAndSelect('itemVariation.location', 'location');
        if (search) {
            queryBuilder.where('item.name ILIKE :search OR itemVariation.barcode ILIKE :search', { search: `%${search}%` });
        }
        const [data, total] = await queryBuilder
            .skip(skip)
            .take(take)
            .getManyAndCount();
        const currentPage = parseInt(page);
        const totalPage = Math.ceil(total / take);
        return {
            success: true,
            message: 'Item variations fetched successfully',
            data: {
                meta: {
                    page: currentPage,
                    limit: take,
                    total,
                    totalPage,
                },
                result: data,
            },
        };
    }
    async findOneItemVariation(id) {
        return this.itemVariationRepository.findOne({
            where: { id },
            relations: ['item', 'attributes', 'location'],
        });
    }
    async createItemVariation(dto) {
        const item = await this.itemRepository.findOne({ where: { id: dto.itemId }, relations: ['lot'], });
        if (!item)
            throw new Error('Item not found');
        const location = await this.locationRepository.findOne({ where: { id: dto.locationId } });
        if (!location)
            throw new Error('Location not found');
        const attributes = await this.attributeItemRepository.findByIds(dto.attributeItemIds || []);
        const itemVariation = new item_variation_entity_1.ItemVariation();
        itemVariation.item = item;
        itemVariation.location = location;
        itemVariation.attributes = attributes;
        itemVariation.name = dto.name ?? '';
        itemVariation.created = dto.created ? new Date(dto.created) : undefined;
        itemVariation.quantity = dto.quantity ?? 0;
        itemVariation.purchasePrice = dto.purchasePrice ?? item.purchasePrice ?? 0;
        itemVariation.sellingPrice = dto.sellingPrice ?? item.sellingPrice ?? 0;
        itemVariation.discountPrice = dto.discountPrice ?? 0;
        itemVariation.discount = dto.discount ?? 0;
        itemVariation.images = dto.images ?? [];
        itemVariation.barcode = dto.barcode || itemVariation.generateBarcode(item, attributes);
        const savedVariation = await this.itemVariationRepository.save(itemVariation);
        if (item.is_variant) {
            const variations = await this.itemVariationRepository.find({ where: { item: { id: item.id } } });
            item.quantity = variations.reduce((sum, v) => sum + (v.quantity ?? 0), 0);
            await this.itemRepository.save(item);
        }
        return savedVariation;
    }
    async updateItemVariation(id, dto) {
        const itemVariation = await this.itemVariationRepository.findOne({
            where: { id },
            relations: ['attributes', 'item', 'location'],
        });
        if (!itemVariation)
            throw new Error('Item variation not found');
        const item = await this.itemRepository.findOne({ where: { id: dto.itemId } });
        if (!item)
            throw new Error('Item not found');
        const location = await this.locationRepository.findOne({ where: { id: dto.locationId } });
        if (!location)
            throw new Error('Location not found');
        const attributeItems = await this.attributeItemRepository.findByIds(dto.attributeItemIds || []);
        itemVariation.item = item;
        itemVariation.location = location;
        itemVariation.attributes = attributeItems;
        if (dto.name !== undefined)
            itemVariation.name = dto.name;
        if (dto.created !== undefined)
            itemVariation.created = new Date(dto.created);
        if (dto.quantity !== undefined)
            itemVariation.quantity = dto.quantity;
        if (dto.purchasePrice !== undefined) {
            itemVariation.purchasePrice = dto.purchasePrice;
        }
        else if (!itemVariation.purchasePrice) {
            itemVariation.purchasePrice = item.purchasePrice ?? 0;
        }
        if (dto.sellingPrice !== undefined) {
            itemVariation.sellingPrice = dto.sellingPrice;
        }
        else if (!itemVariation.sellingPrice) {
            itemVariation.sellingPrice = item.sellingPrice ?? 0;
        }
        if (dto.discountPrice !== undefined)
            itemVariation.discountPrice = dto.discountPrice;
        if (dto.discount !== undefined)
            itemVariation.discount = dto.discount;
        if (dto.barcode !== undefined)
            itemVariation.barcode = dto.barcode;
        if (dto.images !== undefined)
            itemVariation.images = dto.images;
        await this.itemVariationRepository.save(itemVariation);
        if (item.is_variant) {
            const variations = await this.itemVariationRepository.find({ where: { item: { id: item.id } } });
            item.quantity = variations.reduce((sum, v) => sum + (v.quantity ?? 0), 0);
            await this.itemRepository.save(item);
        }
    }
    async removeItemVariation(id) {
        try {
            const result = await this.itemVariationRepository.delete(id);
            if (!result.affected)
                return this.response(false, 'Item Variation not found');
            return this.response(true, 'Item Variation deleted successfully');
        }
        catch (error) {
            return this.handleDeleteError(error, 'Item Variation');
        }
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lot_entity_1.Lot)),
    __param(1, (0, typeorm_1.InjectRepository)(supplier_entity_1.Supplier)),
    __param(2, (0, typeorm_1.InjectRepository)(attribute_entity_1.Attribute)),
    __param(3, (0, typeorm_1.InjectRepository)(attribute_item_entity_1.AttributeItem)),
    __param(4, (0, typeorm_1.InjectRepository)(location_entity_1.Location)),
    __param(5, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(6, (0, typeorm_1.InjectRepository)(brand_entity_1.Brand)),
    __param(7, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag)),
    __param(8, (0, typeorm_1.InjectRepository)(item_entity_1.Item)),
    __param(9, (0, typeorm_1.InjectRepository)(item_variation_entity_1.ItemVariation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map
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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const inventory_service_1 = require("./inventory.service");
const create_lot_dto_1 = require("./dto/create-lot.dto");
const update_lot_dto_1 = require("./dto/update-lot.dto");
const create_supplier_dto_1 = require("./dto/create-supplier.dto");
const update_supplier_dto_1 = require("./dto/update-supplier.dto");
const create_brand_dto_1 = require("./dto/create-brand.dto");
const create_tag_dto_1 = require("./dto/create-tag.dto");
const create_category_dto_1 = require("./dto/create-category.dto");
const create_location_dto_1 = require("./dto/create-location.dto");
const authentication_guard_1 = require("../utility/guards/authentication.guard");
const authorization_guard_1 = require("../utility/guards/authorization.guard");
const user_role_enum_1 = require("../utility/common/user-role.enum");
const create_item_dto_1 = require("./dto/create-item.dto");
const create_item_variation_dto_1 = require("./dto/create-item-variation.dto");
const create_attribute_dto_1 = require("./dto/create-attribute.dto");
const create_attributeItem_dto_1 = require("./dto/create-attributeItem.dto");
const update_attribute_dto_1 = require("./dto/update-attribute.dto");
const update_attributeItem_dto_1 = require("./dto/update-attributeItem.dto");
const updated_brand_dto_1 = require("./dto/updated-brand.dto");
const updated_tag_dto_1 = require("./dto/updated-tag.dto");
const updated_location_dto_1 = require("./dto/updated-location.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const updated_item_dto_1 = require("./dto/updated-item.dto");
const update_item_variation_dto_1 = require("./dto/update-item-variation.dto");
const query_options_dto_1 = require("./dto/PaginationFilter/query-options.dto");
let InventoryController = class InventoryController {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    findAllLot(query) {
        return this.inventoryService.findAllLots(query);
    }
    findOneLot(id) {
        return this.inventoryService.findOneLot(+id);
    }
    createLot(createLotDto) {
        return this.inventoryService.createLot(createLotDto);
    }
    updateLot(id, updateLotDto) {
        return this.inventoryService.updateLot(+id, updateLotDto);
    }
    async removeLot(id, res) {
        const result = await this.inventoryService.removeLot(+id);
        if (!result.success && result.message.includes('not found')) {
            return res.status(404).json(result);
        }
        if (!result.success && result.message.includes('in use')) {
            return res.status(206).json(result);
        }
        return res.status(200).json(result);
    }
    findAllSupplier(query) {
        return this.inventoryService.findAllSuppliers(query);
    }
    findOneSupplier(id) {
        return this.inventoryService.findOneSupplier(+id);
    }
    createSupplier(createSupplierDto) {
        return this.inventoryService.createSupplier(createSupplierDto);
    }
    updateSupplier(id, updateSupplierDto) {
        return this.inventoryService.updateSupplier(+id, updateSupplierDto);
    }
    async removeSupplier(id, res) {
        const result = await this.inventoryService.removeSupplier(+id);
        if (!result.success && result.message.includes('not found')) {
            return res.status(404).json(result);
        }
        if (!result.success && result.message.includes('in use')) {
            return res.status(206).json(result);
        }
        return res.status(200).json(result);
    }
    async findAllSupplierNoPagination(search) {
        return this.inventoryService.findAllSuppliersNoPagination(search);
    }
    findAllLocation(query) {
        return this.inventoryService.findAllLocation(query);
    }
    findOneLocation(id) {
        return this.inventoryService.findOneLocation(+id);
    }
    async createLocation(createLocationDto) {
        return await this.inventoryService.createLocation(createLocationDto);
    }
    updateLocation(id, UpdateLocationDto) {
        return this.inventoryService.updateLocation(+id, UpdateLocationDto);
    }
    async removeLocation(id, res) {
        const result = await this.inventoryService.removeLocation(+id);
        if (!result.success && result.message.includes('not found')) {
            return res.status(404).json(result);
        }
        if (!result.success && result.message.includes('in use')) {
            return res.status(206).json(result);
        }
        return res.status(200).json(result);
    }
    findAllBrand(query) {
        return this.inventoryService.findAllBrand(query);
    }
    findOneBrand(id) {
        return this.inventoryService.findOneBrand(+id);
    }
    createBrand(createBrandDto) {
        return this.inventoryService.createBrand(createBrandDto);
    }
    updateBrand(id, UpdateBrandDto) {
        return this.inventoryService.updateBrand(+id, UpdateBrandDto);
    }
    async removeBrand(id, res) {
        const result = await this.inventoryService.removeBrand(+id);
        if (!result.success && result.message.includes('not found')) {
            return res.status(404).json(result);
        }
        if (!result.success && result.message.includes('in use')) {
            return res.status(206).json(result);
        }
        return res.status(200).json(result);
    }
    findAllTag(query) {
        return this.inventoryService.findAllTag(query);
    }
    findOneTag(id) {
        return this.inventoryService.findOneTag(+id);
    }
    createTag(createTagDto) {
        return this.inventoryService.createTag(createTagDto);
    }
    updateTag(id, updateTagDto) {
        return this.inventoryService.updateTag(+id, updateTagDto);
    }
    async removeTag(id, res) {
        const result = await this.inventoryService.removeTag(+id);
        if (!result.success && result.message.includes('not found')) {
            return res.status(404).json(result);
        }
        if (!result.success && result.message.includes('in use')) {
            return res.status(206).json(result);
        }
        return res.status(200).json(result);
    }
    findAllCategories(query) {
        return this.inventoryService.findAllCategories(query);
    }
    findOneCategory(id) {
        return this.inventoryService.findOneCategory(+id);
    }
    createCategory(createCategoryDto) {
        return this.inventoryService.createCategory(createCategoryDto);
    }
    updateCategory(id, updateCategoryDto) {
        return this.inventoryService.updateCategory(+id, updateCategoryDto);
    }
    async removeCategory(id, res) {
        const result = await this.inventoryService.removeCategory(+id);
        if (!result.success && result.message.includes('not found')) {
            return res.status(404).json(result);
        }
        if (!result.success && result.message.includes('in use')) {
            return res.status(206).json(result);
        }
        return res.status(200).json(result);
    }
    findAllAttributes(query) {
        return this.inventoryService.findAllAttributes(query);
    }
    findOneAttribute(id) {
        return this.inventoryService.findOneAttribute(+id);
    }
    createAttribute(createAttributeDto) {
        return this.inventoryService.createAttribute(createAttributeDto);
    }
    updateAttribute(id, updateAttributeDto) {
        return this.inventoryService.updateAttribute(+id, updateAttributeDto);
    }
    async removeAttribute(id, res) {
        const result = await this.inventoryService.removeAttribute(+id);
        if (!result.success && result.message.includes('not found')) {
            return res.status(404).json(result);
        }
        if (!result.success && result.message.includes('in use')) {
            return res.status(206).json(result);
        }
        return res.status(200).json(result);
    }
    findAllAttributeItems(query) {
        return this.inventoryService.findAllAttributeItems(query);
    }
    findOneAttributeItem(id) {
        return this.inventoryService.findOneAttributeItem(+id);
    }
    createAttributeItem(createAttributeItemDto) {
        return this.inventoryService.createAttributeItem(createAttributeItemDto);
    }
    updateAttributeItem(id, updateAttributeItem) {
        return this.inventoryService.updateAttributeItem(+id, updateAttributeItem);
    }
    async removeAttributeItem(id, res) {
        const result = await this.inventoryService.removeAttributeItem(+id);
        if (!result.success && result.message.includes('not found')) {
            return res.status(404).json(result);
        }
        if (!result.success && result.message.includes('in use')) {
            return res.status(206).json(result);
        }
        return res.status(200).json(result);
    }
    findAllItems(query) {
        return this.inventoryService.findAllItems(query);
    }
    findOneItem(id) {
        return this.inventoryService.findOneItem(+id);
    }
    createItem(createItemDto) {
        return this.inventoryService.createItem(createItemDto);
    }
    updateItem(id, updateItemDto) {
        return this.inventoryService.updateItem(+id, updateItemDto);
    }
    async removeItem(id, res) {
        const result = await this.inventoryService.removeItem(+id);
        if (!result.success && result.message.includes('not found')) {
            return res.status(404).json(result);
        }
        if (!result.success && result.message.includes('in use')) {
            return res.status(206).json(result);
        }
        return res.status(200).json(result);
    }
    findAllItemVariations(query) {
        return this.inventoryService.findAllItemVariations(query);
    }
    findOneItemVariation(id) {
        return this.inventoryService.findOneItemVariation(+id);
    }
    createItemVariation(dto) {
        return this.inventoryService.createItemVariation(dto);
    }
    updateItemVariation(id, dto) {
        return this.inventoryService.updateItemVariation(+id, dto);
    }
    async removeItemVariation(id, res) {
        const result = await this.inventoryService.removeItemVariation(+id);
        if (!result.success && result.message.includes('not found')) {
            return res.status(404).json(result);
        }
        if (!result.success && result.message.includes('in use')) {
            return res.status(206).json(result);
        }
        return res.status(200).json(result);
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('lot'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllLot", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('lot/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOneLot", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('lot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lot_dto_1.CreateLotDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createLot", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Put)('lot/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lot_dto_1.UpdateLotDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateLot", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('lot/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "removeLot", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('supplier'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllSupplier", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('supplier/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOneSupplier", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('supplier'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_supplier_dto_1.CreateSupplierDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createSupplier", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Put)('supplier/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_supplier_dto_1.UpdateSupplierDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateSupplier", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('supplier/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "removeSupplier", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('supplierAll'),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findAllSupplierNoPagination", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('location'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllLocation", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('location/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOneLocation", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('location'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_location_dto_1.CreateLocationDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createLocation", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Put)('location/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updated_location_dto_1.UpdateLocationDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('location/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "removeLocation", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('brand'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllBrand", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('brand/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOneBrand", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('brand'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_brand_dto_1.CreateBrandDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createBrand", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Put)('brand/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updated_brand_dto_1.UpdateBrandDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateBrand", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('brand/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "removeBrand", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('tag'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllTag", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('tag/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOneTag", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('tag'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tag_dto_1.CreateTagDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createTag", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Put)('tag/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updated_tag_dto_1.UpdateTagDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateTag", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('tag/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "removeTag", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('categories'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllCategories", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOneCategory", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createCategory", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Put)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "removeCategory", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('attributes'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllAttributes", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('attributes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOneAttribute", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('attributes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attribute_dto_1.CreateAttributeDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createAttribute", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Put)('attributes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attribute_dto_1.UpdateAttributeDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateAttribute", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('attributes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "removeAttribute", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('attribute-items'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllAttributeItems", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('attribute-items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOneAttributeItem", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('attribute-items'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attributeItem_dto_1.CreateAttributeItemDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createAttributeItem", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Put)('attribute-items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attributeItem_dto_1.UpdateAttributeItemDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateAttributeItem", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('attribute-items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "removeAttributeItem", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('items'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllItems", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOneItem", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_item_dto_1.CreateItemDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createItem", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Put)('items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updated_item_dto_1.UpdateItemDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateItem", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "removeItem", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('item-variations'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_options_dto_1.QueryInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAllItemVariations", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Get)('item-variations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "findOneItemVariation", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Post)('item-variations'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_item_variation_dto_1.CreateItemVariationDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "createItemVariation", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Put)('item-variations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_item_variation_dto_1.UpdateItemVariationDto]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "updateItemVariation", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, (0, authorization_guard_1.AuthorizedGuard)([user_role_enum_1.Roles.ADMIN])),
    (0, common_1.Delete)('item-variations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "removeItemVariation", null);
exports.InventoryController = InventoryController = __decorate([
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map
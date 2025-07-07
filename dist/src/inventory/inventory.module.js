"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const inventory_service_1 = require("./inventory.service");
const inventory_controller_1 = require("./inventory.controller");
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
let InventoryModule = class InventoryModule {
};
exports.InventoryModule = InventoryModule;
exports.InventoryModule = InventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([supplier_entity_1.Supplier, lot_entity_1.Lot, attribute_entity_1.Attribute, attribute_item_entity_1.AttributeItem, location_entity_1.Location, brand_entity_1.Brand, tag_entity_1.Tag, category_entity_1.Category, item_variation_entity_1.ItemVariation, item_entity_1.Item,])],
        controllers: [inventory_controller_1.InventoryController],
        providers: [inventory_service_1.InventoryService],
    })
], InventoryModule);
//# sourceMappingURL=inventory.module.js.map
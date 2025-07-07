/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Lot } from './entities/lot.entity/lot.entity';
import { Supplier } from './entities/supplier.entity/supplier.entity';
import { Attribute } from './entities/attribute.entity/attribute.entity';
import { AttributeItem } from './entities/attribute-item.entity/attribute-item.entity';
import { Location } from './entities/location.entity/location.entity';
import { Category } from './entities/category.entity/category.entity';
import { Brand } from './entities/brand.entity/brand.entity';
import { Tag } from './entities/tag.entity/tag.entity';
import { Item } from './entities/item.entity/item.entity';
import { ItemVariation } from './entities/item-variation.entity/item-variation.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Supplier, Lot, Attribute, AttributeItem, Location, Brand, Tag, Category, ItemVariation, Item, ])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}

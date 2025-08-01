/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, QueryFailedError   } from 'typeorm';
import { Lot } from './entities/lot.entity/lot.entity';
import { CreateLotDto } from './dto/create-lot.dto';
import { UpdateLotDto } from './dto/update-lot.dto';
import { Supplier } from './entities/supplier.entity/supplier.entity';
import { SupplierPayment } from './entities/supplier-payment.entity/supplier-payment.entity';
import { Attribute } from './entities/attribute.entity/attribute.entity';
import { AttributeItem } from './entities/attribute-item.entity/attribute-item.entity';
import { Location } from './entities/location.entity/location.entity';
import { Category } from './entities/category.entity/category.entity';
import { Brand } from './entities/brand.entity/brand.entity';
import { Tag } from './entities/tag.entity/tag.entity';
import { Item } from './entities/item.entity/item.entity';
import { ItemVariation } from './entities/item-variation.entity/item-variation.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { CreateSupplierPaymentDto } from './dto/create-supplier-payment.dto';
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


@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Lot)
    private lotRepository: Repository<Lot>,
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
    @InjectRepository(SupplierPayment)
    private supplierPaymentRepository: Repository<SupplierPayment>,
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
    @InjectRepository(AttributeItem)
    private attributeItemRepository: Repository<AttributeItem>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(ItemVariation)
    private itemVariationRepository: Repository<ItemVariation>,
  ) {}


    private response(success: boolean, message: string, data: any = null) {
      return {
        success,
        message,
        data,
      };
    }

    // Generic ERROR Handler
    private handleDeleteError(error: any, entityName: string) {
      if (error instanceof QueryFailedError) {
        const errMsg = (error as any).driverError?.detail || error.message;
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

    // For building consistent responses
    private buildResponse(status: 'success' | 'updated' | 'failed' | 'error', message: string, data: any = null
    ): { statusCode: number; success: boolean; message: string; data?: any } {
      switch (status) {
        case 'success':
          return { statusCode: 200, success: true, message, data };
        case 'updated':
          return { statusCode: 202, success: true, message, data };
        case 'failed':
          return { statusCode: 400, success: false, message };
        case 'error':
        default:
          return { statusCode: 500, success: false, message };
      }
    }
  

  // #################### Lot methods ####################

    // Find All Lots with Pagination
    async findAllLots(query: QueryInventoryDto) {
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

    // async findAllLots(): Promise<Lot[]> {
    //   return this.lotRepository.find({ relations: ['items'] });
    // }

    // Find Single Lot
    async findOneLot(id: number): Promise<Lot> {
      const lot = await this.lotRepository.findOne({
        where: { id },
        relations: [
          'items',
          'items.variations',
          'items.variations.attributes',

        ],
      });

      if (!lot) {
        throw new NotFoundException(`Lot with ID ${id} not found`);
      }

      return lot;
    }

    // Create Lot
    async createLot(createLotDto: CreateLotDto) {
      try {
        const lot = this.lotRepository.create(createLotDto);
        const saved = await this.lotRepository.save(lot);
        return this.response(true, 'Lot created successfully', saved);
      } catch (error) {
        return this.response(false, 'Failed to create lot', error.message);
      }
    }

    async updateLot(id: number, updateData: UpdateLotDto) {
      try {
        const result = await this.lotRepository.update(id, updateData);
        if (!result.affected) throw new Error('Lot not found');
        return this.response(true, `Lot with ID ${id} updated successfully.`);
      } catch (error) {
        return this.response(false, `Failed to update lot: ${error.message}`);
      }
    }

    async removeLot(id: number) {
      try {
        const result = await this.lotRepository.delete(id);
        if (!result.affected) return this.response(false, 'Lot not found');
        return this.response(true, 'Lot deleted successfully');
      } catch (error) {
        return this.handleDeleteError(error, 'Lot');
      }
    }

    // #################### Supplier methods ####################

    // All Supplier Pagination
    async findAllSuppliers(query: QueryInventoryDto) {
      const { page = '1', limit = '10', search } = query;
      const take = parseInt(limit);
      const skip = (parseInt(page) - 1) * take;

      const [data, total] = await this.supplierRepository.findAndCount({
        where: search
          ? [
              { name: ILike(`%${search}%`) },
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

    // Single Supplier
    async findOneSupplier(id: number): Promise<Supplier> {
      return this.supplierRepository.findOne({
        where: { id },
        relations: [
          'items',
          'items.variations',
          'items.variations.attributes',
        ], 
      });
    }

    // Single Supplier by Supplier Invoice
    async findOneSupplierWithSupllierInvoice(id: number): Promise<{
      supplier: Partial<Supplier>,
      itemsGroupedByInvoice: Record<string, {
        items: Item[],
        TotalPurchaseAmount: number,
        TotalPaidAmount: number,
        TotalDueAmount: number
      }>
    }> {
      const supplier = await this.supplierRepository.findOne({
        where: { id },
        relations: ['items', 'items.variations', 'items.variations.attributes'],
      });

      if (!supplier) throw new Error('Supplier not found');
      const payments = await this.supplierPaymentRepository.find({
        where: { supplier: { id } },
      });

      const paidAmountByInvoice: Record<string, number> = {};
      for (const payment of payments) {
        const key = payment.supplierInvoiceNo || 'null';
        paidAmountByInvoice[key] = (paidAmountByInvoice[key] || 0) + Number(payment.paidAmount ?? 0);
      }

      const sortedItems = [...supplier.items].sort((a, b) => {
        const getTimeSafe = (d: any) => d instanceof Date ? d.getTime() : new Date(d).getTime();
        const dateA = getTimeSafe(a.add_date ?? a.created ?? 0);
        const dateB = getTimeSafe(b.add_date ?? b.created ?? 0);
        return dateB - dateA;
      });

      const groupedItems = sortedItems.reduce((acc, item) => {
        const key = item.Supplier_InvoiceNo || 'null';
        if (!acc[key]) {
          acc[key] = {
            items: [],
            TotalPurchaseAmount: 0,
            TotalPaidAmount: 0,
            TotalDueAmount: 0,
          };
        }

        const purchasePrice = Number(item.purchasePrice ?? 0);
        acc[key].items.push(item);
        acc[key].TotalPurchaseAmount += purchasePrice;

        return acc;
      }, {} as Record<string, {
        items: Item[],
        TotalPurchaseAmount: number,
        TotalPaidAmount: number,
        TotalDueAmount: number
      }>);

      for (const invoiceNo in groupedItems) {
        const group = groupedItems[invoiceNo];
        group.TotalPaidAmount = paidAmountByInvoice[invoiceNo] || 0;
        group.TotalDueAmount = group.TotalPurchaseAmount - group.TotalPaidAmount;
      }

      const { id: supplierId, name, email, phone, address, account_balance, totalAmount, dueAmount, paidAmount } = supplier;

      return {
        supplier: {
          id: supplierId,
          name,
          email,
          phone,
          address,
          account_balance,
          totalAmount,
          dueAmount,
          paidAmount,
        },
        itemsGroupedByInvoice: groupedItems,
      };
    }


    // Create Supplier
    async createSupplier(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
      const supplier = new Supplier();
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

    // Update Supplier
    async updateSupplier(id: number, updateData: UpdateSupplierDto): Promise<{ success: boolean; message: string; data: Supplier }> {
      if (!Object.keys(updateData).length) {
        throw new Error('No update values provided');
      }

      const supplier = await this.supplierRepository.findOne({ where: { id } });
      if (!supplier) {
        throw new NotFoundException(`Supplier with ID ${id} not found`);
      }

      const updatedSupplier = Object.assign(supplier, updateData);
      const savedSupplier = await this.supplierRepository.save(updatedSupplier);

      return {
        success: true,
        message: `Supplier with ID ${id} updated successfully.`,
        data: savedSupplier,
      };
    }

    // Remove Supplier
    async removeSupplier(id: number) {
      try {
        const result = await this.supplierRepository.delete(id);
        if (!result.affected) return this.response(false, 'Supplier not found');
        return this.response(true, 'Supplier deleted successfully');
      } catch (error) {
        return this.handleDeleteError(error, 'Supplier');
      }
    }

    // All Suppliers without Pagination
    async findAllSuppliersNoPagination(search?: string): Promise<Supplier[]> {
      const where = search
        ? [{ name: ILike(`%${search}%`) }]
        : {};

      return this.supplierRepository.find({
        where,
        relations: ['items'],
        order: { id: 'DESC' },
      });
    }

    //  #################### Supplier Payment methods ####################

    // GET ALL SUPPLIER PAYMENT
    async getAllSupplierPayments(): Promise<{ success: boolean; message: string; data: SupplierPayment[] }> {
      try {
        const payments = await this.supplierPaymentRepository.find({
          relations: ['supplier'], 
          order: { paidAt: 'DESC' },
        });

        return this.response(true, 'Supplier payments retrieved successfully.', payments);
      } catch (error) {
        console.error('[InventoryService] Failed to fetch supplier payments:', error.message);
        return this.response(false, 'Failed to retrieve supplier payments.', []);
      }
    }

    // GET SINGLE SUPPLIER PAYMENT BY ID
    async getSupplierPaymentById(id: number): Promise<SupplierPayment> {
      const payment = await this.supplierPaymentRepository.findOne({
        where: { id },
        relations: ['supplier'],
      });

      if (!payment) throw new Error(`SupplierPayment with ID ${id} not found`);
      return payment;
    }

    // CREATE SUPPLIER PAYMENT 
    async createSupplierPayment(dto: CreateSupplierPaymentDto): Promise<SupplierPayment> {
      const supplier = await this.supplierRepository.findOne({
        where: { id: dto.supplierId },
        relations: ['items'],
      });

      if (!supplier) throw new Error('Supplier not found');

      const groupedItems = supplier.items.reduce((acc, item) => {
        const key = item.Supplier_InvoiceNo || 'null';
        if (!acc[key]) {
          acc[key] = {
            items: [],
            TotalPurchaseAmount: 0,
          };
        }
        acc[key].items.push(item);
        acc[key].TotalPurchaseAmount += Number(item.purchasePrice ?? 0);
        return acc;
      }, {} as Record<string, { items: Item[], TotalPurchaseAmount: number }>);

      const group = groupedItems[dto.supplierInvoiceNo];
      if (!group) {
        throw new Error(`Invoice number "${dto.supplierInvoiceNo}" not found for this supplier.`);
      }

      if (dto.paidAmount > group.TotalPurchaseAmount) {
        throw new Error(`Paid amount exceeds total purchase amount for invoice "${dto.supplierInvoiceNo}".`);
      }

      const payment = this.supplierPaymentRepository.create({
        paymentMethod: dto.paymentMethod,
        paidAmount: dto.paidAmount,
        notes: dto.notes ?? '',
        supplierInvoiceNo: dto.supplierInvoiceNo,
        supplier,
      });

      supplier.paidAmount = Number(supplier.paidAmount ?? 0) + Number(dto.paidAmount);
      supplier.dueAmount = Number(supplier.totalAmount ?? 0) - supplier.paidAmount;

      await this.supplierRepository.save(supplier);
      return this.supplierPaymentRepository.save(payment);
    }


    // UPDATE SUPPLIER PAYMENT
    async updateSupplierPayment(id: number, updateData: Partial<CreateSupplierPaymentDto>): Promise<SupplierPayment> {
      const payment = await this.supplierPaymentRepository.findOne({
        where: { id },
        relations: ['supplier'],
      });

      if (!payment) throw new Error(`SupplierPayment with ID ${id} not found`);

      const supplier = await this.supplierRepository.findOne({
        where: { id: payment.supplier.id },
        relations: ['items'],
      });

      if (!supplier) throw new Error('Supplier not found');

      const oldPaidAmount = Number(payment.paidAmount ?? 0);
      const oldInvoiceNo = payment.supplierInvoiceNo || 'null';
      if (updateData.supplierInvoiceNo && updateData.supplierInvoiceNo !== oldInvoiceNo) {
        throw new Error('Changing the invoice number is not allowed.');
      }

      // Build grouped items for validation
      const groupedItems = supplier.items.reduce((acc, item) => {
        const key = item.Supplier_InvoiceNo || 'null';
        if (!acc[key]) {
          acc[key] = {
            items: [],
            TotalPurchaseAmount: 0,
          };
        }
        acc[key].items.push(item);
        acc[key].TotalPurchaseAmount += Number(item.purchasePrice ?? 0);
        return acc;
      }, {} as Record<string, { items: Item[]; TotalPurchaseAmount: number }>);

      const newInvoiceNo = updateData.supplierInvoiceNo ?? payment.supplierInvoiceNo ?? 'null';
      const invoiceGroup = groupedItems[newInvoiceNo];

      if (!invoiceGroup) {
        throw new Error(`Invoice number "${newInvoiceNo}" not found for this supplier.`);
      }

      const newPaidAmount = updateData.paidAmount ?? oldPaidAmount;
      const otherPayments = await this.supplierPaymentRepository.find({
        where: {
          supplier: { id: supplier.id },
          supplierInvoiceNo: newInvoiceNo,
        },
      });

      const otherPaymentsTotal = otherPayments
        .filter(p => p.id !== payment.id)
        .reduce((sum, p) => sum + Number(p.paidAmount ?? 0), 0);

      const updatedTotalPaid = otherPaymentsTotal + newPaidAmount;

      if (updatedTotalPaid > invoiceGroup.TotalPurchaseAmount) {
        throw new Error(`Total payments for invoice "${newInvoiceNo}" exceed the purchase amount.`);
      }

      // Update supplier paid/due amounts
      const supplierOldPaid = Number(supplier.paidAmount ?? 0);
      const paidDiff = newPaidAmount - oldPaidAmount;

      supplier.paidAmount = supplierOldPaid + paidDiff;
      supplier.dueAmount = Number(supplier.totalAmount ?? 0) - supplier.paidAmount;
      await this.supplierRepository.save(supplier);

      // Update payment
      payment.paidAmount = newPaidAmount;
      payment.paymentMethod = updateData.paymentMethod ?? payment.paymentMethod;
      payment.notes = updateData.notes ?? payment.notes;
      payment.supplierInvoiceNo = newInvoiceNo;

      return this.supplierPaymentRepository.save(payment);
    }


    // DELETE SUPPLIER PAYMENT
    async deleteSupplierPayment(id: number): Promise<{ success: boolean; message: string }> {
      const payment = await this.supplierPaymentRepository.findOne({
        where: { id },
        relations: ['supplier'],
      });

      if (!payment) throw new Error(`SupplierPayment with ID ${id} not found`);

      // Reversing payment
      payment.supplier.paidAmount = Number(payment.supplier.paidAmount ?? 0) - Number(payment.paidAmount ?? 0);
      payment.supplier.dueAmount = Number(payment.supplier.totalAmount ?? 0) - payment.supplier.paidAmount;
      await this.supplierRepository.save(payment.supplier);

      await this.supplierPaymentRepository.remove(payment);
      return { success: true, message: 'Supplier payment deleted and supplier balance adjusted.' };
    }



    //  #################### Location methods ####################

    // Find All Locations with Pagination
    async findAllLocation(query: QueryInventoryDto) {
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

    //  Find Single Location
    async findOneLocation(id: number): Promise<Location> {
      return this.locationRepository.findOne({ where: { id } });
    }

    // Create Location
    async createLocation(createLocationDto: CreateLocationDto): Promise<Location> {
      const location = new Location();
      location.name = createLocationDto.name;
      location.type = createLocationDto.type;
      return this.locationRepository.save(location);
    }

    // Update Location
    async updateLocation(id: number, updateData: UpdateLocationDto): Promise<void> {
      if (!Object.keys(updateData).length) {
        throw new Error('No update values provided');
      }
      await this.locationRepository.update(id, updateData);
    }

    // Remove Location
    async removeLocation(id: number) {
      try {
        const result = await this.locationRepository.delete(id);
        if (!result.affected) return this.response(false, 'Location not found');
        return this.response(true, 'Location deleted successfully');
      } catch (error) {
        return this.handleDeleteError(error, 'Location');
      }
    }

    //  #################### Brand methods ####################
    // Find All Brands with Pagination
    async findAllBrand(query: QueryInventoryDto) {
      const { page = '1', limit = '10', search } = query;
      const take = parseInt(limit);
      const skip = (parseInt(page) - 1) * take;
      const where = search ? { name: ILike(`%${search}%`) } : {};
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

    // Find Single Brand
    async findOneBrand(id: number): Promise<Brand> {
      return this.brandRepository.findOne({ where: { id } });
    }

    // Create Brand
    async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
      const brand = new Brand();
      brand.name = createBrandDto.name;
      brand.slug = createBrandDto.slug;
      return this.brandRepository.save(brand);
    }

    // Update Brand
    async updateBrand(id: number, updateData: UpdateBrandDto): Promise<void> {
      if (!Object.keys(updateData).length) {
        throw new Error('No update values provided');
      }
      await this.brandRepository.update(id, updateData);
    }

    // Remove Brand
    async removeBrand(id: number) {
      try {
        const result = await this.brandRepository.delete(id);
        if (!result.affected) return this.response(false, 'Brand not found');
        return this.response(true, 'Brand deleted successfully');
      } catch (error) {
        return this.handleDeleteError(error, 'Brand');
      }
    }


    //  #################### Tag methods ####################

    // Find All Tags with Pagination
    async findAllTag(query: QueryInventoryDto) {
      const { page = '1', limit = '10', search } = query;
      const take = parseInt(limit);
      const skip = (parseInt(page) - 1) * take;
      const where = search ? { name: ILike(`%${search}%`) } : {};
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

    // Find Single Tag
    async findOneTag(id: number): Promise<Tag> {
      return this.tagRepository.findOne({ where: { id } });
    }

    // Create Tag
    async createTag(createTagDto: CreateTagDto): Promise<Tag> {
      const tag = new Tag();
      tag.name = createTagDto.name;
      tag.slug = createTagDto.slug;
      return this.tagRepository.save(tag);
    }

    // Update Tag
    async updateTag(id: number, updateData: UpdateTagDto): Promise<void> {
      if (!Object.keys(updateData).length) {
        throw new Error('No update values provided');
      }
      await this.tagRepository.update(id, updateData);
    }

    // Remove Tag
    async removeTag(id: number) {
      try {
        const result = await this.tagRepository.delete(id);
        if (!result.affected) return this.response(false, 'Tag not found');
        return this.response(true, 'Tag deleted successfully');
      } catch (error) {
        return this.handleDeleteError(error, 'Tag');
      }
    }

    //  #################### Category methods ####################

    // Find All Categories with Pagination
    async findAllCategories(query: QueryInventoryDto) {
      const { page = '1', limit = '50', search } = query;
      const take = parseInt(limit);
      const skip = (parseInt(page) - 1) * take;
      const where = search ? { name: ILike(`%${search}%`) } : {};
      const [categories, total] = await this.categoryRepository.findAndCount({
        relations: ['parentCategory'],
        where,
        take,
        skip,
      });

      const categoryMap = new Map<number, Category & { children: any[] }>();
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
  
    // Find Single Category
    async findOneCategory(id: number): Promise<Category> {
      return this.categoryRepository.findOne({ where: { id } });
    }
  
    // Create Category
    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
      const category = new Category();
      category.name = createCategoryDto.name;
      category.slug = createCategoryDto.slug;
      
      if (createCategoryDto.parentCategoryId) {
        const parentCategory = await this.categoryRepository.findOne({
          where: { id: createCategoryDto.parentCategoryId },
        });
        if (parentCategory) {
          category.parentCategory = parentCategory;
          category.parentCategoryId = parentCategory.id; 
        } else {
          throw new Error('Parent category not found');
        }
      }
      return this.categoryRepository.save(createCategoryDto);
    }
  
    // Update Category
    async updateCategory(id: number, updateDto: UpdateCategoryDto): Promise<void> {
      const updateData: Partial<Category> = {
        name: updateDto.name,
        // slug: updateDto.slug,
      };
    
      if (updateDto.parentCategoryId) {
        const parentCategory = await this.categoryRepository.findOne({
          where: { id: updateDto.parentCategoryId },
        });
        if (!parentCategory) {
          throw new Error('Parent category not found');
        }
        updateData.parentCategory = parentCategory;
      } else {
        updateData.parentCategory = null; 
      }
    
      await this.categoryRepository.update(id, updateData);
    }
  
    // Remove Category
    async removeCategory(id: number) {
      try {
        const result = await this.categoryRepository.delete(id);
        if (!result.affected) return this.response(false, 'Category not found');
        return this.response(true, 'Category deleted successfully');
      } catch (error) {
        return this.handleDeleteError(error, 'Category');
      }
    }
    // #################### Attribute methods ####################

    // Find All Attributes with Pagination
    async findAllAttributes(query: QueryInventoryDto) {
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

  // Find Single Attribute
    async findOneAttribute(id: number): Promise<Attribute> {
      return this.attributeRepository.findOne({ 
        where: { id },
        relations: ['items'], 
      });
    }
  
    // Create Attribute
    async createAttribute(createAttributeDto: CreateAttributeDto): Promise<Attribute> {
      const attribute = new Attribute();
      attribute.name = createAttributeDto.name;
      attribute.slug = createAttributeDto.slug;
      return this.attributeRepository.save(attribute);
    }
  
    // Update Attribute
    async updateAttribute(id: number, updateData: UpdateAttributeDto): Promise<void> {
      if (!Object.keys(updateData).length) {
        throw new Error('No update values provided');
      }
      await this.attributeRepository.update(id, updateData);
    }
  
    // Remove Attribute
    async removeAttribute(id: number) {
      try {
        const result = await this.attributeRepository.delete(id);
        if (!result.affected) return this.response(false, 'Attribute not found');
        return this.response(true, 'Attribute deleted successfully');
      } catch (error) {
        return this.handleDeleteError(error, 'Attribute');
      }
    }
  
    // #################### AttributeItem methods ####################
    async findAllAttributeItems(query: QueryInventoryDto) {
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
  
    async findOneAttributeItem(id: number): Promise<AttributeItem> {
      return this.attributeItemRepository.findOne({ where: { id } });
    }
  
    async createAttributeItem(createAttributeItemDto: CreateAttributeItemDto): Promise<AttributeItem> {
      const attributeItem = new AttributeItem();
      attributeItem.name = createAttributeItemDto.name;
      attributeItem.slug = createAttributeItemDto.slug;
    
      // Fetch and assign the parent Attribute
      const attribute = await this.attributeRepository.findOne({
        where: { id: createAttributeItemDto.attributeId },
      });
      if (!attribute) {
        throw new Error('Attribute not found');
      }
      attributeItem.attribute = attribute;
    
      return this.attributeItemRepository.save(attributeItem);
    }
  
    async updateAttributeItem(id: number, updateDto: UpdateAttributeItemDto): Promise<void> {
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
  
    async removeAttributeItem(id: number) {
      try {
        const result = await this.attributeItemRepository.delete(id);
        if (!result.affected) return this.response(false, 'Attribute Item not found');
        return this.response(true, 'Attribute Item deleted successfully');
      } catch (error) {
        return this.handleDeleteError(error, 'Attribute Item');
      }
    }
    

  // ####################  ITEM  ####################
  async findAllItems(query: QueryInventoryDto) {
    const { page = '1', limit = '10', search, is_active } = query;
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    let where: any = {};

    // Handle search functionality
    if (search) {
      where = [
        { name: ILike(`%${search}%`) },
        { sku: ILike(`%${search}%`) },
        { barcode: ILike(`%${search}%`) },
      ];
    }

    // Handle is_active filter
    if (is_active && is_active !== 'all') {
      const isActiveValue = is_active === 'true';
      
      if (search) {
        // If both search and is_active filters are present
        where = where.map((condition: any) => ({
          ...condition,
          is_active: isActiveValue,
        }));
      } else {
        // If only is_active filter is present
        where = { is_active: isActiveValue };
      }
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

  // Find Single Item
  async findOneItem(id: number): Promise<Item> {
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

  // Create Item
  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const item = new Item();
    item.name = createItemDto.name;
    item.sku = createItemDto.sku;

    // Generate slug
    item.slug = createItemDto.slug 
      ? createItemDto.slug 
      : createItemDto.name?.trim().toLowerCase().replace(/\s+/g, '-');

    item.size = createItemDto.size;
    item.quantity = createItemDto.quantity;
    item.purchasePrice = createItemDto.purchasePrice;
    item.sellingPrice = createItemDto.sellingPrice;
    item.discountPrice = createItemDto.discountPrice;
    item.discount = createItemDto.discount;
    item.images = createItemDto.images;
    item.is_variant = createItemDto.is_variant ?? false;
    item.add_date = createItemDto.add_date ?? null;
    item.Supplier_InvoiceNo = createItemDto.Supplier_InvoiceNo ?? null;


    // Relations
    if (createItemDto.locationId) {
      const location = await this.locationRepository.findOne({ where: { id: createItemDto.locationId } });
      if (!location) throw new Error('Location not found');
      item.location = location;
    }

    if (createItemDto.lotId) {
      const lot = await this.lotRepository.findOne({ where: { id: createItemDto.lotId } });
      if (!lot) throw new Error('Lot not found');
      item.lot = lot;
    }

    if (createItemDto.supplierId) {
      const supplier = await this.supplierRepository.findOne({ where: { id: createItemDto.supplierId } });
      if (!supplier) throw new Error('Supplier not found');
      item.supplier = supplier;

      // Update supplier totalAmount
      item.purchasePrice = createItemDto.purchasePrice ?? 0;
      supplier.totalAmount = Number(supplier.totalAmount ?? 0) + Number(item.purchasePrice ?? 0);

      await this.supplierRepository.save(supplier);
    }

    if (createItemDto.brandId) {
      const brand = await this.brandRepository.findOne({ where: { id: createItemDto.brandId } });
      if (!brand) throw new Error('Brand not found');
      item.brand = brand;
    }

    if (createItemDto.attributeIds?.length) {
      const attributes = await this.attributeRepository.findByIds(createItemDto.attributeIds);
      item.attributes = attributes;
    }

    if (createItemDto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: createItemDto.categoryId } });
      if (!category) throw new Error('Category not found');
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

    // Save item first to get ID
    const savedItem = await this.itemRepository.save(item);

    // Generate and set barcode
    savedItem.barcode = (savedItem.lot.name + savedItem.id + savedItem.sku).toString();
    await this.itemRepository.save(savedItem);

    // Create default ItemVariation if is_variant is false
    if (!savedItem.is_variant) {
      const variation = new ItemVariation();
      variation.item = savedItem;
      variation.name = savedItem.name;
      variation.quantity = savedItem.quantity ?? 0;
      variation.purchasePrice = savedItem.purchasePrice ?? 0;
      variation.sellingPrice = savedItem.sellingPrice ?? 0;
      variation.discountPrice = savedItem.discountPrice ?? 0;
      variation.discount = savedItem.discount ?? 0;
      variation.location = savedItem.location;

      // Generate variation barcode
      // variation.barcode = variation.generateBarcode(savedItem.id);
      // variation.barcode = variation.generateBarcode(savedItem);
      variation.barcode =  savedItem.barcode;

      await this.itemVariationRepository.save(variation);
    }

    // return savedItem;

    const itemWithRelations = await this.itemRepository.findOne({
      where: { id: savedItem.id },
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

    return itemWithRelations;
  }

  // Update Item
  async updateItem(id: number, dto: UpdateItemDto): Promise<any> {
    try {
      const item = await this.itemRepository.findOne({
        where: { id },
        relations: ['attributes', 'tags', 'relatedItems', 'brand', 'location', 'category', 'supplier'],
      });

      if (!item) {
        return this.buildResponse('failed', 'Item not found');
      }

      item.name = dto.name;

      if (dto.sku !== undefined) item.sku = dto.sku;
      if (dto.slug !== undefined) item.slug = dto.slug;
      if (dto.size !== undefined) item.size = dto.size;
      if (dto.barcode !== undefined) item.barcode = dto.barcode;
      if (dto.quantity !== undefined) item.quantity = dto.quantity;

      if (dto.purchasePrice !== undefined) {
        const oldPrice = item.purchasePrice ?? 0;
        const newPrice = dto.purchasePrice ?? 0;
        item.purchasePrice = newPrice;
        if (item.supplier) {
          const supplier = await this.supplierRepository.findOne({ where: { id: item.supplier.id } });
          if (supplier) {
            supplier.totalAmount = Number(supplier.totalAmount ?? 0) + (Number(newPrice) - Number(oldPrice));
            await this.supplierRepository.save(supplier);
          }
        }
      }

      if (dto.sellingPrice !== undefined) item.sellingPrice = dto.sellingPrice;
      if (dto.discountPrice !== undefined) item.discountPrice = dto.discountPrice;
      if (dto.discount !== undefined) item.discount = dto.discount;
      if (dto.images !== undefined) item.images = dto.images;
      if (dto.is_variant !== undefined) item.is_variant = dto.is_variant;
      if (dto.Supplier_InvoiceNo !== undefined) {
        item.Supplier_InvoiceNo = dto.Supplier_InvoiceNo;
      }

      // if (dto.is_active !== undefined) item.is_active = dto.is_active;

      if (dto.is_active !== undefined) {
        item.is_active = dto.is_active;
        const variations = await this.itemVariationRepository.find({
          where: { item: { id: item.id } },
        });

        for (const variation of variations) {
          variation.is_active = dto.is_active;
        }

        await this.itemVariationRepository.save(variations);
      }
      
      if (dto.locationId !== undefined) {
        const location = await this.locationRepository.findOne({ where: { id: dto.locationId } });
        if (!location) throw new Error('Location not found');
        item.location = location;
      }

      if (dto.lotId !== undefined) {
        if (dto.lotId === null) {
          item.lot = null;
        } else {
          const lot = await this.lotRepository.findOne({ where: { id: dto.lotId } });
          if (!lot) throw new Error('Lot not found');
          item.lot = lot;
        }
      }

      if (dto.supplierId !== undefined) {
        const previousSupplier = item.supplier;

        if (dto.supplierId === null) {
          if (previousSupplier && item.purchasePrice) {
            previousSupplier.totalAmount = Number(previousSupplier.totalAmount ?? 0) - Number(item.purchasePrice ?? 0);
            await this.supplierRepository.save(previousSupplier);
          }
          item.supplier = null;
        } else {
          const newSupplier = await this.supplierRepository.findOne({ where: { id: dto.supplierId } });
          if (!newSupplier) throw new Error('Supplier not found');

          // If supplier is changed
          if (!previousSupplier || previousSupplier.id !== newSupplier.id) {
            // Deduct from previous
            if (previousSupplier && item.purchasePrice) {
              previousSupplier.totalAmount = Number(previousSupplier.totalAmount ?? 0) - Number(item.purchasePrice ?? 0);
              await this.supplierRepository.save(previousSupplier);
            }

            // Add to new
            if (item.purchasePrice) {
              newSupplier.totalAmount = Number(newSupplier.totalAmount ?? 0) + Number(item.purchasePrice ?? 0);
              await this.supplierRepository.save(newSupplier);
            }

            item.supplier = newSupplier;
          }
        }
      }


      if (dto.brandId !== undefined) {
        const brand = await this.brandRepository.findOne({ where: { id: dto.brandId } });
        if (!brand) throw new Error('Brand not found');
        item.brand = brand;
      }

      if (dto.categoryId !== undefined) {
        const category = await this.categoryRepository.findOne({ where: { id: dto.categoryId } });
        if (!category) throw new Error('Category not found');
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

      return this.buildResponse('updated', 'Item updated successfully', item);
    } catch (error) {
      console.error('Update error:', error.message);
      return this.buildResponse('error', `Unexpected error occurred while updating item: ${error.message}`);
    }
  }

  // Delete Item
  async removeItem(id: number) {
    try {
      // First, find and delete all item variations manually
      const variations = await this.itemVariationRepository.find({
        where: { item: { id } },
      });

      if (variations.length > 0) {
        await this.itemVariationRepository.remove(variations);
      }

      // Then, delete the item
      const result = await this.itemRepository.delete(id);
      if (!result.affected) return this.response(false, 'Item not found');

      return this.response(true, 'Item and related variations deleted successfully');
    } catch (error) {
      return this.handleDeleteError(error, 'Item');
    }
  }

  // Find ACTIVE/INACTIVE Items with Pagination
  

  // ####################  ItemVariation methods ####################

  // All Item Variations with Pagination
  async findAllItemVariations(query: QueryInventoryDto) {
    const { page = '1', limit = '10', search, barcode } = query;
    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    const queryBuilder = this.itemVariationRepository
      .createQueryBuilder('itemVariation')
      .leftJoinAndSelect('itemVariation.item', 'item')
      .leftJoinAndSelect('itemVariation.attributes', 'attributes')
      .leftJoinAndSelect('itemVariation.location', 'location');

    if (search) {
      queryBuilder.andWhere(
        '(item.name ILIKE :search OR itemVariation.barcode ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (barcode) {
      queryBuilder.andWhere('itemVariation.barcode = :barcode', { barcode });
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


  // Single Item Variation
  async findOneItemVariation(id: number): Promise<ItemVariation> {
    return this.itemVariationRepository.findOne({
      where: { id },
      relations: ['item', 'attributes', 'location'],
    });
  }

  // Create Variations
  async createItemVariation(dto: CreateItemVariationDto): Promise<ItemVariation> {
    const item = await this.itemRepository.findOne({ where: { id: dto.itemId }, relations: ['lot'], });
    if (!item) throw new Error('Item not found');

    const location = await this.locationRepository.findOne({ where: { id: dto.locationId } });
    if (!location) throw new Error('Location not found');

    const attributes = await this.attributeItemRepository.findByIds(dto.attributeItemIds || []);

    const itemVariation = new ItemVariation();
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
    // itemVariation.barcode = dto.barcode || itemVariation.generateBarcode(item.id, attributes);
    itemVariation.barcode = dto.barcode || itemVariation.generateBarcode(item, attributes);

    const savedVariation = await this.itemVariationRepository.save(itemVariation);

    // Recalculate item.quantity if it's a variant item
    if (item.is_variant) {
      const variations = await this.itemVariationRepository.find({ where: { item: { id: item.id } } });
      item.quantity = variations.reduce((sum, v) => sum + (v.quantity ?? 0), 0);
      await this.itemRepository.save(item);
    }

    return savedVariation;
  }

  // Update Variations
  async updateItemVariation(id: number, dto: UpdateItemVariationDto): Promise<void> {
    const itemVariation = await this.itemVariationRepository.findOne({
      where: { id },
      relations: ['attributes', 'item', 'location'],
    });
    if (!itemVariation) throw new Error('Item variation not found');

    const item = await this.itemRepository.findOne({ where: { id: dto.itemId } });
    if (!item) throw new Error('Item not found');

    const location = await this.locationRepository.findOne({ where: { id: dto.locationId } });
    if (!location) throw new Error('Location not found');

    const attributeItems = await this.attributeItemRepository.findByIds(dto.attributeItemIds || []);

    itemVariation.item = item;
    itemVariation.location = location;
    itemVariation.attributes = attributeItems;

    if (dto.name !== undefined) itemVariation.name = dto.name;
    if (dto.created !== undefined) itemVariation.created = new Date(dto.created);
    if (dto.quantity !== undefined) itemVariation.quantity = dto.quantity;
    if (dto.purchasePrice !== undefined) {
      itemVariation.purchasePrice = dto.purchasePrice;
    } else if (!itemVariation.purchasePrice) {
      itemVariation.purchasePrice = item.purchasePrice ?? 0;
    }

    if (dto.sellingPrice !== undefined) {
      itemVariation.sellingPrice = dto.sellingPrice;
    } else if (!itemVariation.sellingPrice) {
      itemVariation.sellingPrice = item.sellingPrice ?? 0;
    }

    if (dto.discountPrice !== undefined) itemVariation.discountPrice = dto.discountPrice;
    if (dto.discount !== undefined) itemVariation.discount = dto.discount;
    if (dto.barcode !== undefined) itemVariation.barcode = dto.barcode;
    if (dto.images !== undefined) itemVariation.images = dto.images; 

    await this.itemVariationRepository.save(itemVariation);

    // Recalculate item.quantity if it's a variant item
    if (item.is_variant) {
      const variations = await this.itemVariationRepository.find({ where: { item: { id: item.id } } });
      item.quantity = variations.reduce((sum, v) => sum + (v.quantity ?? 0), 0);
      await this.itemRepository.save(item);
    }
  }

  // Delete Variations
  async removeItemVariation(id: number) {
    try {
      const itemVariation = await this.itemVariationRepository.findOne({
        where: { id },
        relations: ['item'],
      });
      if (!itemVariation) return this.response(false, 'Item Variation not found');
      const result = await this.itemVariationRepository.delete(id);
      if (!result.affected) return this.response(false, 'Item Variation not found');

      if (itemVariation.item.is_variant) {
        const variations = await this.itemVariationRepository.find({
          where: { item: { id: itemVariation.item.id } },
        });
        itemVariation.item.quantity = variations.reduce((sum, v) => sum + (v.quantity ?? 0), 0);
        await this.itemRepository.save(itemVariation.item);
      }

      return this.response(true, 'Item Variation deleted successfully');
    } catch (error) {
      return this.handleDeleteError(error, 'Item Variation');
    }
  }












}

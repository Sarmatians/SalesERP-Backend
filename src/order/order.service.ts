/* eslint-disable prettier/prettier */

import { Injectable, HttpException, InternalServerErrorException, HttpStatus  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
// import { Item } from '../inventory/entities/item.entity/item.entity';
import { ItemVariation } from '../inventory/entities/item-variation.entity/item-variation.entity';
import { QueryInventoryDto } from '../inventory/dto/PaginationFilter/query-options.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private invoiceItemRepository: Repository<InvoiceItem>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    // @InjectRepository(Item)
    // private itemRepository: Repository<Item>,
     @InjectRepository(ItemVariation) 
     private itemVariationRepository: Repository<ItemVariation>,
  ) {}

    // ########### Customer #############    
    async getAllCustomers(query?: QueryInventoryDto) {
      if (!query || (!query.page && !query.limit)) {
        const data = await this.customerRepository.find();
        return {
          success: true,
          message: 'Customers fetched successfully',
          data: {
            meta: {
              page: 1,
              limit: data.length,
              total: data.length,
              totalPage: 1,
            },
            result: data,
          },
        };
      }

      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;

      const [customers, total] = await this.customerRepository.findAndCount({
        relations: [
          'invoices',
        ],
        skip,
        take: limit,
        ...(query.search && {
          where: [
            { name: ILike(`%${query.search}%`) },
            { email: ILike(`%${query.search}%`) },
            // Add other searchable fields as needed
          ],
        }),
      });

      const totalPage = Math.ceil(total / limit);

      return {
        success: true,
        message: 'Customers fetched successfully',
        data: {
          meta: {
            page,
            limit,
            total,
            totalPage,
          },
          result: customers,
        },
      };
    }

    async getCustomerById(id: number) {
      return this.customerRepository.findOne({ where: { id }, relations: ['invoices'] });
    }

    async createCustomer(dto: CreateCustomerDto) {
      try {
        return await this.customerRepository.save(dto);
      } catch (error) {
        if (error.code === '23505') {
          throw new HttpException(
            'A customer with this phone number already exists.',
            HttpStatus.CONFLICT, // or 409 
          );
        }

        console.error('Unexpected error creating customer:', error);
        throw new InternalServerErrorException('An unexpected error occurred while creating the customer.');
      }
    }

    async updateCustomer(id: number, update: Partial<CreateCustomerDto>) {
      try {
        await this.customerRepository.update(id, update);
        return this.getCustomerById(id);
      } catch (error) {
        if (error.code === '23505') {
          throw new HttpException(
            'A customer with this phone number already exists.',
            HttpStatus.CONFLICT, // or 409
          );
        }

        console.error('Unexpected error updating customer:', error);
        throw new InternalServerErrorException('An unexpected error occurred while updating the customer.');
      }
    }

    async deleteCustomer(id: number) {
      await this.customerRepository.delete(id);
      return { deleted: true };
    }


    // ########### INVOICE #############
    async getAllInvoices(query?: QueryInventoryDto) {
      if (!query || (!query.page && !query.limit)) {
        const data = await this.invoiceRepository.find({ relations: ['customer', 'items'] });
        return {
          success: true,
          message: 'Invoices fetched successfully',
          data: {
            meta: {
              page: 1,
              limit: data.length,
              total: data.length,
              totalPage: 1,
            },
            result: data,
          },
        };
      }

      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const skip = (page - 1) * limit;

      const queryBuilder = this.invoiceRepository
        .createQueryBuilder('invoice')
        .leftJoinAndSelect('invoice.customer', 'customer')
        .leftJoinAndSelect('invoice.items', 'items');

      if (query.search) {
        queryBuilder.where(
          '(invoice.invoiceNumber ILIKE :search OR customer.name ILIKE :search OR customer.email ILIKE :search)',
          { search: `%${query.search}%` }
        );
      }

      const [invoices, total] = await queryBuilder
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      const totalPage = Math.ceil(total / limit);

      return {
        success: true,
        message: 'Invoices fetched successfully',
        data: {
          meta: {
            page,
            limit,
            total,
            totalPage,
          },
          result: invoices,
        },
      };
    }

    async getInvoiceById(id: number) {
      return this.invoiceRepository.findOne({ where: { id }, relations: ['customer', 'items'] });
    }

    async createInvoice(createInvoiceDto: CreateInvoiceDto) {
      try {
        let customer = await this.customerRepository.findOne({
          where: { phone: createInvoiceDto.customer_id },
        });

        if (!customer) {
          customer = this.customerRepository.create({
            phone: createInvoiceDto.customer_id,
          });
          customer = await this.customerRepository.save(customer);
        }

        const timestamp = new Date();
        const inv_no = `${String(timestamp.getDate()).padStart(2, '0')}${String(timestamp.getMonth() + 1).padStart(2, '0')}${timestamp.getFullYear()}${String(timestamp.getHours()).padStart(2, '0')}${String(timestamp.getMinutes()).padStart(2, '0')}${String(timestamp.getSeconds()).padStart(2, '0')}`;

        const invoice = this.invoiceRepository.create({
          ...createInvoiceDto,
          inv_no,
          customer,
        });

        const savedInvoice = await this.invoiceRepository.save(invoice);

        const items: InvoiceItem[] = [];

        if (createInvoiceDto.items && createInvoiceDto.items.length > 0) {
          for (const itemDto of createInvoiceDto.items) {
            const variation = await this.itemVariationRepository.findOne({
              where: { id: Number(itemDto.item_variation_id) },
            });

            if (!variation) {
              throw new Error(`Item variation with ID ${itemDto.item_variation_id} not found`);
            }

            if (variation.quantity < itemDto.qty) {
              throw new Error(`Not enough quantity for variation ${variation.id}`);
            }

            variation.quantity -= itemDto.qty;
            await this.itemVariationRepository.save(variation);

            const invoiceItem = this.invoiceItemRepository.create({
              ...itemDto,
              invoice: savedInvoice,
              itemVariation: variation,
            });

            items.push(invoiceItem);
          }

          await this.invoiceItemRepository.save(items);
        }

        return {
          success: true,
          message: 'Invoice created successfully',
          data: {
            invoice: savedInvoice,
            items,
          },
        };
      } catch (error) {
        console.error('💥 Invoice Creation Error:', error);
        throw new Error(error.message || 'Internal server error');
      }
    }


    async updateInvoice(id: number, update: Partial<CreateInvoiceDto>) {
      await this.invoiceRepository.update(id, update);
      return this.getInvoiceById(id);
    }

    async deleteInvoice(id: number) {
      await this.invoiceRepository.delete(id);
      return { deleted: true };
    }

    // ########### Invoice Item CRUD ###########
async getAllInvoiceItems(query?: QueryInventoryDto) {
  if (!query || (!query.page && !query.limit)) {
    const data = await this.invoiceItemRepository.find({ relations: ['invoice', 'itemVariation'] });
    return {
      success: true,
      message: 'Invoice items fetched successfully',
      data: {
        meta: {
          page: 1,
          limit: data.length,
          total: data.length,
          totalPage: 1,
        },
        result: data,
      },
    };
  }

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const skip = (page - 1) * limit;

  const queryBuilder = this.invoiceItemRepository
    .createQueryBuilder('invoiceItem')
    .leftJoinAndSelect('invoiceItem.invoice', 'invoice')
    .leftJoinAndSelect('invoiceItem.itemVariation', 'itemVariation');

  if (query.search) {
    queryBuilder.where(
      `(itemVariation.name ILIKE :search OR itemVariation.barcode ILIKE :search OR invoice.inv_no ILIKE :search)`,
      { search: `%${query.search}%` }
    );
  }

  const [invoiceItems, total] = await queryBuilder
    .skip(skip)
    .take(limit)
    .getManyAndCount();

  const totalPage = Math.ceil(total / limit);

  return {
    success: true,
    message: 'Invoice items fetched successfully',
    data: {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      result: invoiceItems,
    },
  };
}


    async getInvoiceItemById(id: number) {
      return this.invoiceItemRepository.findOne({ where: { id }, relations: ['invoice', 'item'] });
    }

    async updateInvoiceItem(id: number, update: Partial<CreateInvoiceItemDto>) {
      await this.invoiceItemRepository.update(id, update);
      return this.getInvoiceItemById(id);
    }

    async deleteInvoiceItem(id: number) {
      await this.invoiceItemRepository.delete(id);
      return { deleted: true };
    }








}
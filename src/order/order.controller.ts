/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { QueryInventoryDto } from '../inventory/dto/PaginationFilter/query-options.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // --- Customer Routes ---
  @Post('customer')
  createCustomer(@Body() dto: CreateCustomerDto) {
    return this.orderService.createCustomer(dto);
  }

  @Get('customer')
  getAllCustomers(@Query() query: QueryInventoryDto) {
    return this.orderService.getAllCustomers(query);
  }

  @Get('customer/:id')
  getCustomer(@Param('id') id: string) {
    return this.orderService.getCustomerById(+id);
  }

  @Put('customer/:id')
  updateCustomer(@Param('id') id: string, @Body() update: Partial<CreateCustomerDto>) {
    return this.orderService.updateCustomer(+id, update);
  }

  @Delete('customer/:id')
  deleteCustomer(@Param('id') id: string) {
    return this.orderService.deleteCustomer(+id);
  }

  // --- Invoice Routes ---
  @Post('invoice')
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.orderService.createInvoice(dto);
  }

  @Get('invoice')
  getAllInvoices(@Query() query: QueryInventoryDto) {
    return this.orderService.getAllInvoices(query);
  }

  @Get('invoice/:id')
  getInvoice(@Param('id') id: string) {
    return this.orderService.getInvoiceById(+id);
  }

  @Put('invoice/:id')
  updateInvoice(@Param('id') id: string, @Body() update: Partial<CreateInvoiceDto>) {
    return this.orderService.updateInvoice(+id, update);
  }

  @Delete('invoice/:id')
  deleteInvoice(@Param('id') id: string) {
    return this.orderService.deleteInvoice(+id);
  }

  // --- Invoice Item Routes ---
  @Get('invoice-item')
  getAllInvoiceItems(@Query() query: QueryInventoryDto) {
    return this.orderService.getAllInvoiceItems(query);
  }

  @Get('invoice-item/:id')
  getInvoiceItem(@Param('id') id: string) {
    return this.orderService.getInvoiceItemById(+id);
  }

  @Put('invoice-item/:id')
  updateInvoiceItem(@Param('id') id: string, @Body() update: Partial<CreateInvoiceItemDto>) {
    return this.orderService.updateInvoiceItem(+id, update);
  }

  @Delete('invoice-item/:id')
  deleteInvoiceItem(@Param('id') id: string) {
    return this.orderService.deleteInvoiceItem(+id);
  }
}

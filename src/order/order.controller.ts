/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, Param, Body, Query, UseGuards, } from '@nestjs/common';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { AuthorizedGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user-role.enum';
import { OrderService } from './order.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { QueryInventoryDto } from '../inventory/dto/PaginationFilter/query-options.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // --- Customer Routes ---
  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN, Roles.MANAGER, Roles.SALESPERSON,]))
  @Post('customer')
  createCustomer(@Body() dto: CreateCustomerDto) {
    return this.orderService.createCustomer(dto);
  }

  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN, Roles.MANAGER, Roles.SALESPERSON,]))
  @Get('customer')
  getAllCustomers(@Query() query: QueryInventoryDto) {
    return this.orderService.getAllCustomers(query);
  }

  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN, Roles.MANAGER, Roles.SALESPERSON,]))
  @Get('customer/:id')
  getCustomer(@Param('id') id: string) {
    return this.orderService.getCustomerById(+id);
  }

  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN, Roles.MANAGER, Roles.SALESPERSON,]))
  @Put('customer/:id')
  updateCustomer(@Param('id') id: string, @Body() update: Partial<CreateCustomerDto>) {
    return this.orderService.updateCustomer(+id, update);
  }

  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN]))
  @Delete('customer/:id')
  deleteCustomer(@Param('id') id: string) {
    return this.orderService.deleteCustomer(+id);
  }

  // --- Invoice Routes ---
  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN, Roles.MANAGER, Roles.SALESPERSON,]))
  @Post('invoice')
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.orderService.createInvoice(dto);
  }

  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN, Roles.MANAGER, Roles.SALESPERSON,]))
  @Get('invoice')
  getAllInvoices(@Query() query: QueryInventoryDto) {
    return this.orderService.getAllInvoices(query);
  }

  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN, Roles.MANAGER, Roles.SALESPERSON,]))
  @Get('invoice/:id')
  getInvoice(@Param('id') id: string) {
    return this.orderService.getInvoiceById(+id);
  }

  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN, Roles.MANAGER, Roles.SALESPERSON,]))
  @Put('invoice/:id')
  updateInvoice(@Param('id') id: string, @Body() update: Partial<CreateInvoiceDto>) {
    return this.orderService.updateInvoice(+id, update);
  }

  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN]))
  @Delete('invoice/:id')
  deleteInvoice(@Param('id') id: string) {
    return this.orderService.deleteInvoice(+id);
  }

  // --- Invoice Item Routes ---
  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN, Roles.MANAGER, Roles.SALESPERSON,]))
  @Get('invoice-item')
  getAllInvoiceItems(@Query() query: QueryInventoryDto) {
    return this.orderService.getAllInvoiceItems(query);
  }

  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN, Roles.MANAGER, Roles.SALESPERSON,]))
  @Get('invoice-item/:id')
  getInvoiceItem(@Param('id') id: string) {
    return this.orderService.getInvoiceItemById(+id);
  }

  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN, Roles.MANAGER, Roles.SALESPERSON,]))
  @Put('invoice-item/:id')
  updateInvoiceItem(@Param('id') id: string, @Body() update: Partial<CreateInvoiceItemDto>) {
    return this.orderService.updateInvoiceItem(+id, update);
  }

  @UseGuards(AuthenticationGuard, AuthorizedGuard([Roles.ADMIN]))
  @Delete('invoice-item/:id')
  deleteInvoiceItem(@Param('id') id: string) {
    return this.orderService.deleteInvoiceItem(+id);
  }
}

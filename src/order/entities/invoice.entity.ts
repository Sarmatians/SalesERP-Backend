/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';
import { InvoiceItem } from './invoice-item.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inv_no: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('decimal')
  bill: number;

  @Column('decimal')
  discount: number;

  @Column('decimal')
  paid_amount: number;

  @Column('decimal')
  due_amount: number;

  @Column('decimal')
  grand_total: number;

  @Column()
  status: string;

  @Column('decimal')
  vat: number;

  @Column()
  shipping_address: string;

  @Column()
  order_type: string;

  @Column('decimal')
  delivery_charge: number;

  @Column('decimal')
  delivery_cost: number;

  @Column({ nullable: true })
  remarks: string;

  @ManyToOne(() => Customer, customer => customer.invoices)
  customer: Customer;

  @OneToMany(() => InvoiceItem, item => item.invoice)
  items: InvoiceItem[];
}

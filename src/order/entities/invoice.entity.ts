/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';
import { InvoiceItem } from './invoice-item.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  inv_no: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('decimal', { nullable: true })
  bill: number;

  @Column('decimal', { nullable: true })
  discount: number;

  @Column('decimal', { nullable: true })
  paid_amount: number;

  @Column('decimal', { nullable: true })
  due_amount: number;

  @Column('decimal', { nullable: true })
  grand_total: number;

  @Column({ nullable: true })
  status: string;

  @Column('decimal', { nullable: true })
  vat: number;

  @Column({ nullable: true })
  shipping_address: string;

  @Column({ nullable: true })
  order_type: string;

  @Column('decimal', { nullable: true })
  delivery_charge: number;

  @Column('decimal', { nullable: true })
  delivery_cost: number;

  @Column({ nullable: true })
  remarks: string;

  @ManyToOne(() => Customer, customer => customer.invoices)
  customer: Customer;

  @OneToMany(() => InvoiceItem, item => item.invoice)
  items: InvoiceItem[];
}

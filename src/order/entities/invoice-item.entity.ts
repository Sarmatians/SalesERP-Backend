/* eslint-disable prettier/prettier */


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Invoice } from './invoice.entity';
import { ItemVariation } from '../../inventory/entities/item-variation.entity/item-variation.entity';

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Invoice, invoice => invoice.items)
  invoice: Invoice;

  @ManyToOne(() => ItemVariation, variation => variation.invoiceItems, { eager: true })
  itemVariation: ItemVariation;

  @Column()
  item_name: string;

  @Column('decimal')
  price: number;

  @Column('decimal')
  sales_discount: number;

  @Column('int')
  qty: number;

  @Column({ default: false })
  is_returned: boolean;

  @Column({ default: false })
  is_refund: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}

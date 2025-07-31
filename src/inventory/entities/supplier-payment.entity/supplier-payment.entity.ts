/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Supplier } from '../supplier.entity/supplier.entity';

@Entity()
export class SupplierPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true  })
  paymentMethod: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true  })
  paidAmount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  notes: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  supplierInvoiceNo: string;

  @ManyToOne(() => Supplier, supplier => supplier.payments, { nullable: false })
  supplier: Supplier;

  @CreateDateColumn()
  paidAt: Date;
}

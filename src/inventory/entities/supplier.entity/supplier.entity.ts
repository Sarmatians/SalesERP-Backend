/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Item } from '../item.entity/item.entity';
import { SupplierPayment } from '../supplier-payment.entity/supplier-payment.entity'; 

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  emergency_contact: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Type: string;

  @Column({ type: 'varchar', length: 550, nullable: true })
  remarks: string;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0, nullable: true })
  account_balance: number;
  
  @Column({type:'decimal', precision:10, scale:2, default: 0, nullable: true})
  totalAmount?: number;

  @Column({type:'decimal', precision:10, scale:2, default: 0, nullable: true})
  dueAmount?: number;

  @Column({type:'decimal', precision:10, scale:2, default: 0, nullable: true})
  paidAmount?: number;

  @Column({ type: 'varchar', length: 550, nullable: true })
  points: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Special_Date_Type: string;

  @Column({ type: 'timestamp', nullable: true })
  special_dates: Date;

  @Column({ type: 'boolean', default: true, nullable: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: true, nullable: true })
  is_wholesale: boolean;

  @Column({ type: 'json', nullable: true })
  data: any;

  @OneToMany(() => Item, item => item.supplier)
  items: Item[];

  @OneToMany(() => SupplierPayment, payment => payment.supplier)
  payments: SupplierPayment[];

}





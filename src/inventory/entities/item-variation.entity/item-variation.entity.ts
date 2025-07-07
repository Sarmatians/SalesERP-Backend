/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Item } from '../item.entity/item.entity';
import { AttributeItem } from '../attribute-item.entity/attribute-item.entity';
import { Location } from '../location.entity/location.entity';
import { InvoiceItem } from '../../../order/entities/invoice-item.entity';


@Entity()
export class ItemVariation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, item => item.variations)
  item: Item;

  @ManyToMany(() => AttributeItem, { nullable: true })
  @JoinTable()
  attributes: AttributeItem[];

  @OneToMany(() => InvoiceItem, invoiceItem => invoiceItem.itemVariation)
  invoiceItems: InvoiceItem[];

  @Column({ nullable: true }) 
  name?: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @ManyToOne(() => Location, location => location.itemVariations, { nullable: true })
  location: Location;

  @Column({ nullable: true })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true })
  purchasePrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true })
  sellingPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true })
  discountPrice: number;

  @Column({ default: 0, nullable: true })
  discount: number;

  @Column({nullable: true})
  barcode: string;

  @Column('simple-array', { nullable: true })
  images?: string[]

  @Column({ default: true })
  is_active: boolean;

  // generateBarcode(itemId: number, attributes?: AttributeItem[]): string {
  //   const attrPart = attributes ? attributes.map(a => a.id).join('') : '0';
  //   return `${itemId}${100000}${attrPart}${100}`;
  // }

  generateBarcode(item: Item, attributes?: AttributeItem[]): string {
  const lotName = item?.lot?.name || '';
  const sku = item?.sku || '';
  const attrPart = attributes?.length ? attributes.map(a => a.id).join('') : '0';
  return `${lotName}${sku}${attrPart}`;
}
}


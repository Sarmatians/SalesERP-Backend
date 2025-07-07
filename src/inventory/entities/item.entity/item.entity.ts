/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany, CreateDateColumn, Timestamp, UpdateDateColumn,  } from 'typeorm';
import { Attribute } from '../attribute.entity/attribute.entity';
import { Tag } from '../tag.entity/tag.entity';
import { Lot } from '../lot.entity/lot.entity';
import { Brand } from '../brand.entity/brand.entity';
import { Location } from '../location.entity/location.entity';
import { Category } from '../category.entity/category.entity';
import { ItemVariation } from '../item-variation.entity/item-variation.entity';
import { Supplier } from '../supplier.entity/supplier.entity';  
// import { InvoiceItem } from '../../../order/entities/invoice-item.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  sku?: string;

  @Column({ nullable: true })
  slug?: string;

  @Column({ nullable: true })
  barcode?: string;

  @CreateDateColumn({ nullable: true })
  created?: Timestamp;

  @UpdateDateColumn({ nullable: true })
  updated?: Timestamp;

  @Column({ nullable: true })
  quantity?: number;

  @Column({type:'decimal', precision:10, scale:2, default: 0, nullable: true})
  purchasePrice?: number;

  @Column({type:'decimal', precision:10, scale:2, default: 0, nullable: true})
  sellingPrice?: number;

  @Column({type:'decimal', precision:10, scale:2, default: 0, nullable: true})
  discountPrice?: number;

  @Column({ nullable: true })
  discount?: number;

  @Column('simple-array', { nullable: true })
  images?: string[]

  // @ManyToOne(() => Image, image => image.items)
  // image: Image;

  @ManyToOne(() => Location, location => location.items, { nullable: true })
  location?: Location;

  @ManyToOne(() => Lot, lot => lot.items, { nullable: true })
  lot?: Lot;

  @ManyToOne(() => Brand, brand => brand.items, { nullable: true })
  brand?: Brand;

  @ManyToOne(() => Supplier, supplier => supplier.items, { nullable: true })
  supplier?: Supplier;

  @ManyToMany(() => Attribute, { nullable: true })
  @JoinTable()
  attributes?: Attribute[];

  @ManyToOne(() => Category, category => category.items, { nullable: true })
  category?: Category;

  @ManyToMany(() => Tag, { nullable: true })
  @JoinTable()
  tags?: Tag[];

  @ManyToMany(() => Item, { nullable: true })
  @JoinTable()
  relatedItems?: Item[];

  @OneToMany(() => ItemVariation, variation => variation.item, { nullable: true })
  variations?: ItemVariation[];

  // @OneToMany(() => InvoiceItem, invoiceItem => invoiceItem.item)
  // invoiceItems: InvoiceItem[];

  @Column({ default: false, nullable: true })
  is_variant?: boolean;

  @Column({ default: true })
  is_active: boolean;

  // @BeforeInsert()
  // @BeforeUpdate()
  // generateSlugAndBarcode() {
  //   if (this.name) {
  //     this.slug = this.name.trim().toLowerCase().replace(/\s+/g, '-');
  //   }
  //   if (this.id) {
  //     this.barcode = (100000 + this.id).toString();
  //   }
  // }
}
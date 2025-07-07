/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Attribute } from '../attribute.entity/attribute.entity';
import { ItemVariation } from '../item-variation.entity/item-variation.entity';

@Entity()
export class AttributeItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @ManyToOne(() => Attribute, attribute => attribute.items)
  attribute: Attribute;

  @OneToMany(() => ItemVariation, variation => variation.item)
  variations: ItemVariation[];
}
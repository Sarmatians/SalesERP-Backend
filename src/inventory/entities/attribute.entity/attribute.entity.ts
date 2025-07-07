/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AttributeItem } from '../attribute-item.entity/attribute-item.entity';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @OneToMany(() => AttributeItem, attributeItem => attributeItem.attribute)
  items: AttributeItem[];
}
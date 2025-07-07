/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from '../item.entity/item.entity';
import { ItemVariation } from '../item-variation.entity/item-variation.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({nullable: true})
  address: string;

  @Column({nullable: true})
  link: string;

  @OneToMany(() => Item, item => item.location)
  items: Item[];

  @OneToMany(() => ItemVariation, variation => variation.location)
  itemVariations: ItemVariation[];
  
}

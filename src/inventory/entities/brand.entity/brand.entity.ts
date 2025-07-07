/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Timestamp, CreateDateColumn } from 'typeorm';
import { Item } from '../item.entity/item.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created: Timestamp;

  @Column()
  slug: string;

  @OneToMany(() => Item, item => item.brand)
  items: Item[];

  
}

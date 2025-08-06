/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Item } from '../item.entity/item.entity';

@Entity()
export class ItemEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, item => item.id, { nullable: false, onDelete: 'CASCADE' })
  item: Item;

  @Column()
  action: 'created' | 'updated';

  @Column({ type: 'int' })
  createdQuantity: number;

  @Column({ type: 'int' })
  quantityChanged: number;

  @Column({ type: 'int' })
  currentQuantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


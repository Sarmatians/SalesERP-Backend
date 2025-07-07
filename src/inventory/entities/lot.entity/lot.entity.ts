/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Item } from '../item.entity/item.entity';

@Entity()
export class Lot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(({ nullable: true }))
  lot_no: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created: Date;

  @Column(({ nullable: true }))
  total_quantity: number;

  @OneToMany(() => Item, item => item.lot)
  items: Item[];
}

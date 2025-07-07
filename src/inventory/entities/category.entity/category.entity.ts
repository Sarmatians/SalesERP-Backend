/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,CreateDateColumn, Timestamp, JoinColumn } from 'typeorm';
import { Item } from '../item.entity/item.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: "0" })
  quantity: number;

  @CreateDateColumn()
  created: Timestamp;

  @Column({ nullable: true })
  slug: string;

  // @ManyToOne(() => Category, category => category.children)
  // parentCategory: Category;

  @ManyToOne(() => Category, category => category.children)
  @JoinColumn({ name: 'parentCategoryId' }) 
  parentCategory: Category;

  @Column({ nullable: true }) 
  parentCategoryId: number;

  @OneToMany(() => Category, category => category.parentCategory)
  children: Category[];

  @OneToMany(() => Item, item => item.category)
  items: Item[];

  @Column({ default: false })
  is_pations: boolean;
}

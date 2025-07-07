/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, Timestamp } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created: Timestamp;

  @Column()
  slug: string;

  @ManyToOne(() => Tag, tag => tag.children)
  parentTag: Tag;

  @OneToMany(() => Tag, tag => tag.parentTag)
  children: Tag[];
}

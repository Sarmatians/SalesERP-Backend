/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Designation } from '../designation.entity/designation.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Designation, designation => designation.department)
  designations: Designation[];
}

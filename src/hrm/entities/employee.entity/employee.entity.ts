/* eslint-disable prettier/prettier */


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Designation } from '../designation.entity/designation.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  phone: string;

  @ManyToOne(() => Designation, designation => designation.employees)
  designation: Designation;
}

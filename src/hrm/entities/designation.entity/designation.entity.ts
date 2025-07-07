/* eslint-disable prettier/prettier */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../department.entity/department.entity';
import { Employee } from '../employee.entity/employee.entity';

@Entity()
export class Designation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Department, department => department.designations)
  department: Department;

  @OneToMany(() => Employee, employee => employee.designation)
  employees: Employee[];
}

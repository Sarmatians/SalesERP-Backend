/* eslint-disable prettier/prettier */

import { Roles } from "src/utility/common/user-role.enum";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @Column({type: "enum",enum: Roles, array: true, default:[Roles.USER]})
    roles: Roles[]; 

    @CreateDateColumn()
    create_at: Timestamp

    @UpdateDateColumn()
    updated_at: Timestamp




}

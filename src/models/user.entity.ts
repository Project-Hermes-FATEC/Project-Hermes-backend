// src/models/user.entity.ts
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Token from "./token.entity"
import Checklist from "./checklist.entity"
import Phone from "./phone.entity"

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @OneToMany(() => Token, token => token.user)
    tokens?: Token[]

    @OneToMany(() => Checklist, checklist => checklist.user)
    checklists!: Checklist[]

    @OneToMany(() => Phone, phone => phone.user)
    phone!: Phone[]
}
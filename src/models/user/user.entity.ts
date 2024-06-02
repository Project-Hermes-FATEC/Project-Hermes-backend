import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm"
import Token from "./token.entity"

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ unique: true })
    userId!: string

    @Column({ default: 'user' })
    type!: string

    @Column({ name: 'user_id' })
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    phone?: string

    @OneToMany(() => Token, token => token.user)
    tokens?: Token[]
}
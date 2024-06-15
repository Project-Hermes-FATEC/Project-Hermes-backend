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

    @Column({type: 'blob', nullable: true})
    profile?: Blob

    @Column()
    password!: string

    @Column({ nullable: true })
    phone?: string

    @OneToMany(() => Token, token => token.user)
    tokens?: Token[]
}
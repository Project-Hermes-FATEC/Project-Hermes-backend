import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import Checklist from "./checklist/checklist.entity"

@Entity()
export default class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    type!: string

    @Column()
    description!: string

    @Column('blob', {nullable: true})
    image?: Blob

    @OneToOne(() => Checklist)
    @JoinColumn()
    checklist!: Checklist
}
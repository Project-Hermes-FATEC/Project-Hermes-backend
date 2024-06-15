import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, OneToMany } from "typeorm"
import Product from "../product.entity"
import User from "../user/user.entity"
import CheckListSales from "../sales/checklistSales"

@Entity()
export default class Sales extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({default: new Date(Date.now()).toLocaleString()})
    createdDate!: Date

    @Column()
    salesNumber!: number

    @ManyToOne(() => User)
    userId?: User

    @ManyToOne(() => Product)
    @JoinColumn()
    product?: Product

    @OneToMany(() => CheckListSales, checklistsales => checklistsales.sales)
    @JoinColumn()
    checklistsales!: CheckListSales[]
}
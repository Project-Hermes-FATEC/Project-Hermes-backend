import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToOne, Column, OneToMany, JoinColumn } from "typeorm"
import User from "../user/user.entity"
import Checklist from "../checklist/checklist.entity"
import Sales from "../sales/sales.entity"
import StepVerify from "../checklist/verification.entity"

@Entity()
export default class CheckListSales extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    type!: string

    @Column({ default: false })
    completed!: boolean

    @Column({ nullable: true })
    dateFinished!: Date

    @Column({ default: 0 })
    currentStep!: Number

    @ManyToOne(() => User, { nullable: true })
    userIdTec?: User 

    @OneToMany(() => StepVerify, step => step.checklistsales)
    stepVerify?: StepVerify[] 

    @ManyToOne(() => Checklist)
    @JoinColumn()
    checklist!: Checklist

    @ManyToOne(() => Sales, sales => sales.checklistsales)
    sales!: Sales
}
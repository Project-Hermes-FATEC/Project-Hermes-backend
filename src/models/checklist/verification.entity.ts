import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToOne, Column, OneToMany, JoinColumn } from "typeorm"
import ChecklistItem from "./checklistItem.entity"
import CheckListSales from "../sales/checklistSales"

@Entity()
export default class StepVerify extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    dateCompleted!: Date

    @Column({ type: 'blob' })
    image!: Blob

    @ManyToOne(() => CheckListSales, checklistsales => checklistsales.id)
    checklistsales!: CheckListSales

    @OneToOne(() => ChecklistItem)
    @JoinColumn()
    checklist!: ChecklistItem
}
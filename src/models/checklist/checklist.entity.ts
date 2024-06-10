import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import ChecklistItem from "./checklistItem.entity"

@Entity()
export default class Checklist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    description!: string

    @OneToMany(() => ChecklistItem, item => item.checklist)
    items!: ChecklistItem[]
}
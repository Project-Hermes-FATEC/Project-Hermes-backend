import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import Checklist from "./checklist.entity"

@Entity()
export default class ChecklistItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    description!: string

    @ManyToOne(() => Checklist, checklist => checklist.items)
    checklist!: Checklist
}
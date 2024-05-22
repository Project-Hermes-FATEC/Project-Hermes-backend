import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import User from "./user.entity"
import ChecklistItem from "./checklistItem"

@Entity()
export default class Checklist extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    description!: string

    @Column({ default: false })
    completed!: boolean

    @Column({ name: 'user_id' })
    userId!: number

    @ManyToOne(() => User, user => user.checklists)
    user!: User

    @OneToMany(() => ChecklistItem, item => item.checklist, { cascade: true })
    items!: ChecklistItem[]
}
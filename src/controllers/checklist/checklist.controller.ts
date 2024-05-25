import { Request, Response } from "express"
import Checklist from '../../models/checklist.entity'
import ChecklistItem from '../../models/checklistItem'

export default class ChecklistController {
    static async store(req: Request, res: Response) {
        const { title, description, items } = req.body
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if (!title) return res.status(400).json({ error: 'Título é obrigatório!' })
        if (!description) return res.status(400).json({ error: 'Descrição é obrigatória!' })
        if (!Array.isArray(items)) return res.status(400).json({ error: 'Itens são obrigatórios e devem ser uma lista!' })

        const checklist = new Checklist()
        checklist.title = title
        checklist.description = description
        checklist.userId = Number(userId)

        const checklistItems = items.map(item => {
            const checklistItem = new ChecklistItem()
            checklistItem.description = item.description
            checklistItem.completed = item.completed || false
            checklistItem.checklist = checklist
            return checklistItem
        })

        checklist.items = checklistItems

        await checklist.save()

        return res.status(201).json(checklist)
    }

    static async index(req: Request, res: Response) {
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })
        
        const checklists = await Checklist.find({
            where: { userId: Number(userId) },
            relations: ['items']
        })
        return res.status(200).json(checklists)
    }

    static async show(req: Request, res: Response) {
        const { id } = req.params
        const { userId } = req.headers
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const checklist = await Checklist.findOne({
            where: { id: Number(id), userId: Number(userId) },
            relations: ['items']
        })

        if (!checklist) {
            return res.status(404).json({ error: 'Não encontrado!' })
        }

        return res.json(checklist)
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params
        const { userId } = req.headers
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const checklist = await Checklist.findOne({
            where: { id: Number(id), userId: Number(userId) }
        })

        if (!checklist) {
            return res.status(404).json({ error: 'Não encontrado!' })
        }

        await checklist.remove()
        return res.status(204).send()
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { title, description, items } = req.body
        const { userId } = req.headers

        if (!title) return res.status(400).json({ error: 'O título é obrigatório!' })
        if (!description) return res.status(400).json({ error: 'A descrição é obrigatória!' })
        if (!Array.isArray(items)) return res.status(400).json({ error: 'Itens são obrigatórios e devem ser uma lista!' })

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }

        const checklist = await Checklist.findOne({
            where: { id: Number(id), userId: Number(userId) },
            relations: ['items']
        })

        if (!checklist) {
            return res.status(404).json({ error: 'Não encontrado!' })
        }

        checklist.title = title
        checklist.description = description

        await ChecklistItem.remove(checklist.items)

        const checklistItems = items.map(item => {
            const checklistItem = new ChecklistItem()
            checklistItem.description = item.description
            checklistItem.completed = item.completed || false
            checklistItem.checklist = checklist
            return checklistItem
        })

        checklist.items = checklistItems

        await checklist.save()

        return res.json(checklist)
    }
}
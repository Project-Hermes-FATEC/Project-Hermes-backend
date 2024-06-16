import { Request, Response } from "express"
import Checklist from '../../models/checklist/checklist.entity'
import ChecklistItem from '../../models/checklist/checklistItem.entity'
import Product from "../../models/product.entity";

export default class ChecklistController {
    static async store(req: Request, res: Response) {
        const { title, description, items } = req.body;

        if (!title) return res.status(400).json({ error: 'Título é obrigatório!' })
        if (!description) return res.status(400).json({ error: 'Descrição é obrigatória!' })
/*         if (!items) return res.status(400).json({ error: 'Itens são obrigatórios e devem ser uma lista!' })
 */
        const checklist = new Checklist();
        checklist.title = title;
        checklist.description = description;

        await checklist.save();

/*         if (!checklist) return res.status(500).json({ error: "Problema ao registrar checklist" });

        items.map((item: { description: string; order: number }) => {
            const checklistItem = new ChecklistItem();

            checklistItem.description = item.description;
            checklistItem.checklist = checklist;

            checklistItem.save();

            checklist.items?.push(checklistItem);

            return checklistItem;
        }); */

        await checklist.save();
        return res.status(201).json(checklist);
    }

    static async addItem(req: Request, res: Response) {
        const { id } = req.params;
        const { description } = req.body;

        if (!id || !description) return res.status(400).json({ error: 'Preencha todos os campos!' });

        const checklist = await Checklist.findOneBy({ id: Number(id) });

        if (!checklist) return res.status(400).json({ error: 'Checklist não existe' });

        const item = new ChecklistItem();

        item.description = description;
        item.checklist = checklist;

        item.save();

        return res.status(201).json(item);
    }

    static async show(req: Request, res: Response) {
        const checklists = await Checklist.find({ relations: ['items'] })

        if (!checklists) return res.status(400).json({ error: 'Não encontrado nenhuma checklist' })

        return res.status(200).json(checklists);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const { userId } = req.headers;

        if (!id || isNaN(Number(id))) return res.status(400).json({ error: 'Preencha os campos obrigatórios!' });
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

        const checklist = await Checklist.findOne({ where: { id: Number(id) }, relations: ['items'] });

        if (!checklist) return res.status(404).json({ error: 'Check list não encontrado!' });

        if (checklist.items) {
            await checklist.items.map(async item => {
                await item.remove();
            });

            await checklist.save();
        }

        await checklist.remove();
        return res.status(200).send('Check list apagada com sucesso!');
    }

    static async deleteItem(req: Request, res: Response) {
        const { itemId, checkListId } = req.params;
        const { userId } = req.headers;

        if (!itemId || isNaN(Number(itemId)) || !checkListId || isNaN(Number(checkListId))) return res.status(400).json({ error: 'Preencha os campos obrigatórios!' });
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

        const item = await ChecklistItem.findOneBy({ id: Number(itemId), checklist: { id: Number(checkListId) } });

        if (!item) return res.status(404).json({ error: 'Item não encontrado!' });

        await item.remove();
        return res.status(200).send('Item removido com sucesso!');
    }

    static async updateItem(req: Request, res: Response) {
        const { itemId, checkListId } = req.params;
        const { userId } = req.headers;
        const { description } = req.body

        if (!itemId || isNaN(Number(itemId)) || !checkListId || isNaN(Number(checkListId))) return res.status(400).json({ error: 'Preencha os campos obrigatórios!' });
        if (!description) return res.status(400).json({ error: 'A descrição é obrigatória!' })
        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const item = await ChecklistItem.findOneBy({ id: Number(itemId), checklist: { id: Number(checkListId) } });

        if (!item) return res.status(404).json({ error: 'Item não encontrado!' });

        item.description = description;

        await item.save();
        return res.status(200).send('Item atualizado com sucesso!');
    }
}
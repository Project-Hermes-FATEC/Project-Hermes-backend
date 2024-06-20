import { Request, Response } from 'express'
import Product from '../../models/product.entity';
import Checklist from '../../models/checklist/checklist.entity';

export default class ProductController {
    static async get(req: Request, res: Response) {
        const products = await Product.find({ relations: ['checklist.items'] });

        if (!products) res.status(200).json();

        return res.status(201).json(products);
    }

    static async store(req: Request, res: Response) {
        const { name, description, type, image, checklist } = req.body;

        if (!name || !type || !description) return res.status(400).json({ error: "Todos os campos são obrigatórios" });

        const check = checklist ?? await Checklist.findOneBy({ id: Number(checklist.id) });

        const checkName = await Product.findOneBy({ name: name });

        if (checkName) return res.status(400).json({ error: "Esse produto já existe!" });;

        const product = new Product();

        product.name = name;
        product.description = description;
        product.type = type;
        product.image = image ?? image;
        product.checklist = check ?? check;

        await product.save()

        return res.status(201).json(product)
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, type, image, checklist } = req.body;

        if (!id || !name && !type && !description && !checklist && !image) return res.status(400).json({ error: "Nenhum campo preenchido!" });

        const product = await Product.findOneBy({ id: Number(id) });

        if (!product) return res.status(400).json({ error: 'Nenhum produto encontrado!' });

        const findChecklist = await Checklist.findOneBy({ id: checklist.id ?? checklist.id });
        
        product.name = name ? name : product.name;
        product.description = description ? description : product.description;
        product.type = type ? type : product.type;
        product.image = image ? image : product.image;
        product.checklist = findChecklist ? findChecklist : product.checklist;
        

        await product.save();

        return res.status(200).json();
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) return res.status(400).json({ error: "Preencha o identificador do produto!" });

        const product = await Product.findOneBy({ id: Number(id) });

        if (!product) return res.status(400).json({ error: 'Produto não encontrado!' });

        await product.remove();

        return res.status(200).json();
    }
}
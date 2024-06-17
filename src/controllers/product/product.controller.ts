import { Request, Response } from 'express'
import Product from '../../models/product.entity';
import Checklist from '../../models/checklist/checklist.entity';

export default class ProductController {
    static async get(req: Request, res: Response){
        const products = await Product.find({relations: ['checklist.items']});

        if(!products) res.status(400).json({ error: 'Nenhum produto cadastrado' });

        return res.status(201).json(products);
    }

    static async store(req: Request, res: Response) {
        const { name, description, type, image, checklist } = req.body;

        if (!name || !type || !description) return res.status(400).json({ error: "Todos os campos são obrigatórios" });

        const check = checklist ?? await Checklist.findOneBy({ id: Number(checklist.id) })

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
        const { id, name, description, type, image } = req.body;

        if (!name && !type && !description) return res.status(400).json({ error: "Nenhum campo preenchido!" });

        const product = await Product.findOneBy({ id });
        
        if(!product) return res.status(400).json({ error: 'Nenhum produto encontrado!' });

        product.name = name?? product.name;
        product.description = description?? product.description;
        product.type = type?? product.type;
        product.image = image?? product.image;
    }
}
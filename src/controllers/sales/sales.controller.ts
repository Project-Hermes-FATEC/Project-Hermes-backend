import { Request, Response } from "express"
import Product from "../../models/product.entity";
import Sales from "../../models/sales/sales.entity";
import User from "../../models/user/user.entity";
import CheckListSales from "../../models/sales/checklistSales";
import Checklist from "../../models/checklist/checklist.entity";

export default class SalesController {
    static async create(req: Request, res: Response) {
        const { userId } = req.headers;
        const { productId } = req.params;
        const { salesNumber, transporterId } = req.body;

        if(!userId || !productId || !salesNumber || !transporterId) return res.status(400).json({error: "Preencha todos os campos!"})

        const salesExist = await Sales.findOneBy({ salesNumber });

        if(salesExist) return res.status(400).json({error: "Já existe uma venda com esse número!"});

        const user = await User.findOneBy({ id: Number(userId) });

        if(!user) return res.status(400).json({ error: "Usuário não existe!"}); 

        const product = await Product.findOne({ where: { id: Number(productId) }, relations: ["checklist"] })

        if(!product) return res.status(400).json({ error: "Produto não existe!" });      

        const sales = new Sales();
        
        sales.salesNumber = salesNumber;
        sales.userId = user;
        sales.product = product;

        await sales.save();

        //Adding all the checklists necessary
        const checklistExit = new CheckListSales();
        checklistExit.checklist = product.checklist;
        checklistExit.sales = sales;
        checklistExit.type = 'Exit';
        await checklistExit.save();

        const checklistArrive = new CheckListSales();
        checklistArrive.checklist = product.checklist;
        checklistArrive.sales = sales;
        checklistArrive.type = 'Arrive';
        await checklistArrive.save();

        const transporter = await Checklist.findOneBy({ id: Number(transporterId) });

        if(!transporter) return res.status(400).json({error: "Checklist da transportadora não encontrado"});

        try{ 
        const checklistTransport = new CheckListSales();
        checklistTransport.checklist = transporter;
        checklistTransport.sales = sales;
        checklistTransport.type = 'Transport';
        await checklistTransport.save(); 
        } catch(err){
            console.log(err)
        }

        return res.status(200).json();

    }

    static async get(req: Request, res: Response){
        const sales = await Sales.find({ relations: ["product", "userId", "checklistsales.checklist"] });
        
        if(!sales) return res.status(400).json({ error: 'Não há vendas para mostrar'});

        return res.status(200).json(sales);
    }
}
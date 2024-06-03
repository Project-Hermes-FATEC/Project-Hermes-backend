import { Request, Response } from 'express';
import User from '../../models/user/user.entity';
import bcrypt from 'bcrypt'

export default class UserController {
    static async store(req: Request, res: Response) {
        const { name, email, password, phone, type, userId } = req.body;

        if (!name || !email || !password || !userId || !type) return res.status(400).json({ error: "Preencha todos os campos obrigatórios" });
        
        const userIdCheck = await User.findOneBy({ userId });

        if(userIdCheck) return res.status(400).json({ error: "User ID já está cadastrado!" });

        try {
            const user = new User();

            user.name = name;
            user.email = email;
            user.phone = phone;
            user.password = bcrypt.hashSync(password, 10);
            user.userId = userId;
            user.type = type ?? user.type

            await user.save()

            return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro interno do servidor' })
        }
    }
    
    static async get(req: Request, res: Response){
        const { userId } = req.headers

        if(!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const user = await User.findOneBy({ id: Number(userId) })

        if(!user) return res.status(400).json({error: 'Usuário não encontrado!'})

        return res.status(201).json({ user: { name: user.name, email: user.email, phone: user.phone }})
    }

    static async showAll(req: Request, res: Response){
        const user = await User.find();

        if(!user) return res.status(400).json({error: 'Nenhum usuário encontrado!'})

        return res.status(201).json(user);
    }

    static async update(req: Request, res: Response){
        const { userId } = req.headers;
        const { id, email, phone, type } = req.body;

        if(!userId) return res.status(400).json({error: 'O user id é obrigatório!'});

        const user = await User.findOneBy({ id: Number(id)?? Number(userId) });

        if(!user) return res.status(400).json({error: 'Usuário não encontrado'});
        
        user.email = email?? user.email;
        user.phone = phone?? user.phone;
        user.type = type?? user.type; 
        
        user.save();

        return res.status(200).json(user);
    }

    static async changePass(req: Request, res: Response){
        const { userId } = req.headers;
        const { oldpass, newpass } = req.body;

        if(!oldpass || !newpass) return res.status(400).json({ error: 'Preencha os campos obrigatórios' });

        const user = await User.findOneBy({ id: Number(userId) });

        if(!user) return res.status(401).json({ error: 'Usuário não encontrado!' });

        const passCheck = await bcrypt.compareSync(oldpass, user.password);
        if(!passCheck) return res.status(401).json({ error: 'Senha antiga está incorreta!' });

        user.password = bcrypt.hashSync(newpass, 10)
        await user.save();

        return res.status(200);
    }
}
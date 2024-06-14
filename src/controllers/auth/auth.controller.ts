import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../../models/user/user.entity'
import Token from '../../models/user/token.entity'

export default class AuthController {
    static async login(req: Request, res: Response) {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).json({ error: "Email e senha são obrigatórios" })

        const user = await User.findOneBy({ email })
        if (!user) return res.status(401).json({ error: "Usuário ou senha inválida" })

        const passwCheck = await bcrypt.compareSync(password, user.password)
        if (!passwCheck) return res.status(401).json({ error: "Usuário ou senha inválida" })

        await Token.delete({ user: { id: user.id } })

        const token = new Token()
        const stringRand = user.id + new Date().toString()
        token.token = bcrypt.hashSync(stringRand, 1).slice(-20)
        token.expiresAt = new Date(Date.now() + 60 * 60 * 1000)
        token.refreshToken = bcrypt.hashSync(stringRand + 2, 1).slice(-20)

        token.user = user
        await token.save()

        res.cookie('token', token.token, { httpOnly: true, secure: true, sameSite: 'none' });
        return res.status(200).json({
            name: user.name,
            email: user.email,
            type: user.type,
            userId: user.userId,
            profile: user.profile
        })
    }

    static async refresh(req: Request, res: Response) {
        const { token } = req.cookies;

        if (!token) return res.status(400).json({ error: 'O refresh token é obrigatório' });

        const authorization = await Token.findOneBy({ token });

        if (!authorization) return res.status(401).json({ error: 'Refresh token inválido' });

        if (authorization.expiresAt > new Date()) {
            return res.status(401).json({ error: 'Refresh token ainda está disponível' });
        }

        authorization.token = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20);
        authorization.refreshToken = bcrypt.hashSync(Math.random().toString(36), 1).slice(-20);
        authorization.expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        await authorization.save();

        res.cookie('token', authorization.token, { httpOnly: true, secure: true, sameSite: 'none' })
        return res.status(200).json('O token foi atualizado');
    }

    static async logout(req: Request, res: Response) {
        const { token } = req.cookies;

        if (!token) return res.status(400).json({ error: 'O token é obrigatório' })

        const userToken = await Token.findOneBy({ token: token })
        if (!userToken) return res.status(400).json({ error: 'Token inválido' })

        await userToken.remove()

        res.clearCookie('token')

        return res.status(204).json()
    }

    static async verify(req: Request, res: Response) {
        const { token } = req.cookies

        if (!token) return res.status(400).json({ error: 'O token é obrigatório' })

        const userToken = await Token.findOne({ where: {token: token}, relations: ['user'] })
        if (!userToken) return res.status(401).json({ error: 'Token inválido' })

        if (userToken.expiresAt < new Date()) {
            await userToken.remove()
            return res.status(401).json({ error: 'Token expirado' })
        }

        return res.status(200).json(userToken.user.type)
    }
}
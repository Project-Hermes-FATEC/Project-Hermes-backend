"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_entity_1 = __importDefault(require("../../models/user.entity"));
const token_entity_1 = __importDefault(require("../../models/token.entity"));
class AuthController {
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, phone } = req.body;
            if (!name)
                return res.status(400).json({ error: "Nome obrigatório" });
            if (!email)
                return res.status(400).json({ error: "Email obrigatório" });
            if (!password)
                return res.status(400).json({ error: "Senha obrigatória" });
            if (!phone)
                return res.status(400).json({ error: "Telefone obrigatório" });
            try {
                const user = new user_entity_1.default();
                user.name = name;
                user.email = email;
                user.phone = phone; // Salvando o telefone
                user.password = bcrypt_1.default.hashSync(password, 10);
                yield user.save();
                return res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone // Retornando o telefone no response
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, phone } = req.body; // Adicionando a opção de login com telefone
            try {
                let user;
                if (!email && !phone)
                    return res.status(400).json({ error: 'Email ou telefone é obrigatório!' });
                if (email) {
                    user = yield user_entity_1.default.findOneBy({ email });
                }
                else {
                    user = yield user_entity_1.default.findOneBy({ phone });
                }
                if (!user)
                    return res.status(401).json({ error: 'Usuário não encontrado!' });
                const passwCheck = bcrypt_1.default.compareSync(password, user.password);
                if (!passwCheck)
                    return res.status(401).json({ error: 'Senha inválida!' });
                yield token_entity_1.default.delete({ user: { id: user.id } });
                const token = new token_entity_1.default();
                const stringRand = Math.random().toString(36);
                token.token = bcrypt_1.default.hashSync(stringRand, 1).slice(-20);
                token.expiresAt = new Date(Date.now() + 60 * 60 * 1000);
                token.refreshToken = bcrypt_1.default.hashSync(stringRand + 2, 1).slice(-20);
                token.user = user;
                yield token.save();
                return res.json({
                    token: token.token,
                    expiresAt: token.expiresAt,
                    refreshToken: token.refreshToken
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    }
    static refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            if (!authorization)
                return res.status(400).json({ error: 'O refresh token é obrigatório' });
            try {
                const token = yield token_entity_1.default.findOneBy({ refreshToken: authorization });
                if (!token)
                    return res.status(401).json({ error: 'Refresh token inválido' });
                if (token.expiresAt < new Date()) {
                    yield token.remove();
                    return res.status(401).json({ error: 'Refresh token expirado' });
                }
                const stringRand = Math.random().toString(36);
                token.token = bcrypt_1.default.hashSync(stringRand, 1).slice(-20);
                token.refreshToken = bcrypt_1.default.hashSync(stringRand + 2, 1).slice(-20);
                token.expiresAt = new Date(Date.now() + 60 * 60 * 1000);
                yield token.save();
                return res.json({
                    token: token.token,
                    expiresAt: token.expiresAt,
                    refreshToken: token.refreshToken
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorization } = req.headers;
            if (!authorization)
                return res.status(400).json({ error: 'O token é obrigatório' });
            const userToken = yield token_entity_1.default.findOneBy({ token: authorization });
            if (!userToken)
                return res.status(401).json({ error: 'Token inválido' });
            yield userToken.remove();
            return res.status(204).json();
        });
    }
}
exports.default = AuthController;

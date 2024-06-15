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
const user_entity_1 = __importDefault(require("../../models/user/user.entity"));
const token_entity_1 = __importDefault(require("../../models/user/token.entity"));
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({ error: "Email e senha são obrigatórios" });
            const user = yield user_entity_1.default.findOneBy({ email });
            if (!user)
                return res.status(401).json({ error: "Usuário ou senha inválida" });
            const passwCheck = yield bcrypt_1.default.compareSync(password, user.password);
            if (!passwCheck)
                return res.status(401).json({ error: "Usuário ou senha inválida" });
            yield token_entity_1.default.delete({ user: { id: user.id } });
            const token = new token_entity_1.default();
            const stringRand = user.id + new Date().toString();
            token.token = bcrypt_1.default.hashSync(stringRand, 1).slice(-20);
            token.expiresAt = new Date(Date.now() + 60 * 60 * 1000);
            token.refreshToken = bcrypt_1.default.hashSync(stringRand + 2, 1).slice(-20);
            token.user = user;
            yield token.save();
            res.cookie('token', token.token, { httpOnly: true, secure: true, sameSite: 'none' });
            return res.json({
                name: token.user.name,
                email: email,
                token: token.token,
                expiresAt: token.expiresAt,
                refreshToken: token.refreshToken
            });
        });
    }
    static refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.cookies;
            if (!token)
                return res.status(400).json({ error: 'O refresh token é obrigatório' });
            const authorization = yield token_entity_1.default.findOneBy({ refreshToken: token });
            if (!authorization)
                return res.status(401).json({ error: 'Refresh token inválido' });
            if (authorization.expiresAt < new Date()) {
                yield token.remove();
                return res.status(401).json({ error: 'Refresh token expirado' });
            }
            authorization.token = bcrypt_1.default.hashSync(Math.random().toString(36), 1).slice(-20);
            authorization.refreshToken = bcrypt_1.default.hashSync(Math.random().toString(36), 1).slice(-20);
            authorization.expiresAt = new Date(Date.now() + 60 * 60 * 1000);
            authorization.userId;
            yield authorization.save();
            res.cookie('token', authorization.token, { httpOnly: true, secure: true, sameSite: 'none' });
            return res.json({
                token: authorization.token,
                expiresAt: authorization.expiresAt,
                refreshToken: authorization.refreshToken
            });
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.cookies;
            if (!token)
                return res.status(400).json({ error: 'O token é obrigatório' });
            const userToken = yield token_entity_1.default.findOneBy({ token: token });
            if (!userToken)
                return res.status(401).json({ error: 'Token inválido' });
            yield userToken.remove();
            res.clearCookie('token');
            return res.status(204).json();
        });
    }
    static verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.cookies;
            if (!token)
                return res.status(400).json({ error: 'O token é obrigatório' });
            const userToken = yield token_entity_1.default.findOneBy({ token: token });
            if (!userToken)
                return res.status(401).json({ error: 'Token inválido' });
            if (userToken.expiresAt < new Date()) {
                yield userToken.remove();
                return res.status(401).json({ error: 'Token expirado' });
            }
            return res.status(200).json();
        });
    }
}
exports.default = AuthController;

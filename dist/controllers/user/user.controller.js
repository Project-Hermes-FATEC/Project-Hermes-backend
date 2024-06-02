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
const user_entity_1 = __importDefault(require("../../models/user/user.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, phone, type } = req.body;
            if (!name || !email || !password || !phone)
                return res.status(400).json({ error: "Preencha todos os campos obrigatórios" });
            try {
                const user = new user_entity_1.default();
                user.name = name;
                user.email = email;
                user.phone = phone;
                user.password = bcrypt_1.default.hashSync(password, 10);
                user.userId = 'ABC124';
                yield user.save();
                return res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.headers;
            if (!userId)
                return res.status(401).json({ error: 'Usuário não autenticado' });
            const user = yield user_entity_1.default.findOneBy({ id: Number(userId) });
            if (!user)
                return res.status(400).json({ error: 'Usuário não encontrado!' });
            return res.status(201).json({ user: { name: user.name, email: user.email, phone: user.phone } });
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { userId } = req.headers;
            const { id, email, phone, type } = req.body;
            if (!userId)
                return res.status(400).json({ error: 'O user id é obrigatório!' });
            const user = yield user_entity_1.default.findOneBy({ id: (_a = Number(id)) !== null && _a !== void 0 ? _a : Number(userId) });
            if (!user)
                return res.status(400).json({ error: 'Usuário não encontrado' });
            user.email = email !== null && email !== void 0 ? email : user.email;
            user.phone = phone !== null && phone !== void 0 ? phone : user.phone;
            user.type = type !== null && type !== void 0 ? type : user.type;
            user.save();
            return res.status(200).json(user);
        });
    }
    static changePass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.headers;
            const { oldpass, newpass } = req.body;
            if (!oldpass || !newpass)
                return res.status(400).json({ error: 'Preencha os campos obrigatórios' });
            const user = yield user_entity_1.default.findOneBy({ id: Number(userId) });
            if (!user)
                return res.status(401).json({ error: 'Usuário não encontrado!' });
            const passCheck = yield bcrypt_1.default.compareSync(oldpass, user.password);
            if (!passCheck)
                return res.status(401).json({ error: 'Senha antiga está incorreta!' });
            user.password = bcrypt_1.default.hashSync(newpass, 10);
            yield user.save();
            return res.status(200);
        });
    }
}
exports.default = UserController;

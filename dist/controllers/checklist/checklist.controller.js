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
const checklist_entity_1 = __importDefault(require("../../models/checklist.entity"));
const checklistItem_1 = __importDefault(require("../../models/checklistItem"));
class ChecklistController {
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, items } = req.body;
            const { userId } = req.headers;
            if (!userId)
                return res.status(401).json({ error: 'Usuário não autenticado' });
            if (!title)
                return res.status(400).json({ error: 'Título é obrigatório!' });
            if (!description)
                return res.status(400).json({ error: 'Descrição é obrigatória!' });
            if (!Array.isArray(items))
                return res.status(400).json({ error: 'Itens são obrigatórios e devem ser uma lista!' });
            const checklist = new checklist_entity_1.default();
            checklist.title = title;
            checklist.description = description;
            checklist.userId = Number(userId);
            const checklistItems = items.map(item => {
                const checklistItem = new checklistItem_1.default();
                checklistItem.description = item.description;
                checklistItem.completed = item.completed || false;
                checklistItem.checklist = checklist;
                return checklistItem;
            });
            checklist.items = checklistItems;
            yield checklist.save();
            return res.status(201).json(checklist);
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.headers;
            if (!userId)
                return res.status(401).json({ error: 'Usuário não autenticado' });
            const checklists = yield checklist_entity_1.default.find({
                where: { userId: Number(userId) },
                relations: ['items']
            });
            return res.status(200).json(checklists);
        });
    }
    static show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userId } = req.headers;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: 'O id é obrigatório!' });
            }
            if (!userId)
                return res.status(401).json({ error: 'Usuário não autenticado' });
            const checklist = yield checklist_entity_1.default.findOne({
                where: { id: Number(id), userId: Number(userId) },
                relations: ['items']
            });
            if (!checklist) {
                return res.status(404).json({ error: 'Não encontrado!' });
            }
            return res.json(checklist);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { userId } = req.headers;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: 'O id é obrigatório!' });
            }
            if (!userId)
                return res.status(401).json({ error: 'Usuário não autenticado' });
            const checklist = yield checklist_entity_1.default.findOne({
                where: { id: Number(id), userId: Number(userId) }
            });
            if (!checklist) {
                return res.status(404).json({ error: 'Não encontrado!' });
            }
            yield checklist.remove();
            return res.status(204).send();
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, description, items } = req.body;
            const { userId } = req.headers;
            if (!title)
                return res.status(400).json({ error: 'O título é obrigatório!' });
            if (!description)
                return res.status(400).json({ error: 'A descrição é obrigatória!' });
            if (!Array.isArray(items))
                return res.status(400).json({ error: 'Itens são obrigatórios e devem ser uma lista!' });
            if (!userId)
                return res.status(401).json({ error: 'Usuário não autenticado' });
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ error: 'O id é obrigatório!' });
            }
            const checklist = yield checklist_entity_1.default.findOne({
                where: { id: Number(id), userId: Number(userId) },
                relations: ['items']
            });
            if (!checklist) {
                return res.status(404).json({ error: 'Não encontrado!' });
            }
            checklist.title = title;
            checklist.description = description;
            yield checklistItem_1.default.remove(checklist.items);
            const checklistItems = items.map(item => {
                const checklistItem = new checklistItem_1.default();
                checklistItem.description = item.description;
                checklistItem.completed = item.completed || false;
                checklistItem.checklist = checklist;
                return checklistItem;
            });
            checklist.items = checklistItems;
            yield checklist.save();
            return res.json(checklist);
        });
    }
}
exports.default = ChecklistController;

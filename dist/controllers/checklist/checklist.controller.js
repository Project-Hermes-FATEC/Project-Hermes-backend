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
const checklist_entity_1 = __importDefault(require("../../models/checklist/checklist.entity"));
const checklistItem_entity_1 = __importDefault(require("../../models/checklist/checklistItem.entity"));
const product_entity_1 = __importDefault(require("../../models/product.entity"));
class ChecklistController {
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.headers;
            const { title, description, items } = req.body;
            if (!title)
                return res.status(400).json({ error: 'Título é obrigatório!' });
            if (!description)
                return res.status(400).json({ error: 'Descrição é obrigatória!' });
            if (!items)
                return res.status(400).json({ error: 'Itens são obrigatórios e devem ser uma lista!' });
            const checklist = new checklist_entity_1.default();
            checklist.title = title;
            checklist.description = description;
            yield checklist.save();
            if (!checklist)
                return res.status(500).json({ error: "Problema ao registrar checklist" });
            items.map((item) => {
                var _a;
                const checklistItem = new checklistItem_entity_1.default();
                checklistItem.description = item.description;
                checklistItem.checklist = checklist;
                checklistItem.save();
                (_a = checklist.items) === null || _a === void 0 ? void 0 : _a.push(checklistItem);
                return checklistItem;
            });
            yield checklist.save();
            if (id) {
                const product = yield product_entity_1.default.findOneBy({ id: Number(id) });
                product.checklist = checklist;
                product === null || product === void 0 ? void 0 : product.save();
            }
            return res.status(201).json(checklist);
        });
    }
}
exports.default = ChecklistController;

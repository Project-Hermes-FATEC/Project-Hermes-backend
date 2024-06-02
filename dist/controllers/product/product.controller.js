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
const product_entity_1 = __importDefault(require("../../models/product.entity"));
class ProductController {
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_entity_1.default.find({ relations: ['checklist.items'] });
            if (!products)
                res.status(400).json({ error: 'Nenhum produto cadastrado' });
            return res.status(201).json(products);
        });
    }
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, type, image } = req.body;
            if (!name || !type || !description)
                return res.status(400).json({ error: "Todos os campos são obrigatórios" });
            const product = new product_entity_1.default();
            product.name = name;
            product.description = description;
            product.type = type;
            product.image = image;
            yield product.save();
            return res.status(201).json(product);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, description, type, image } = req.body;
            if (!name && !type && !description)
                return res.status(400).json({ error: "Nenhum campo preenchido!" });
            const product = yield product_entity_1.default.findOneBy({ id });
            if (!product)
                return res.status(400).json({ error: 'Nenhum produto encontrado!' });
            product.name = name !== null && name !== void 0 ? name : product.name;
            product.description = description !== null && description !== void 0 ? description : product.description;
            product.type = type !== null && type !== void 0 ? type : product.type;
            product.image = image !== null && image !== void 0 ? image : product.image;
        });
    }
}
exports.default = ProductController;

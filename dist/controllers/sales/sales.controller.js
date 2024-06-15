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
const sales_entity_1 = __importDefault(require("../../models/sales/sales.entity"));
const user_entity_1 = __importDefault(require("../../models/user/user.entity"));
const checklistSales_1 = __importDefault(require("../../models/sales/checklistSales"));
const checklist_entity_1 = __importDefault(require("../../models/checklist/checklist.entity"));
class SalesController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = { userId: 1 };
            const { productId } = req.params;
            const { salesNumber, transporterId } = req.body;
            if (!userId || !productId || !salesNumber || !transporterId)
                return res.status(400).json({ error: "Preencha todos os campos!" });
            const salesExist = yield sales_entity_1.default.findOneBy({ salesNumber });
            if (salesExist)
                return res.status(400).json({ error: "Já existe uma venda com esse número!" });
            const user = yield user_entity_1.default.findOneBy({ id: Number(userId) });
            if (!user || isNaN(Number(productId)))
                return res.status(400).json({ error: "Usuário não existe!" + (productId === null || productId === void 0 ? void 0 : productId.toString()) });
            const product = yield product_entity_1.default.findOneBy({ id: Number(productId) });
            if (!product)
                return res.status(400).json({ error: "Produto não existe!" });
            //Adding all the checklists necessary
            const tranporter = yield checklist_entity_1.default.findOneBy({ id: transporterId !== null && transporterId !== void 0 ? transporterId : '' });
            if (!tranporter)
                return;
            const checklistExit = new checklistSales_1.default();
            const checklistArrive = new checklistSales_1.default();
            const checklistTransport = new checklistSales_1.default();
            checklistExit.checklist = product.checklist;
            checklistExit.type = 'Exit';
            yield checklistExit.save();
            checklistArrive.checklist = product.checklist;
            checklistArrive.type = 'Arrive';
            yield checklistArrive.save();
            checklistTransport.checklist = tranporter;
            checklistTransport.type = 'Transport';
            yield checklistTransport.save();
            const sales = new sales_entity_1.default();
            sales.salesNumber = salesNumber;
            sales.userId = user;
            sales.product = product;
            sales.checklistsales = [checklistExit, checklistArrive, checklistTransport];
            yield sales.save();
            return res.status(201);
        });
    }
    static get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sales = yield sales_entity_1.default.find({ relations: ["product", "userId", "checklistsales"] });
            if (!sales)
                return res.status(400).json({ error: 'Não há vendas para mostrar' });
            return res.status(200).json(sales);
        });
    }
}
exports.default = SalesController;

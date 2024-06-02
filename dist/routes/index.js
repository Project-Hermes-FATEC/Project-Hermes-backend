"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checklist_routes_1 = __importDefault(require("./checklist/checklist.routes"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const product_routes_1 = __importDefault(require("./product/product.routes"));
const sales_routes_1 = __importDefault(require("./sales/sales.routes"));
const routes = (0, express_1.Router)();
routes.use('/checklist', checklist_routes_1.default);
routes.use('/auth', auth_routes_1.default);
routes.use('/user', user_routes_1.default);
routes.use('/product', product_routes_1.default);
routes.use('/sales', sales_routes_1.default);
exports.default = routes;

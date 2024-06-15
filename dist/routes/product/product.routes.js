"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const product_controller_1 = __importDefault(require("../../controllers/product/product.controller"));
const productRoutes = (0, express_1.Router)();
productRoutes.get('/', product_controller_1.default.get);
productRoutes.post('/', product_controller_1.default.store);
productRoutes.put('/', auth_middleware_1.default, product_controller_1.default.update);
exports.default = productRoutes;

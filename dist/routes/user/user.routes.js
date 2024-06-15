"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user/user.controller"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const userRoutes = (0, express_1.Router)();
userRoutes.post('/', user_controller_1.default.store);
userRoutes.get('/', auth_middleware_1.default, user_controller_1.default.get);
userRoutes.put('/', auth_middleware_1.default, user_controller_1.default.update);
userRoutes.put('/changePass', auth_middleware_1.default, user_controller_1.default.changePass);
exports.default = userRoutes;

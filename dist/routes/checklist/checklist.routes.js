"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checklist_controller_1 = __importDefault(require("../../controllers/checklist/checklist.controller"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const checklistRoutes = (0, express_1.Router)();
checklistRoutes.post('/', auth_middleware_1.default, checklist_controller_1.default.store);
checklistRoutes.get('/', auth_middleware_1.default, checklist_controller_1.default.index);
checklistRoutes.get('/:id', auth_middleware_1.default, checklist_controller_1.default.show);
checklistRoutes.delete('/:id', auth_middleware_1.default, checklist_controller_1.default.delete);
checklistRoutes.put('/:id', auth_middleware_1.default, checklist_controller_1.default.update);
exports.default = checklistRoutes;

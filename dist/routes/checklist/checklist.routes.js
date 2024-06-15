"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checklist_controller_1 = __importDefault(require("../../controllers/checklist/checklist.controller"));
const checklistRoutes = (0, express_1.Router)();
checklistRoutes.post('/', checklist_controller_1.default.store);
/*checklistRoutes.get('/:id', authMiddleware, ChecklistController.show)
checklistRoutes.delete('/:id', authMiddleware, ChecklistController.delete)
checklistRoutes.put('/:id', authMiddleware, ChecklistController.update) */
exports.default = checklistRoutes;

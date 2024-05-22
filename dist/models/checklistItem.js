"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const checklist_entity_1 = __importDefault(require("./checklist.entity"));
let ChecklistItem = class ChecklistItem extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChecklistItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ChecklistItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ChecklistItem.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => checklist_entity_1.default, checklist => checklist.items),
    __metadata("design:type", checklist_entity_1.default)
], ChecklistItem.prototype, "checklist", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'checklist_id' }),
    __metadata("design:type", Number)
], ChecklistItem.prototype, "checklistId", void 0);
ChecklistItem = __decorate([
    (0, typeorm_1.Entity)()
], ChecklistItem);
exports.default = ChecklistItem;

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
const checklistItem_entity_1 = __importDefault(require("./checklistItem.entity"));
const checklistSales_1 = __importDefault(require("../sales/checklistSales"));
let StepVerify = class StepVerify extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StepVerify.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], StepVerify.prototype, "dateCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'blob' }),
    __metadata("design:type", Blob)
], StepVerify.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => checklistSales_1.default, checklistsales => checklistsales.id),
    __metadata("design:type", checklistSales_1.default)
], StepVerify.prototype, "checklistsales", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => checklistItem_entity_1.default),
    __metadata("design:type", checklistItem_entity_1.default)
], StepVerify.prototype, "checklist", void 0);
StepVerify = __decorate([
    (0, typeorm_1.Entity)()
], StepVerify);
exports.default = StepVerify;

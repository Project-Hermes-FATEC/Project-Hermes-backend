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
const user_entity_1 = __importDefault(require("../user/user.entity"));
const checklist_entity_1 = __importDefault(require("../checklist/checklist.entity"));
const sales_entity_1 = __importDefault(require("../sales/sales.entity"));
const verification_entity_1 = __importDefault(require("../checklist/verification.entity"));
let CheckListSales = class CheckListSales extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CheckListSales.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CheckListSales.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CheckListSales.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], CheckListSales.prototype, "dateFinished", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CheckListSales.prototype, "currentStep", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default, { nullable: true }),
    __metadata("design:type", Object)
], CheckListSales.prototype, "userIdTec", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => verification_entity_1.default, step => step.checklistsales, { nullable: true }),
    __metadata("design:type", Object)
], CheckListSales.prototype, "stepVerify", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => checklist_entity_1.default),
    __metadata("design:type", checklist_entity_1.default)
], CheckListSales.prototype, "checklist", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sales_entity_1.default, sales => sales.checklistsales),
    __metadata("design:type", sales_entity_1.default)
], CheckListSales.prototype, "sales", void 0);
CheckListSales = __decorate([
    (0, typeorm_1.Entity)()
], CheckListSales);
exports.default = CheckListSales;

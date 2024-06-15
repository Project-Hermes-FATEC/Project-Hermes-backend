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
const product_entity_1 = __importDefault(require("../product.entity"));
const user_entity_1 = __importDefault(require("../user/user.entity"));
const checklistSales_1 = __importDefault(require("../sales/checklistSales"));
let Sales = class Sales extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sales.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date(Date.now()).toLocaleString() }),
    __metadata("design:type", Date)
], Sales.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Sales.prototype, "salesNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default),
    __metadata("design:type", user_entity_1.default)
], Sales.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.default),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", product_entity_1.default)
], Sales.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => checklistSales_1.default, checklistsales => checklistsales.sales),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Sales.prototype, "checklistsales", void 0);
Sales = __decorate([
    (0, typeorm_1.Entity)()
], Sales);
exports.default = Sales;

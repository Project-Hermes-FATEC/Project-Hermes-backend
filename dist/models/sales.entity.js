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
const product_entity_1 = __importDefault(require("./product.entity"));
const user_entity_1 = __importDefault(require("./user/user.entity"));
let Sales = class Sales extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sales.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.default, user => user.userId),
    __metadata("design:type", user_entity_1.default)
], Sales.prototype, "userIdSeller", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.default, user => user.userId),
    __metadata("design:type", user_entity_1.default)
], Sales.prototype, "userIdTec", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.default, product => product.id),
    __metadata("design:type", product_entity_1.default)
], Sales.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => checklist_entity_1.default, checklist => checklist.sales, { cascade: true }),
    __metadata("design:type", Array)
], Sales.prototype, "checklist", void 0);
Sales = __decorate([
    (0, typeorm_1.Entity)()
], Sales);
exports.default = Sales;

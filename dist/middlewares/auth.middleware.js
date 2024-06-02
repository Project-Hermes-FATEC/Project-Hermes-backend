"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_entity_1 = __importDefault(require("../models/user/token.entity"));
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.cookies;
        if (!token)
            return res.status(401).json({ error: 'Token não informado' });
        const userToken = yield token_entity_1.default.findOneBy({ token: token });
        if (!userToken)
            return res.status(401).json({ error: 'Token inválido' });
        if (userToken.expiresAt < new Date()) {
            yield userToken.remove();
            return res.status(401).json({ error: 'Token expirado' });
        }
        req.headers.userId = userToken.userId.toString();
        next();
    });
}
exports.default = authMiddleware;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const path_1 = require("path");
const dataBase = new typeorm_1.DataSource({
    type: 'sqlite',
    database: process.env.DATABASE || './src/database/database.sqlite',
    logging: true,
    synchronize: true,
    entities: [
        (0, path_1.join)(__dirname, '..', 'models/*.{ts,js}')
    ]
});
dataBase.initialize()
    .then(() => {
    console.log('Banco de dados iniciado!');
})
    .catch(() => {
    console.log('Falha ao inciar o banco de dados!');
});
exports.default = dataBase;

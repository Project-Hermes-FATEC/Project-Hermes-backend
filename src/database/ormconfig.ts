import { DataSource } from "typeorm"
import { join } from "path"
import UserController from "../controllers/user/user.controller"
const dataBase = new DataSource({
    type: 'sqlite',
    database: process.env.DATABASE || './src/database/database.sqlite',
    logging: true,
    synchronize: true,
    entities: [
        join(__dirname,'..','models/**/*.{ts,js}')
    ]
})

dataBase.initialize()
.then(() => {
    console.log('Banco de dados iniciado!')
    UserController.setup();
})
.catch((err) => {
    console.log('Falha ao inciar o banco de dados!', err)
})

export default dataBase
import { Router } from 'express'
import UserController from '../../controllers/user/user.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const userRoutes = Router()

userRoutes.post('/', UserController.store);
userRoutes.get('/', authMiddleware, UserController.get);
userRoutes.put('/', authMiddleware, UserController.update);
userRoutes.put('/changePass', authMiddleware, UserController.changePass);

export default userRoutes
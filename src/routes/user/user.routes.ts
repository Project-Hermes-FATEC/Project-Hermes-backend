import { Router } from 'express'
import UserController from '../../controllers/user/user.controller'
import authMiddleware from '../../middlewares/auth.middleware'

const userRoutes = Router()

userRoutes.post('/', authMiddleware, UserController.store);
userRoutes.get('/', authMiddleware, UserController.get);
userRoutes.get('/admin', authMiddleware, UserController.showAll);
userRoutes.put('/:id', authMiddleware, UserController.update);
userRoutes.put('/changePass', authMiddleware, UserController.changePass);

export default userRoutes
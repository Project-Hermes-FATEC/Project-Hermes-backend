import { Router } from 'express'
import UserController from '../../controllers/user/user.controller'
import authMiddleware from '../../middlewares/auth.middleware'
import User from '../../models/user/user.entity';

const userRoutes = Router()

userRoutes.post('/', authMiddleware, UserController.store);
userRoutes.get('/', authMiddleware, UserController.get);
userRoutes.get('/admin', authMiddleware, UserController.showAll);
userRoutes.put('/:id', authMiddleware, UserController.update);
userRoutes.get('/resetPass/:id', authMiddleware, UserController.resetPassword);
userRoutes.put('/changePass', authMiddleware, UserController.changePass);

export default userRoutes
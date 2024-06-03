import { Router } from 'express';
import AuthController from '../../controllers/auth/auth.controller';

const authRoutes = Router();

authRoutes.post('/login', AuthController.login);
authRoutes.post('/refresh', AuthController.refresh);
authRoutes.get('/logout', AuthController.logout);
authRoutes.get('/verify', AuthController.verify);

export default authRoutes;

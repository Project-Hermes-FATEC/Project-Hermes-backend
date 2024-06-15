import { Router } from "express";
import checklistRoutes from './checklist/checklist.routes';
import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";
import productRoutes from "./product/product.routes";
import salesRouter from "./sales/sales.routes";

const routes = Router();

routes.use('/checklist', checklistRoutes);
routes.use('/auth', authRoutes);
routes.use('/user', userRoutes);
routes.use('/product', productRoutes);
routes.use('/sales', salesRouter);

export default routes;
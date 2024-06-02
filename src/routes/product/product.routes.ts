import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import ProductController from '../../controllers/product/product.controller';

const productRoutes = Router();

productRoutes.get('/', ProductController.get);
productRoutes.post('/', ProductController.store);
productRoutes.put('/', authMiddleware, ProductController.update);

export default productRoutes
import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import ProductController from '../../controllers/product/product.controller';

const productRoutes = Router();

productRoutes.get('/', authMiddleware, ProductController.get);
productRoutes.post('/', authMiddleware, ProductController.store);
productRoutes.put('/:id', authMiddleware, ProductController.update);
productRoutes.delete('/:id', authMiddleware, ProductController.delete);

export default productRoutes
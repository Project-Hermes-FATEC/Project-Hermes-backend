import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import SalesController from '../../controllers/sales/sales.controller';

const salesRouter = Router();

salesRouter.post('/:productId', authMiddleware, SalesController.create);
salesRouter.get('/', authMiddleware, SalesController.get);

export default salesRouter
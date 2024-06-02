import { Router } from 'express';
import authMiddleware from '../../middlewares/auth.middleware';
import SalesController from '../../controllers/sales/sales.controller';

const salesRouter = Router();

salesRouter.post('/:productId', SalesController.create);
salesRouter.get('/', SalesController.get);

export default salesRouter
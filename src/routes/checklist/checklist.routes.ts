import { Router } from 'express';
import ChecklistController from '../../controllers/checklist/checklist.controller';
import authMiddleware from '../../middlewares/auth.middleware';

const checklistRoutes = Router();

checklistRoutes.post('/', authMiddleware, ChecklistController.store);
checklistRoutes.post('/item/:id', authMiddleware, ChecklistController.addItem);
checklistRoutes.get('/', authMiddleware, ChecklistController.show);
checklistRoutes.put('/:checkListId/:itemId', authMiddleware, ChecklistController.updateItem);
checklistRoutes.delete('/:checkListId/:itemId', authMiddleware, ChecklistController.deleteItem);
checklistRoutes.delete('/:id', authMiddleware, ChecklistController.delete);

export default checklistRoutes  
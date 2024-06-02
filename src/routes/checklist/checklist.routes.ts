import { Router } from 'express';
import ChecklistController from '../../controllers/checklist/checklist.controller';
import authMiddleware from '../../middlewares/auth.middleware';

const checklistRoutes = Router();

checklistRoutes.post('/', ChecklistController.store);
/*checklistRoutes.get('/:id', authMiddleware, ChecklistController.show)
checklistRoutes.delete('/:id', authMiddleware, ChecklistController.delete)
checklistRoutes.put('/:id', authMiddleware, ChecklistController.update) */

export default checklistRoutes  
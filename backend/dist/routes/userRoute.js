import { Router } from 'express';
import userController from '../controllers/userController.js';
const router = Router();
router.post('/users', userController.create);
router.get('/users', userController.getAll);
export default router;

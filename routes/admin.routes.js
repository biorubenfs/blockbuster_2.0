import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js'

const adminRoutes = Router();

// Add checkAdmin Middleware
adminRoutes.post('/', movieController.addMovie);
adminRoutes.put('/:id', movieController.updateMovie);
adminRoutes.delete('/:id', movieController.deleteMovie);

export default adminRoutes;
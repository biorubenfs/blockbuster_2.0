import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js'

const adminRoutes = Router();

// Add checkAdmin Middleware
adminRoutes.post('/', adminController.addMovie);
adminRoutes.put('/:id', adminController.updateMovie);
adminRoutes.delete('/:id', adminController.deleteMovie);

export default adminRoutes;
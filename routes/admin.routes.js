import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js'

const adminRoutes = Router();

// Add checkAdmin Middleware

adminRoutes.post('/user', adminController.createUser);

adminRoutes.post('/movie/', adminController.addMovie);
adminRoutes.put('/movie/:id', adminController.updateMovie);
adminRoutes.delete('/movie/:id', adminController.deleteMovie);

export default adminRoutes;
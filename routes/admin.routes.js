import { Router } from 'express';
import { adminController } from '../controllers/admin.controller.js';

const adminRoutes = Router();

adminRoutes.post('/user', adminController.createUser);          // avalaible
adminRoutes.get('/user', adminController.listUsers);            // available
adminRoutes.put('/user', adminController.updateUser);
adminRoutes.delete('user', adminController.deleteUser);

adminRoutes.post('/movie/', adminController.addMovie);
adminRoutes.put('/movie/:id', adminController.updateMovie);
adminRoutes.delete('/movie/:id', adminController.deleteMovie);

adminRoutes.get('/order', adminController.getAllOrders);        // available

export default adminRoutes;
import { Router } from 'express';
import upload from '../config/multer.js';
import { userController } from '../controllers/user.controller.js';

const userRoutes = Router();

userRoutes.put('/me', upload.single('profile_picture'), userController.updateUser);
userRoutes.get('/me', userController.userDetails);
userRoutes.delete('/me', userController.deleteUser);

export default userRoutes;
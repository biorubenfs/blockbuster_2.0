import { Router } from 'express';
import { signupController } from '../controllers/signup.controller.js';

const signupRoutes = Router();

signupRoutes.post('/', signupController.createUser);

export default signupRoutes;


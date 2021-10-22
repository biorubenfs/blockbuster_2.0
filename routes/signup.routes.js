import { Router } from 'express';
import { signupController } from '../controllers/signup.controller.js';
import bodyValidator from '../middlewares/bodyValidator.js';
import signupSchema from '../schemas/signup/signupSchema.js';

const signupRoutes = Router();

signupRoutes.post('/', bodyValidator(signupSchema), signupController.createUser);

export default signupRoutes;

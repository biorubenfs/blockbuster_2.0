import { Router } from 'express';
import { signinController } from '../controllers/signin.controller.js';

import bodyValidator from '../middlewares/bodyValidator.js';
import signinSchema from '../schemas/login/signinSchema.js';

const signinRoutes = Router();

signinRoutes.post('/', bodyValidator(signinSchema), signinController.signin);

export default signinRoutes;
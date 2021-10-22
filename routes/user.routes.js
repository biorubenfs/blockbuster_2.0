import { Router } from 'express';
import upload from '../config/multer.js';
import { userController } from '../controllers/user.controller.js';

import bodyValidator from '../middlewares/bodyValidator.js';
import updateSchema from '../schemas/user/updateSchema.js';

const userRoutes = Router();

/* bodyValidator in updateUser doesn't look to works propertly through postman request passed body as form-data*/
userRoutes.put('/me', bodyValidator(updateSchema), upload.single('profile_picture'), userController.updateUser);
userRoutes.get('/me', userController.userDetails);
userRoutes.delete('/me', userController.deleteUser);

export default userRoutes;
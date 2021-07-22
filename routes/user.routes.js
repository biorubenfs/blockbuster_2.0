import { Router } from "express";
import upload from "../config/multer.js";
import { userController } from "../controllers/user.controller.js";

const userRoutes = Router();

// app.post('/upload-file', upload.single('picture'), (req, res) => {
//     res.send({ message: "photo uploaded", file: req.file });
// })

userRoutes.post('/:id', upload.single('profile_picture'), userController.updateUser);
userRoutes.get('/me', userController.userDetails);

export default userRoutes;
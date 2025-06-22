import express from 'express';
import { deleteUser, getAllUser, getUser, updateUser } from '../controllers/UserController.js';
import upload from '../config/multer.js';
import { authenticate } from '../middleware/authenticate.js';

const userRoute = express.Router();

userRoute.use(authenticate);
userRoute.get('/get-user/:userid', getUser);
userRoute.put('/update-user/:userid', upload.single('file') ,updateUser);
userRoute.get('/all-users', getAllUser);
userRoute.delete('/delete/:id', deleteUser);

export default userRoute;
import express from 'express';
import { googleLogin, Login, logOut, Register } from '../controllers/AuthController.js';
import { authenticate } from '../middleware/authenticate.js';

const authRoute = express.Router();

authRoute.post('/register', Register);
authRoute.post('/login', Login);
authRoute.post('/google-login', googleLogin);
authRoute.get('/logout', authenticate, logOut);

export default authRoute;
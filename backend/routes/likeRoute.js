import express from 'express';
import { doLike, likeCount } from '../controllers/LikeController.js';
import { authenticate } from '../middleware/authenticate.js';

const likeRoute = express.Router();

likeRoute.post('/do-like', authenticate, doLike);
likeRoute.get('/get-like/:blogid/:userid', likeCount);

export default likeRoute;
import express from 'express';
import { addCategory, allCategories, deleteCategory, showCategory, updateCategory } from '../controllers/CategoryController.js';
import { adminOnly } from '../middleware/adminOnly.js';

const categoryRoute = express.Router();

categoryRoute.post('/add', adminOnly, addCategory);
categoryRoute.get('/all', allCategories);
categoryRoute.get('/show/:categoryid', adminOnly, showCategory);
categoryRoute.put('/update/:categoryid', adminOnly, updateCategory);
categoryRoute.delete('/delete/:categoryid', adminOnly, deleteCategory);

export default categoryRoute;

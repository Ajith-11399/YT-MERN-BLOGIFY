import express from 'express';
import { addBlog, allBlogs, deleteBlog, getAllBlogs, getBlogByCategory, getRelatedBlogs, oneBlog, searchBlog, showBlog, updateBlog } from '../controllers/BlogController.js';
import upload from '../config/multer.js';
import { authenticate } from '../middleware/authenticate.js';

const blogRoute = express.Router();

blogRoute.post('/add', authenticate, upload.single('file'), addBlog);
blogRoute.get('/all', authenticate, allBlogs);
blogRoute.get('/show/:blogid', authenticate, showBlog);
blogRoute.put('/update/:blogid', authenticate, upload.single('file'), updateBlog);
blogRoute.delete('/delete/:blogid', authenticate, deleteBlog);

blogRoute.get('/one-blog/:slug', oneBlog);
blogRoute.get('/get-related-blogs/:category/:blog', getRelatedBlogs);
blogRoute.get('/get-blog-by-category/:category', getBlogByCategory);
blogRoute.get('/search', searchBlog);

blogRoute.get('/blogs', getAllBlogs);

export default blogRoute;
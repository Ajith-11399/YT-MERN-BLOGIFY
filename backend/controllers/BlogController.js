import cloudinary from "../config/cloudinary.js";
import handleError from "../helpers/handleError.js";
import Blog from "../models/blogModel.js";
import { encode } from 'entities';
import Category from "../models/categoryModel.js";

const addBlog = async (req, res, next) => {

    try {
        const data = JSON.parse(req.body.data);
        
        let featuredImage = '';

        if(req.file){
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    {folder: 'blogify', resource_type: 'auto'}
                )
                .catch((error)=>{
                    next(handleError(500, error.message));
                });

            featuredImage = uploadResult.secure_url

        };
        
        const blog = new Blog({
            author: data.author,
            category: data.category,
            title: data.title,
            slug: data.slug,
            featuredImage: featuredImage,
            blogContent: encode(data.blogContent),
        });

        await blog.save();

        res.status(200).json({success: true, message: 'Blog added successfully!'})

    } catch (error) {
        next(handleError(500, error.message));
    }
}

const allBlogs = async (req, res, next) => {
    try {
        const user = req.user;
        let blogs;
        if(user.role === 'admin'){
            blogs = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({createdAt:-1}).lean().exec();
        } else {
            blogs = await Blog.find({ author: user._id }).populate('author', 'name avatar role').populate('category', 'name slug').sort({createdAt:-1}).lean().exec();
        } 
        res.status(200).json({ blogs });
    } catch (error) {
        next(handleError(500, error.message));    
    }
}

const showBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params;
        const blog = await Blog.findById(blogid).populate('category', 'name')
        if(!blog){
            next(handleError(404, 'Data not found!'));
        }
        res.status(200).json({ blog });
    } catch (error) {
        next(handleError(500, error.message));
    }
}

const updateBlog = async (req, res, next) => {

    try {

        const { blogid } = req.params;

        const data = JSON.parse(req.body.data);
        
        const blog = await Blog.findById(blogid);

        blog.category = data.category;
        blog.title = data.title;
        blog.slug = data.slug;
        blog.blogContent = encode(data.blogContent);

        let featuredImage = blog.featuredImage;
        if(req.file){
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    {folder: 'blogify', resource_type: 'auto'}
                )
                .catch((error)=>{
                    next(handleError(500, error.message));
                });

            featuredImage = uploadResult.secure_url

        };

        blog.featuredImage = featuredImage;

        await blog.save();

        res.status(200).json({success: true, message: 'Blog updated successfully!'})

    } catch (error) {
        next(handleError(500, error.message));
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params;
        await Blog.findByIdAndDelete(blogid);
        res.status(200),json({success: true, message: 'Blog deleted successfully!'})
    } catch (error) {
        next(handleError(500, error.message));
    }
}

const oneBlog = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const blog = await Blog.findOne({ slug }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec();
        res.status(200).json({ blog })
    } catch (error) {
        next(handleError(500, error.message));
    }
}

const getRelatedBlogs = async (req, res, next) => {
    try {
        const { category, blog } = req.params;
        const categoryData = await Category.findOne({ slug: category });
        if(!categoryData){
            return next(400, 'Category data not found!');
        };
        const categoryId = categoryData._id;
        const relatedBlog = await Blog.find({ category: categoryId, slug: {$ne: blog} }).populate('author', 'name').lean().exec();
        res.status(200).json({ relatedBlog });
    } catch (error) {
        next(handleError(500, error.message));
    }
}

const getBlogByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const categoryData = await Category.findOne({ slug: category });
        if(!categoryData){
            return next(400, 'Category data not found!');
        };
        const categoryId = categoryData._id;
        // const blog = await Blog.find({ category: categoryId }).lean().exec();
        const blog = await Blog.find({ category: categoryId }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec();
        res.status(200).json({ blog, categoryData });
    } catch (error) {
        next(handleError(500, error.message));
    }
}

const searchBlog = async (req, res, next) => {
    try {
        const { q } = req.query;
        const blog = await Blog.find({ title: {$regex: q, $options: 'i'} }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec();
        res.status(200).json({ blog })
    } catch (error) {
        next(handleError(500, error.message));
    }
}

const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({createdAt:-1}).lean().exec();
        res.status(200).json({ blogs });
    } catch (error) {
        next(handleError(500, error.message));    
    }
}

export { addBlog, allBlogs, showBlog, updateBlog, deleteBlog, oneBlog, getRelatedBlogs, getBlogByCategory, searchBlog, getAllBlogs };
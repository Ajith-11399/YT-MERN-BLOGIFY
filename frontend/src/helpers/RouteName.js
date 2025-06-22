export const RouteIndex = '/';
export const RouteSignIn = '/sign-in';
export const RouteSignUp = '/sign-up';
export const RouteProfile = '/profile';
// Blog Category Routes
export const RouteCategoryDetails = '/categories';
export const RouteAddCategory = '/category/add';
export const RouteEditCategory = (category_id) => {
    if(category_id){
        return `/category/edit/${category_id}`;
    } else {
        return `/category/edit/:category_id`;
    }
}
// Blogs 
export const RouteBlogs ='/blogs';
export const RouteBlogAdd ='/blogs/add';
export const RouteBlogEdit = (blogid) => {
    if(blogid){
        return `/blog/edit/${blogid}`;
    } else {
        return `/blog/edit/:blogid`;
    }
}
export const RouteBlogDetails = (category, blog) => {
    if(!category || !blog){
        return '/blog/:category/:blog';
    } else {
        return `/blog/${category}/${blog}`;
    }
}
export const RouteBlogByCategory = (category) => {
    if(!category){
        return '/blog/:category';
    } else {
        return `/blog/${category}`;
    }
}
export const RouteSearch = (q) => {
    if(q){
        return `/search?q=${q}`;
    } else {
        return `/search`;
    }
}
export const RouteComment = '/comments';
export const RouteUser = '/users';
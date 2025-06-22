import BlogCard from '@/components/BlogCard';
import Loading from '@/components/Loading';
import { getEnv } from '@/helpers/getEnv.js';
import { useFetch } from '@/hooks/useFetch.js';
import React from 'react';
import { BiCategory } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

const BlogByCategory = () => {

    const { category } = useParams();

    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/blog/get-blog-by-category/${category}`,{
        method: 'get',
        credentials: 'include',
    }, [category]);

    if(loading) return <Loading />

    return (

        <>
            <div className='flex items-center gap-3 text-3xl font-bold text-blue-950 border-b-2 border-blue-950 mb-5 pb-2 w-fit'>
                <BiCategory />
                <h4>{blogData?.categoryData?.name}&nbsp;Blogs</h4>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10'>
            
                {
                    blogData?.blog?.length > 0
                        ? blogData.blog.map(( blog ) => {
                            return (
                                <BlogCard key={blog._id} props={blog} />
                            )
                        })
                        : <div>No Blogs Found!</div>

                }

            </div>
        </>

        
    
    );
    
};

export default BlogByCategory;
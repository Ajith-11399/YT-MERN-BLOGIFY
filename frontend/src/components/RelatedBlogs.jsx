import { getEnv } from '@/helpers/getEnv.js';
import { useFetch } from '@/hooks/useFetch.js';
import React from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import { RouteBlogDetails } from '@/helpers/RouteName';
import moment from 'moment';

const RelatedBlogs = ({ props }) => {
    
    const { data, loading, error } = useFetch(`
        ${getEnv('VITE_BACKEND_URL')}/blog/get-related-blogs/${props.category}/${props.currentBlog}`, 
        {
            method: 'get',
            credentials: 'include',
        }
    );

    if(loading) return <Loading />;

    return (
        
        <div className='mt-5'>
            <h2 className='text-xl font-bold'>Related Blogs</h2>
            <p className="border-b-[2px] mt-2 mb-5"></p>
            <div>
                {
                    data?.relatedBlog.length > 0
                    ?   
                        data.relatedBlog.map(blog => {
                            return (
                                <Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)}>
                                    <div className='flex items-center gap-2 mb-4'>
                                        <img className='w-[100px] h-[70px] text-cover rounded-md' src={blog.featuredImage} alt="" />
                                        <div>
                                            <h4 className='line-clamp-2 text-md font-semibold'>
                                                {blog.title.length > 22 ? blog.title.slice(0, 22) : blog.title }
                                            </h4>
                                            <p className='text-xs'>Posted on: {moment(blog.createdAt).format('MMMM Do YYYY')}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    : <div>No related blogs!</div>
                }
            </div>
        </div>

    );

};

export default RelatedBlogs;
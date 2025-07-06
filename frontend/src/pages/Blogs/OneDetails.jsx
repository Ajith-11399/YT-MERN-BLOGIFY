import React from 'react';
import { useFetch } from '@/hooks/useFetch.js';
import { getEnv } from '@/helpers/getEnv.js';
import { useParams } from 'react-router-dom';
import Loading from '@/components/Loading';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { decode } from 'entities';
import moment from 'moment';
import Comment from '@/components/Comment';
import CommentCount from '@/components/CommentCount';
import LikeCount from '@/components/LikeCount';
import RelatedBlogs from '@/components/RelatedBlogs';
import { FaRegCircleUser } from 'react-icons/fa6';

const OneDetails = () => {

    const { blog, category } = useParams();

    const { data, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/blog/one-blog/${blog}`,{
        method: 'get',
        credentials: 'include',
    }, [blog, category]);

    console.log(data);
    
    
    if(loading) return <Loading />;

    return (
    
        <div className='xl:flex-nowrap flex-wrap flex justify-between gap-20'>

            {/* Blog Details */}
            { data?.blog && 
                <div className='shadow-md rounded xl:w-[70%] w-full pt-2 pb-5 px-5'>

                    {/* Title */}
                    <h1 className='text-3xl font-bold mt-5 mb-10'>{data.blog.title}</h1>

                    {/* Avatar */}
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center gap-5">
                            <Avatar>
                                { data.blog.author?.avatar
                                    ? <AvatarImage className='w-10 h-10 rounded-full shadow-lg hover:scale-105 transition-all ' src={data.blog.author?.avatar} />
                                    : <FaRegCircleUser className='w-10 h-10' />
                                }
                            </Avatar>
                            <div>
                                {
                                    data.blog?.author?.name
                                    ?   <p className='text-sm font-bold'>{data.blog?.author?.name}</p>
                                    :   <p className='text-sm font-bold'>User not found!!</p>
                                }
                                <p className='text-xs font-medium'>Posted on: {moment(data.blog.createdAt).format('MMMM Do, YYYY')}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center gap-5">
                            <LikeCount props={{ blogid:data.blog._id }} />
                            <CommentCount props={{ blogid:data.blog._id }} />
                        </div>
                    </div>

                    
                    
                    {/* Blog Image */}
                    <div className='my-5'>
                        <img src={data.blog.featuredImage} className='rounded-lg' alt="" />
                    </div>
                    
                    {/* Blog Content */}
                    <div className='mt-10' dangerouslySetInnerHTML={{ __html: decode( data.blog.blogContent ) || '' }}></div>

                    {/* Post a comment */}
                    <div className='border-top mt-5 pt-5'>
                        <Comment props={{ blogid: data.blog._id }} />
                    </div>

                </div>
            }

            {/* Related Blogs */}
            <div className='shadow-md rounded xl:w-[30%] w-full py-2 px-5 h-min'>
                <RelatedBlogs props={{ category: category, currentBlog: blog }} />
            </div>
            
        </div>
    
    );

};

export default OneDetails;
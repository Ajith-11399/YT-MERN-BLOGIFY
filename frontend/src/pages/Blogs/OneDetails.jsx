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

const OneDetails = () => {

    const { blog, category } = useParams();

    const { data, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/blog/one-blog/${blog}`,{
        method: 'get',
        credentials: 'include',
    }, [blog, category]);
    
    if(loading) return <Loading />;

    return (
    
        <div className='md:flex-nowrap flex-wrap flex justify-between gap-20'>

            {/* Blog Details */}
            { data?.blog && 
                <div className='shadow-md rounded md:w-[70%] w-full pt-2 pb-5 px-5'>

                    {/* Title */}
                    <h1 className='text-3xl font-bold mt-5 mb-10'>{data.blog.title}</h1>
                    
                    {/* Avatar */}
                    {/* <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center gap-5">
                            <Avatar>
                                <AvatarImage src={data.blog.author.avatar} />
                            </Avatar>
                            <p className='text-xl font-medium'>{data.blog.author.name}</p>
                        </div>
                        <div>
                            <p className='text-md font-medium'>Date: {moment(data.blog.createdAt).format('MMMM Do, YYYY')}</p>
                        </div>
                    </div> */}

                    {/* Avatar */}
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center gap-5">
                            <Avatar>
                                <AvatarImage src={data.blog.author.avatar} className='shadow-lg' />
                            </Avatar>
                            <div>
                                <p className='text-sm font-bold'>{data.blog.author.name}</p>
                                <p className='text-xs font-medium'>Date: {moment(data.blog.createdAt).format('MMMM Do, YYYY')}</p>
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
            <div className='shadow-md rounded md:w-[30%] w-full py-2 px-5 h-min'>
                <RelatedBlogs props={{ category: category, currentBlog: blog }} />
            </div>
            
        </div>
    
    );

};

export default OneDetails;
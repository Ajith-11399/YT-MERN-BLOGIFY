import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from '../components/ui/badge';
import { useSelector } from 'react-redux';
import { Avatar, AvatarImage } from './ui/avatar';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { FaRegCircleUser } from 'react-icons/fa6';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RouteBlogDetails, RouteBlogEdit } from '@/helpers/RouteName';

const BlogCard = ({props}) => {

    const user = useSelector((state) => state.user);

    return (
    
        <Link to={RouteBlogDetails(props.category.slug, props.slug)}>
        
            <Card className='pt-5 border-0 shadow-lg cursor-pointer'>

                <CardContent>

                    <div className='flex items-center justify-between'>

                        <div className='flex items-center justify-between py-2 gap-3'>
                            <Avatar className='shadow-lg'>
                                { props.author?.avatar
                                    ? <AvatarImage src={props.author.avatar} />
                                    : <FaRegCircleUser className='w-10 h-10' />
                                }
                            </Avatar>
                            {
                                props.author?.name
                                ?   <span>{props.author?.name}</span>
                                :   <span>User not found!!</span>
                            }
                            
                        </div>

                        {/* { props.author.role === 'admin' && 
                            <Badge variant='outline' className='bg-blue-950 text-white' >Admin</Badge>
                        } */}

                        <Badge variant='outline' className={`bg-blue-950 text-white px-3 py-1 rounded-md shadow-lg ${ props.author?.role === 'admin' ? 'bg-blue-950' : 'bg-green-700' }`} >
                            { props.author?.role === 'admin' ? 'admin' : 'user' }
                        </Badge>

                    </div>

                    <div className='my-2'>
                        <img src={props.featuredImage} className='w-full h-52 rounded-md shadow-sm' alt="" />
                    </div>
                        
                    <div className=''>
                        <p className='flex items-center gap-3 mb-2'>
                            <IoCalendarNumberOutline />
                            <span>{moment(props.createdAt).format('MMMM Do, YYYY')}</span>
                        </p>
                        <p className='text-xl font-bold line-clamp-2'>
                            {
                                props.title.length >= 25
                                ? <span>{props.title.slice(0, 25)} ...</span>
                                : props.title
                            }
                        </p>
                    </div>

                </CardContent>
                        
            </Card>

        </Link>
    
    );

};

export default BlogCard;
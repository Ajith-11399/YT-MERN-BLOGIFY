import { getEnv } from '@/helpers/getEnv.js';
import { useFetch } from '@/hooks/useFetch.js';
import React from 'react';
import Loading from './Loading';
import { Avatar } from '@radix-ui/react-avatar';
import { useSelector } from 'react-redux';
import { AvatarImage } from './ui/avatar';
import { FaRegCircleUser } from 'react-icons/fa6';
import moment from 'moment';

const CommentList = ({ props }) => {

    const user = useSelector((state) => state.user);
    
    const { data, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/comment/get/${props.blogid}`,{
        method: 'get',
        credentials: 'include',
    });    

    if(loading) return <Loading />;

    return (
    
        <div>
            
            <h4 className='text-2xl font-bold p-2 rounded-lg border-[1px]'>
                {
                    props.newComment
                    ? <span className='me-2'>{data?.comments.lnegth + 1}</span>
                    : <span className='me-2'>{data?.comments.length}</span>
                } &nbsp;
                {/* { data?.comments.length } &nbsp; */}
                { data?.comments.length <= 1 
                    ? <span>Comment</span> 
                    : <span>Comments</span>
                }
            </h4>

            <div className='border-[1px] rounded-lg p-2 mt-5'>
                
                {
                    props.newComment &&
                        <div className='flex gap-2 mb-3'>
                            
                            <Avatar>
                                { user?.user.avatar
                                    ? <AvatarImage className='w-10 h-10 rounded-full shadow-lg hover:scale-105 transition-all ' src={user?.user.avatar} />
                                    : <FaRegCircleUser className='w-20 h-20' />
                                }
                            </Avatar>

                            <div>
                                <p className='font-bold'>{user?.user.name}</p>
                                <p className=''>{moment(props.newComment?.createdAt).format('MMMM Do, YYYY')}</p>
                                <div className='pt-5'>{props.newComment?.comment}</div>
                            </div>

                        </div>
                }

                {
                    data?.comments.length > 0 &&

                    data.comments.map( comment => {
                        
                        return (
                        
                            <div key={comment._id} className='flex gap-3 m-2 p-3 hover:scale-[101%] border-b-[0.5px] transition-all'>
                    
                                <Avatar>
                                    { comment?.user?.avatar
                                        ? <AvatarImage className='w-10 h-10 rounded-full shadow-lg hover:scale-105 transition-all ' src={comment?.user.avatar} />
                                        : <FaRegCircleUser className='w-10 h-10' />
                                    }
                                </Avatar>
                                    
                                <div>
                                    <p>
                                        <span className='font-bold text-sm'>
                                            { comment?.user?.name ? comment?.user.name : 'User not found'}
                                        </span>,&nbsp;
                                        <span className='text-sm'>{moment(comment?.createdAt).format('MMMM Do, YYYY')}</span>
                                    </p>
                                    <p className='pt-2 text-sm'>{comment?.comment}</p>
                                </div>
                                    
                            </div>
                        
                        )
                    })

                }
                
            </div>

        </div>

    );
    
};

export default CommentList;
import { getEnv } from '@/helpers/getEnv.js';
import { useFetch } from '@/hooks/useFetch.js';
import React from 'react';
import Loading from './Loading';
import { FaRegComment } from 'react-icons/fa6';

const CommentCount = ({ props }) => {

    const { data, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/comment/get-count/${props.blogid}`,{
        method: 'get',
        credentials: 'include',
    });

    if(loading) return <Loading />;
    
    return (
    
        <button type='button' className='flex justify-between items-center gap-1 text-blue-950'>
            <FaRegComment />
            {data?.commentCount}
        </button>
    
    );

};

export default CommentCount;
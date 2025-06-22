import { getEnv } from '@/helpers/getEnv.js';
import { useFetch } from '@/hooks/useFetch.js';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import showToast from '@/helpers/showToast.js';

const LikeCount = ({ props }) => {

    const [ likeCount, setLikeCount ] = useState(0);
    const [ hasLiked, setHasLiked ] = useState(false);

    const user = useSelector((state) => state.user);
 
    const { data: blogLikeCount, loading, error } = useFetch(`
        ${getEnv('VITE_BACKEND_URL')}/blog-like/get-like/${props.blogid}/${user && user.isLoggedIn ? user.user._id : ''}`,
        {
            method: 'get',
            credentials: 'include',
        }
    );

    useEffect(()=>{
        if(blogLikeCount){
            setLikeCount(blogLikeCount.likecount);
            setHasLiked(blogLikeCount.isUserliked);
        }
    }, [blogLikeCount]);

    const handleLike = async () => {
        try {
            if(!user.isLoggedIn){
                return showToast('error', 'Please login into your account.');
            }
            const response = await fetch(`${getEnv('VITE_BACKEND_URL')}/blog-like/do-like`, {
                method: 'post',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ user:user.user._id, blogid:props.blogid })
            });

            if(!response.ok){
                showToast('error', response.statusText);
            };

            const responseData = await response.json();
            setLikeCount(responseData.likecount);
            setHasLiked(!hasLiked);
 
        } catch (error) {
            showToast('error', error.message);
        }
    }

    if(loading) return <Loading />;

    return (

        <button onClick={handleLike} type='button' className='flex justify-between items-center gap-1 text-blue-950'>
            {
                !hasLiked
                ? <FaRegHeart />
                : <FaHeart fill='red' />
            }
            {likeCount}  
        </button>

    );

};

export default LikeCount;
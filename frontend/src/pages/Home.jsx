import React from 'react';
import { useFetch } from '@/hooks/useFetch.js';
import { getEnv } from '@/helpers/getEnv.js';
import Loading from '@/components/Loading';
import BlogCard from '@/components/BlogCard';


const Home = () => {

    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/blog/blogs`, {
        method: 'get',
        credentials: 'include',
    }); 

    if(loading) return <Loading />
  
    return (
        
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10'>

            {blogData?.blogs?.length > 0 
                ? blogData.blogs.map((blogs) => (
                    <BlogCard key={blogs._id} props={blogs} />
                ))
                : <div>Data Not Found!</div>
            }

        </div>
    
    );

};

export default Home;
import React from 'react';
import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {

    return (

        <div className='w-screen h-screen fixed top-0 left-0 z-50 backdrop-blur-md bg-white/10 flex items-center justify-center'>
            <AiOutlineLoading className='text-6xl animate-spin' />
        </div>
    
    );

};

export default Loading;
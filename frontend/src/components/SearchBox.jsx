import React, { useState } from 'react';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import { RouteSearch } from '@/helpers/RouteName';

const SearchBox = () => {

    const navigate = useNavigate();

    const [ query, setQuery ] = useState();

    const getInput = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        navigate(RouteSearch(query));
    }

    return (
        
        <form onSubmit={handleSubmit}>
            <Input name='q' onInput={getInput} placeholder='Search here ...' className='h-9 rounded-lg bg-transparent border-[0.1px] border-black/10' />
        </form>
    
    );

};

export default SearchBox;
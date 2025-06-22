import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RouteBlogAdd, RouteBlogEdit } from '@/helpers/RouteName';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useFetch } from '@/hooks/useFetch.js';
import { getEnv } from '@/helpers/getEnv.js';
import Loading from '@/components/Loading';
import { AiOutlineEdit } from 'react-icons/ai';
import { LuTrash } from "react-icons/lu";
import deleteData from '@/helpers/handleDelete.js';
import showToast from '@/helpers/showToast';
import moment from 'moment';

const Blogs = () => {

    const [ refreshData, setRefreshData ] = useState(false);

    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/blog/all`, {
        method: 'get',
        credentials: 'include',
    }, [refreshData]);

    const handleDelete = (id) => {
        const response = deleteData(`${getEnv('VITE_BACKEND_URL')}/blog/delete/${id}`)
        if(response){
            setRefreshData(!refreshData)
            showToast('success', 'Data deleted successfully!');
        } else {
            showToast('error', 'Data not deleted!');
        }
    }    
    
    if(loading) return <Loading />
    
    return (
        
        <div>
            
            <Card>

                <CardHeader>
                    <div>
                        <Button className='hover:scale-105 hover:transition-all hover:duration-300' asChild>
                            <Link to={RouteBlogAdd}>
                                Add Blog
                            </Link>
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>

                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead><p className='font-bold text-black'>Sl. No</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Author</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Category</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Title</p></TableHead>
                                <TableHead><p className='font-bold text-black'>slug</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Date</p></TableHead>
                                <TableHead><p className='font-bold text-black text-center'>Action</p></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            { blogData?.blogs?.length 
                                > 0
                                ?
                                    blogData.blogs.map((blogs, index) =>  
                                        <TableRow key={blogs._id}>
                                            <TableCell>{index + 1}.</TableCell>
                                            <TableCell>{blogs.author.name}</TableCell>
                                            <TableCell>{blogs.category.name}</TableCell>
                                            <TableCell>
                                                {
                                                    blogs.title.length >= 50 
                                                    ? <span>{blogs.title.slice(0, 50)} ...</span>
                                                    : blogs.title
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    blogs.slug.length >= 50 
                                                    ? <span>{blogs.slug.slice(0, 50)} ...</span>
                                                    : blogs.slug
                                                }
                                            </TableCell>
                                            <TableCell>{moment(blogs.createdAt).format('MMMM Do, YYYY')}</TableCell>
                                            <TableCell className='flex items-center justify-center gap-5'>
                                                <Button variant="outline" className='hover:bg-blue-900 hover:text-white' asChild>
                                                    <Link to={RouteBlogEdit(blogs._id)}>
                                                        <AiOutlineEdit />
                                                    </Link>
                                                </Button>
                                                <Button onClick={() => handleDelete(blogs._id)} variant="outline" className='hover:bg-blue-900 hover:text-white'>
                                                    <LuTrash />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                    
                                : <>
                                    <TableRow>
                                        <TableCell colSpan="4">Data not found!</TableCell>
                                    </TableRow>
                                  </>
                            }
                        </TableBody>

                    </Table>

                </CardContent>

            </Card>

        </div>
        
    );

};

export default Blogs;
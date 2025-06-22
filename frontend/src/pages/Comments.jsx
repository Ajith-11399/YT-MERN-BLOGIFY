import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RouteAddCategory, RouteEditCategory } from '@/helpers/RouteName';
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

const Comments = () => {

    const [ refreshData, setRefreshData ] = useState(false);

    const { data, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/comment/all-comments`, {
        method: 'get',
        credentials: 'include',
    }, [refreshData]);

    const handleDelete = (id) => {
        const response = deleteData(`${getEnv('VITE_BACKEND_URL')}/comment/delete/${id}`);
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

                <CardContent>

                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead><p className='font-bold text-black'>Sl. No</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Blog</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Comment By</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Date</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Comment</p></TableHead>
                                <TableHead><p className='font-bold text-black text-center'>Action</p></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            { data?.comments.length 
                                > 0
                                ?
                                    data.comments.map((comment, index) =>  
                                        <TableRow key={comment._id}> 
                                            <TableCell>{index + 1}.</TableCell>
                                            <TableCell>
                                                {
                                                    comment.blogid.title.length >= 50 
                                                    ? <span>{comment.blogid.title.slice(0, 50)} ...</span>
                                                    : comment.blogid.title
                                                }
                                            </TableCell>
                                            <TableCell>{comment.user.name}</TableCell>
                                            <TableCell>{moment(comment.createdAt).format('MMMM Do, YYYY')}</TableCell>
                                            <TableCell>
                                                {comment.comment.length >= 30 ? comment.comment.slice(0, 30) : comment.comment}
                                            </TableCell>
                                            <TableCell className='flex items-center justify-center gap-5'>
                                                <Button onClick={() => handleDelete(comment._id)} variant="outline" className='hover:bg-blue-900 hover:text-white'>
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

export default Comments;
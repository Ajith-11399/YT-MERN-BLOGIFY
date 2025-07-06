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
import { FaRegCircleUser } from 'react-icons/fa6';
import { Badge } from '@/components/ui/badge';

const User = () => {

    const [ refreshData, setRefreshData ] = useState(false);

    const { data, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/user/all-users`, {
        method: 'get',
        credentials: 'include',
    }, [refreshData]);

    const handleDelete = (id) => {
        const response = deleteData(`${getEnv('VITE_BACKEND_URL')}/user/delete/${id}`);
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
                                <TableHead><p className='font-bold text-black'>Name</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Avatar</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Role</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Email</p></TableHead>    
                                <TableHead><p className='font-bold text-black text-center'>Action</p></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            { data?.user.length 
                                > 0
                                ?
                                    data.user.map((user, index) =>  
                                        <TableRow key={user._id}> 
                                            <TableCell>{index + 1}.</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>
                                                {
                                                    user.avatar 
                                                    ? <img src={user.avatar} className='w-10 h-10 rounded-full shadow-lg' alt="" />
                                                    : <FaRegCircleUser className='w-10 h-10' />
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    user.role === 'admin'
                                                    ? <Badge className='bg-blue-950 text-white px-3 py-1 rounded-md shadow-lg'>{user.role}</Badge>
                                                    : <Badge className='bg-green-700 text-white px-3 py-1 rounded-md shadow-lg'>{user.role}</Badge>
                                                }
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell className='flex items-center justify-center gap-5'>
                                                <Button onClick={() => handleDelete(user._id)} variant="outline" className='hover:bg-blue-900 hover:text-white'>
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

export default User;
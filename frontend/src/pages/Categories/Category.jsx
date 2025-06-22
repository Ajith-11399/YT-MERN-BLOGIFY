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

const Category = () => {

    const [ refreshData, setRefreshData ] = useState(false);

    const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/category/all`, {
        method: 'get',
        credentials: 'include',
    }, [refreshData]);

    const handleDelete = (id) => {
        const response = deleteData(`${getEnv('VITE_BACKEND_URL')}/category/delete/${id}`)
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
                            <Link to={RouteAddCategory}>
                                Add Category
                            </Link>
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>

                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead><p className='font-bold text-black'>Sl. No</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Category</p></TableHead>
                                <TableHead><p className='font-bold text-black'>Slug</p></TableHead>
                                <TableHead><p className='font-bold text-black text-center'>Action</p></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            { categoryData?.category?.length 
                                > 0
                                ?
                                    categoryData.category.map((category, index) =>  
                                        <TableRow key={category._id}>
                                            <TableCell>{index + 1}.</TableCell>
                                            <TableCell>{category.name}</TableCell>
                                            <TableCell>{category.slug}</TableCell>
                                            <TableCell className='flex items-center justify-center gap-5'>
                                                <Button variant="outline" className='hover:bg-blue-900 hover:text-white' asChild>
                                                    <Link to={RouteEditCategory(category._id)}>
                                                        <AiOutlineEdit />
                                                    </Link>
                                                </Button>
                                                <Button onClick={() => handleDelete(category._id)} variant="outline" className='hover:bg-blue-900 hover:text-white'>
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

export default Category;
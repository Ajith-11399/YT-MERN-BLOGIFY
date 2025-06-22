import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { RouteCategoryDetails } from '@/helpers/RouteName';
import { getEnv } from '@/helpers/getEnv.js';
import showToast from '@/helpers/showToast.js';
import { Card } from '@/components/ui/card';
import slugify from 'slugify';

const AddCategory = () => {

    const navigate = useNavigate();

    const formSchema = z.object({
        name: z.string().min(5, "Name must be at least 5 Character long!"),
        slug: z.string().min(5, "Slug must be at least 5 character long!"),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            slug: '',
        },
    });

    const categoryName = form.watch('name');
    useEffect(()=> {
        if(categoryName){
            const slug = slugify(categoryName, { lower: true })
            form.setValue('slug', slug)
        }
    }, [categoryName]);

    const onSubmit = async(values) => {
        try {

            const response = await fetch(`${getEnv('VITE_BACKEND_URL')}/category/add`, {
                method: 'post',
                headers: {'Content-type': 'Application/json'}, 
                body: JSON.stringify(values)
            });
            const data = await response.json();
            if(!response.ok){
                return showToast('error', data.message);
            }
            form.reset();
            navigate(RouteCategoryDetails);
            showToast('success', data.message);

        } catch (error) {
            showToast('error', error.message);
        }
    }

    return (
    
        <div className='flex justify-center items-center'>

            <Card className='w-full max-w-screen-md shadow-lg rounded-lg space-y-3 border-none p-5'>

                <p className='text-2xl font-medium text-center'> Create Category </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        
                        <div className='mb-3'>
                            <FormField control={form.control} name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input type='text' placeholder="Enter your name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-3'>
                            <FormField control={form.control} name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input type='text' placeholder="Slug" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mt-5'>
                            <Button type="submit" className='w-[200px] hover:scale-105 hover:transition-all hover:duration-300'>Create Category</Button>
                        </div>
                    </form>
                </Form>
                
            </Card>
            
        </div>
    
    );

};

export default AddCategory;
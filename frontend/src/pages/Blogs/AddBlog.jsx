import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { RouteBlogs } from '@/helpers/RouteName';
import { getEnv } from '@/helpers/getEnv.js';
import showToast from '@/helpers/showToast.js';
import { Card } from '@/components/ui/card';
import slugify from 'slugify';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFetch } from '@/hooks/useFetch.js';
import Dropzone from 'react-dropzone';
import Editor from '@/components/Editor';
import { useSelector } from 'react-redux';

const AddBlog = () => {

    const user = useSelector((state)=> state.user);

    const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/category/all`, {
        method: 'get',
        credentials: 'include',
    });

    const [ filePreview, setFilePreview ] = useState();
    const [ file, setFile ] = useState();

    const navigate = useNavigate();
    
    const formSchema = z.object({
        category: z.string().min(5, "Category must be at least 5 Character long!"),
        title: z.string().min(5, "Title must be at least 5 Character long!"),
        slug: z.string().min(5, "Slug must be at least 5 character long!"),
        blogContent: z.string().min(3, 'Blog content must be at least 3 character long!'),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: '',
            title: '',
            slug: '',
            blogContent: '',
        },
    });

    const handleEditorData = (event, editor) => {
        const data = editor.getData()
        form.setValue('blogContent', data)
    }

    const blogTitle = form.watch('title');
    useEffect(()=> {
        if(blogTitle){
            const slug = slugify(blogTitle, { lower: true })
            form.setValue('slug', slug)
        }
    }, [blogTitle]);

    const onSubmit = async(values) => {
        
        try {

            const newValues = { ...values, author: user.user?._id };

            if(!file){
                showToast('error', 'Feature image required!')
            }

            const formData = new FormData();
            formData.append('file', file);
            formData.append('data', JSON.stringify(newValues));

            const response = await fetch(`${getEnv('VITE_BACKEND_URL')}/blog/add`, {
                method: 'post',
                credentials: 'include',
                body: formData
            });
            const data = await response.json();
            if(!response.ok){
                return showToast('error', data.message);
            }
            form.reset();
            setFile();
            setFilePreview();
            navigate(RouteBlogs);
            showToast('success', data.message);

        } catch (error) {
            showToast('error', error.message);
        }
    };

    const handleFileSelection = async(files) => {
        const file = files[0];
        const preview = URL.createObjectURL(file);
        setFile(file);
        setFilePreview(preview);
    }

    return (
    
        <div className='flex justify-center items-center'>

            <Card className='w-full shadow-lg rounded-lg space-y-3 border-none p-5'>

                <p className='text-2xl font-medium text-center'> Create Blog </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        {/* Blog Category */}
                        <div className='mb-3'>
                            <FormField control={form.control} name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    { categoryData?.category?.map((category) => (
                                                        <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Blog Title */}
                        <div className='mb-3'>
                            <FormField control={form.control} name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input type='text' placeholder="Enter blog title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Blog Title */}
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
                        {/* Image */}
                        <div className='mb-3'>
                            <span className='mb-2 block'>Featured Image</span>
                            <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div className='flex justify-center items-center w-36 h-28 border-2 border-dashed rounded-lg overflow-hidden'>
                                            <img src={filePreview} alt="" />
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                        <div className='mb-3'>
                            <FormField control={form.control} name="blogContent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Blog Content</FormLabel>
                                        <FormControl>
                                            <Editor  props={{initialData: '', onChange: handleEditorData }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mt-5'>
                            <Button type="submit" className='w-[200px] hover:scale-105 hover:transition-all hover:duration-300'>Create Blog</Button>
                        </div>
                    </form>
                </Form>
                
            </Card>
            
        </div>
    
    );

};

export default AddBlog;
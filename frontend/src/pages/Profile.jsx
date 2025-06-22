import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import showToast from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv';
import { setUser } from '@/redux/user/userSlice';
import { Textarea } from '@/components/ui/textarea';
import { useFetch } from '@/hooks/useFetch.js';
import Loading from '@/components/Loading';
import { FaCameraRetro } from 'react-icons/fa6';
import Dropzone from 'react-dropzone';


const Profile = () => {

    const [ filePreview, setFilePreview ] = useState();
    const [ file, setFile ] = useState();
    const user = useSelector((state) => state.user);

    const { data: userData, loading, error } = useFetch(`${getEnv('VITE_BACKEND_URL')}/user/get-user/${user.user._id}`, {
        method: 'get',
        credentials: 'include',
    });

    const dispatch = useDispatch();

    const formSchema = z.object({
        name: z.string().min(2, 'Name must be at least 2 Characters long!'), 
        email: z.string().email(),
        bio: z.string().min(3, 'Name must be at least 3 Characters long!'),
        // password: z.string(),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            bio: '',
            password: '',
        },
    });
    
    useEffect(()=> {
        if(userData && userData.success){
            form.reset({
                name: userData.user.name,
                email: userData.user.email,
                bio: userData.user.bio,
            })
        }
    }, [userData]);

    const onSubmit = async(values) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('data', JSON.stringify(values));

            const response = await fetch(`${getEnv('VITE_BACKEND_URL')}/user/update-user/${userData.user._id}`, {
                method: 'put',
                credentials: 'include',
                body: formData
            });
            const data = await response.json();
            if(!response.ok){
                return showToast('error', data.message);
            };
            dispatch(setUser(data.user));
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

    if (loading) return <Loading />

    return (
    
        <Card className='max-w-screen-md mx-auto'>
            
            <CardContent>
                
                <div className="flex items-center justify-center relative group w-full text-center">
                    <Dropzone onDrop={acceptedFiles => handleFileSelection(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Avatar className='w-[200px] h-[200px] flex items-center justify-center text-center my-10'>
                                    <AvatarImage src={ filePreview ? filePreview : userData?.user?.avatar } />
                                    <div className="absolute inset-0 z-10 hidden group-hover:flex items-center justify-center cursor-pointer bg-black/10 border-2 border-blue-950 rounded-full">
                                        <FaCameraRetro className="text-4xl" color="#ffffff" />
                                    </div>
                                </Avatar>
                            </div>
                        )}
                    </Dropzone>
                </div>

                <div className=''>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            
                            <div className='mb-3'>
                                <FormField control={form.control} name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Enter your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField control={form.control} name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="Enter your email address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField control={form.control} name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Bio</FormLabel>
                                            <FormControl>
                                                <Textarea type="text" placeholder="Enter yourself in short" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3'>
                                <FormField control={form.control} name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mt-5 text-center'>
                                <Button type="submit" className=''>Save Changes</Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </CardContent>

        </Card>
        
    );

};

export default Profile;
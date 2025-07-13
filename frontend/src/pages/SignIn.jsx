import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { RouteHome, RouteIndex, RouteSignUp } from '@/helpers/RouteName';
import { getEnv } from '@/helpers/getEnv.js';
import showToast from '@/helpers/showToast.js';
import GoogleAuth from '@/components/GoogleAuth';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/userSlice';

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(7, "Password must be at least 8")
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async(values) => {
        try {
            const response = await fetch(`${getEnv('VITE_BACKEND_URL')}/auth/login`,{
                method: 'post',
                headers: {'Content-type':'application/json'},
                credentials: 'include',
                body: JSON.stringify(values),
            });

            const data = await response.json();
            if(!response.ok){
                return showToast('error', data.message);
            }

            dispatch(setUser(data.user));
            showToast('success', data.message);
            navigate(RouteHome);

        } catch (error) {
            showToast('error', error.message);
        }
    }
    
    return (
    
        <div className='flex justify-center items-center h-screen w-screen'>

            <div className='shadow-lg rounded-lg space-y-3 border-none p-5 w-full max-w-sm'>

                <Link to={RouteHome}>
                    <p className='text-3xl text-center font-bold text-blue-950 hover:scale-110 hover:transition-all hover:duration-300'>Blogify</p>
                </Link>

                <p className='text-2xl font-medium text-center'> Sign into you account </p>

                <div>
                    <GoogleAuth />
                    <div className='border my-5 flex items-center justify-center'>
                        <span className='absolute bg-white text-sm'>Or</span>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        
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
                        <div className='mt-5'>
                            <Button type="submit" className='w-full'>Sign In</Button>
                            <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                                <p>Don&apos;t have an account?</p>
                                <Link to={RouteSignUp} className='text-blue-700 hover:text-blue-500 hover:underline'>Sign Up</Link>
                            </div>
                        </div>
                    </form>
                </Form>

            </div>

        </div>
    
    );

};

export default SignIn;
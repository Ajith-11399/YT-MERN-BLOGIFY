import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { RouteHome, RouteIndex, RouteSignIn } from '@/helpers/RouteName';
import { getEnv } from '@/helpers/getEnv.js';
import showToast from '@/helpers/showToast.js';
import GoogleAuth from '@/components/GoogleAuth';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/userSlice';

const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formSchema = z.object({
        name: z.string().min(5, "Name must be at least 5 Character long!"),
        email: z.string().email(),
        password: z.string().min(8, "Password must be at least 8 character long!"),
        confirmPassword: z.string().refine(data => data.password === data.confirmPassword, 'Password and Confirm Password should be same!'),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async(values) => {
        try {

            const response = await fetch(`${getEnv('VITE_BACKEND_URL')}/auth/register`, {
                method: 'post',
                headers: {'Content-type': 'Application/json'}, 
                body: JSON.stringify(values)
            });
            const data = await response.json();
            if(!response.ok){
                return showToast('error', data.message);
            }

            dispatch(setUser(data.user));
            navigate(RouteSignIn);
            showToast('success', data.message);

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

                <p className='text-2xl font-medium text-center'> Create your account </p>

                <div>
                    <GoogleAuth />
                    <div className='border my-5 flex items-center justify-center'>
                        <span className='absolute bg-white text-sm'>Or</span>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        
                        <div className='mb-3'>
                            <FormField control={form.control} name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fullname</FormLabel>
                                        <FormControl>
                                            <Input type='text' placeholder="Enter your fullname" {...field} />
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
                                            <Input type='email' placeholder="Enter your email address" {...field} />
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
                                            <Input type='password' placeholder="Enter your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-3'>
                            <FormField control={form.control} name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type='password' placeholder="Confirm your password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mt-5'>
                            <Button type="submit" className='w-full'>Sign Up</Button>
                            <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                                <p>Already have an account?</p>
                                <Link to={RouteSignIn} className='text-blue-700 hover:text-blue-500 hover:underline'>Sign In</Link>
                            </div>
                        </div>
                    </form>
                </Form>
                
            </div>
            
            

        </div>
    
    );

};

export default SignUp;
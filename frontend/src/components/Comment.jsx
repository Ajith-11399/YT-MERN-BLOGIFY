import React, { useEffect, useState } from 'react';
import { GoCommentDiscussion } from 'react-icons/go';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { RouteSignIn } from '@/helpers/RouteName';
import { getEnv } from '@/helpers/getEnv.js';
import showToast from '@/helpers/showToast.js';
import { Textarea } from './ui/textarea';
import { useSelector } from 'react-redux';
import CommentList from './CommentList';
import { useFetch } from '@/hooks/useFetch.js';

const Comment = ({props}) => {

    const [ newComment, setNewComment ] = useState()

    const user = useSelector((state) => state.user);

    const formSchema = z.object({
        comment: z.string().min(5, "Name must be at least 10 Character long!"),
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
        },
    });

    const onSubmit = async(values) => {
        try {

            const newValues = { ...values, blogid: props.blogid, user: user.user._id };
            const response = await fetch(`${getEnv('VITE_BACKEND_URL')}/comment/add`, {
                method: 'post',
                credentials: 'include',
                headers: {'Content-type': 'Application/json'}, 
                body: JSON.stringify(newValues),
            });
            const data = await response.json();
            if(!response.ok){
                return showToast('error', data.message);
            };
            setNewComment(data.comment)
            form.reset();
            showToast('success', data.message);

        } catch (error) {
            showToast('error', error.message);
        }
    };

    return (
    
        <div>
            
            {/* TItle */}
            <h4 className='flex items-center gap-2 text-2xl font-bold'>
                <GoCommentDiscussion className='text-blue-950' />
                Comment
            </h4>

            { user?.isLoggedIn
                ?
                    // Comment
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>

                            <div className='mb-3'>
                                <FormField control={form.control} name="comment"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Comment</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Type your comment" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mt-5'>
                                <Button type="submit" className='hover:scale-105 hover:transition-all hover:duration-300'>Submit</Button>
                            </div>
                        </form>
                    </Form>
                :   <Button asChild>
                        <Link to={RouteSignIn}>Sign In</Link>
                    </Button>
                }

                {/* Comments */}
                <div className='border-top mt-5'>
                    <CommentList props={{ blogid: props.blogid, newComment }} />
                </div>

        </div>

    );

};

export default Comment;
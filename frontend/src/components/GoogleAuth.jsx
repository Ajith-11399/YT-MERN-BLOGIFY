import React from 'react';
import { Button } from './ui/button';
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/helpers/firebase';
import { getEnv } from '@/helpers/getEnv.js';
import showToast from '@/helpers/showToast';
import { useNavigate } from 'react-router-dom';
import { RouteHome, RouteIndex } from '@/helpers/RouteName';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/userSlice';


const GoogleAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async() => {
        
        try {
            
            const googleResponse = await signInWithPopup( auth, provider );
            const user = googleResponse.user;
            const bodyData = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL,
            };
            
            const response = await fetch(`${getEnv('VITE_BACKEND_URL')}/auth/google-login`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                Credentials: 'include',
                body: JSON.stringify(bodyData),
            }); 
            
            const data = await response.json();
            if(!response.ok){
                showToast('error', data.message);
            };

            dispatch(setUser(data.user));
            navigate(RouteHome);
            showToast('success', data.message);

        } catch (error) {
            showToast('error', data.message);
        }
    }
    
    return (
    
        <Button variant='outline' className='w-full hover:shadow-lg transition-all' onClick={handleLogin} >
            <FcGoogle />
            Continue with Google
        </Button>
    
    );

};

export default GoogleAuth;
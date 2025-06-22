import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { MdLogin } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPlus, FaRegCircleUser, FaRegUser } from "react-icons/fa6";
import { IoLogOutOutline, IoSearch } from 'react-icons/io5';
import showToast from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv';
import { removeUser } from '@/redux/user/userSlice';
import { AiOutlineMenu } from 'react-icons/ai';
import { useSidebar } from './ui/sidebar';

const Topbar = () => {

    const { toggleSidebar } = useSidebar();

    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ showSearch, setShowSearch ] = useState(false);
    const [ isScroll, setIsScroll ] = useState(false);
    useEffect(()=> {
        window.addEventListener('scroll', ()=> {
            if(window.innerWidth >= 768 && scrollY >= 100){
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        })
    }, []);

    const handleLogout = async ()=> {
        try {
            const response = await fetch(`${getEnv('VITE_BACKEND_URL')}/auth/logout`,{
                method: 'get',
                credentials: 'include',
            });
            const data = await response.json();
            if(!response.ok){
                return showToast('error', data.message)
            };
            dispatch(removeUser());
            showToast('success', data.message);
            navigate(RouteIndex)
        } catch (error) {
            showToast('error', error.message);
        }
    }

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }

    return (

        <div className={`w-full flex justify-between items-center h-16 fixed z-20 px-5 ${ isScroll ? 'backdrop-blur-lg bg-white/10 shadow-lg transform-all duration-500' : 'backdrop-blur-none bg-white shadow-sm' }`}>
            
            <div className='flex items-center justify-center gap-5'>
                <button onClick={toggleSidebar} type='button' className='md:hidden'>
                    <AiOutlineMenu size={20} />
                </button>
                <Link to={RouteIndex}>
                    <p className='text-3xl font-bold text-blue-950 hover:scale-105 hover:transition-all hover:duration-300'>Blogify</p>
                </Link>
            </div>

            <div className='w-[500px]'>
                <div className={`md:relative md:block absolute bg-white md:bg-transparent left-0 md:top-0 top-16 md:p-0 p-5 w-full ${showSearch ? 'block' : 'hidden'}`}>
                    <SearchBox />
                </div>
            </div>

            <div className='flex items-center gap-5'>

                <button type='button' onClick={toggleSearch} className='block md:hidden'>
                    <IoSearch  size={25}/>
                </button>

                {
                    !user.isLoggedIn
                    ? <Button asChild>
                          <Link to={RouteSignIn} className='flex items-center justify-center px-5 py-2 hover:scale-105 hover:transition-all hover:duration-300'>
                                <MdLogin />Sign In
                          </Link>
                      </Button>
                    : <DropdownMenu>  
                          <DropdownMenuTrigger>
                              <Avatar className='flex items-center justify-center text-center w-[30px] h-[30px] text-blue-950 bg-slate-200 shadow-lg rounded-full'>
                                  { user?.user?.avatar
                                      ? <AvatarImage src={user.user.avatar} />
                                      : <FaRegCircleUser className='' />
                                  }
                              </Avatar>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='font-normal me-5'>
                              <DropdownMenuLabel>
                                  <p>{user?.user?.name}</p>
                                  <p className='text-xs text-gray-400'>{user?.user?.email}</p>
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator /> 
                              <DropdownMenuItem asChild className='cursor-pointer'>
                                  <Link className='flex gap-2 test-sm' to={RouteProfile}>
                                      <FaRegUser />
                                      Profile
                                  </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild className='cursor-pointer'>
                                  <Link className='flex gap-2 test-sm' to={RouteBlogAdd}>
                                      <FaPlus />
                                      Create Blog
                                  </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={handleLogout} className='w-full flex gap-2 test-sm text-red-700 text-center cursor-pointer'> 
                                  <IoLogOutOutline />
                                  Logout
                              </DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                }
            </div>

        </div>

    )

}

export default Topbar
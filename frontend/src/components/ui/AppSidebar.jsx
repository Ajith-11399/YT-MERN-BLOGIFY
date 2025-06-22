import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar";
import { Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
import { BiCategoryAlt } from "react-icons/bi";
import { RiBloggerLine } from "react-icons/ri";
import { LiaComments } from "react-icons/lia";
import { FiUsers } from "react-icons/fi";
import { GoDot } from "react-icons/go";
import { RouteBlogByCategory, RouteBlogs, RouteCategoryDetails, RouteComment, RouteIndex, RouteUser } from '@/helpers/RouteName';
import { useFetch } from '@/hooks/useFetch.js';
import { getEnv } from '@/helpers/getEnv.js';
import { useSelector } from 'react-redux';

const AppSidebar = () => {

    const user = useSelector((state) => state.user);

    const { data: categoryData } = useFetch(`${getEnv('VITE_BACKEND_URL')}/category/all`, {
        method: 'get',
        credentials: 'include',
    });

    return (
        
        <Sidebar>
            <SidebarHeader>
                <p className='text-3xl font-bold text-blue-950 pt-3'>Blogify</p>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <IoHomeOutline />
                                <Link to={RouteIndex}>Home</Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        {
                            user?.isLoggedIn
                            ?   <>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <RiBloggerLine />
                                            <Link to={RouteBlogs}>Blogs</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <LiaComments />
                                            <Link to={RouteComment}>Comments</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </>
                            : <></>
                        }
                        {
                            user?.isLoggedIn && user.user.role === 'admin'
                            ?   <>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <BiCategoryAlt />
                                            <Link to={RouteCategoryDetails}>Categories</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <FiUsers />
                                            <Link to={RouteUser}>Users</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </>
                            : <></>
                        }
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Categories
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        { categoryData?.category?.map((category) => (
                            <SidebarMenuItem key={category._id}>
                                <SidebarMenuButton>
                                    <GoDot />
                                    <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    
    )
    
}

export default AppSidebar
import Footer from '@/components/Footer';
import Topbar from '@/components/Topbar';
import AppSidebar from '@/components/ui/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        // Topbar
        // Sidebar
        <SidebarProvider>
            <AppSidebar />
            <Topbar />
            <main className='w-full shadow-lg'>
                <div className='w-full min-h-[calc(100vh-65px)] py-28 px-3 sm:px-5 md:px-10'>
                    <Outlet />
                </div>
                <Footer />
            </main>
        </SidebarProvider>
        
        // Footer
    )
}

export default Layout;
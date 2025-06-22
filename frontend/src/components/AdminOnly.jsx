import { RouteSignIn } from '@/helpers/RouteName';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminOnly = () => {

    const user = useSelector((state) => state.user);

    if(user?.isLoggedIn && user.user.role === 'admin' ){
        return (
            <Outlet />
        );
    } else {
        return <Navigate to={RouteSignIn} />
    }

};

export default AdminOnly;
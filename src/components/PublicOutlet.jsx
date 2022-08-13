import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PublicOutlet = () => {
    const { currentUser } = useAuth();

    return !currentUser ? <Outlet /> : <Navigate to={ '/' } />
};

export default PublicOutlet;
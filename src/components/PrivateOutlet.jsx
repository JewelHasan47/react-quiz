import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateOutlet = () => {
    const { currentUser } = useAuth();

    return currentUser ? <Outlet /> : <Navigate to={ '/login' } />
};

export default PrivateOutlet;
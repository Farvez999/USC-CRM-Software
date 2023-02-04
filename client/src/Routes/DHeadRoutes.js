import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useSeller from '../hooks/useSeller';
import Loading from '../Pages/Shared/Loading';

const DHeadRoutes = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isDHead, isDHeadLoading] = useSeller(user?.email);
    const location = useLocation();


    if (loading || isDHeadLoading) {
        return <Loading></Loading>
    }

    if (user && isDHead) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default DHeadRoutes;
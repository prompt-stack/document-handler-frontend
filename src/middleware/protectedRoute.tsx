import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated?: boolean | null }) => {
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    useEffect(() => {
        console.log("isAuthenticated: ", isAuthenticated);
        
    }, [isAuthenticated]);

   return <Outlet />;
};

export default ProtectedRoute;
import React from 'react'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({children}) => {
  const {user, loading} = useAuth();
  const {role, roleLoading} = useRole();
  const location = useLocation();

  if(loading || roleLoading){
    return <div className='spinner'></div>
  }

   if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if(role !== 'admin'){
    return <div className='text-red-600'>Forbidden</div>
  }

  return children;
}

export default AdminRoute;
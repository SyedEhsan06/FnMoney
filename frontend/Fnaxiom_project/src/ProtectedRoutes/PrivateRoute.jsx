import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  //if user is authenticated then cant access login page
    
  return isAuthenticated ? element : <Navigate to="/login" />;
  
};

export default PrivateRoute;

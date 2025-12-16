import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate } from 'react-router';
import Loading from '../components/Loading';

const PrivateRoute = ({children}) => {
  const {user,loading} = useContext(AuthContext);

  if(loading){
    return <Loading></Loading>;
  }

  if(!user){
   return <Navigate to='/auth/login'></Navigate>;
  }

  return children;
};

export default PrivateRoute;
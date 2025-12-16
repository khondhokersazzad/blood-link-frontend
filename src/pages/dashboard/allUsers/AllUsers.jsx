import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../provider/AuthProvider';

const AllUsers = () => {
  const {user} = useContext(AuthContext);
  const [users,setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(()=>{
    if(!user) return;
    axiosSecure
    .get('/users')
    .then(res => setUsers(res.data));
  },[axiosSecure,user])
  return (
    <div>
      
    </div>
  );
};

export default AllUsers;
import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../provider/AuthProvider";

const AllUsers = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  const fetchUsers = () => {
    axiosSecure.get("/users").then((res) => setUsers(res.data));
  }

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);


  const handleStatusChange = (email,status) =>{
    axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
     .then(() => {
      fetchUsers(); // ✅ now runs at the right time
    });
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Role</th>
              <th>Active Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((u) => {
              return (
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={u?.photoUrl}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{u?.displayName}</div>
                        <div className="text-sm opacity-50">{u?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{u?.role}</td>
                  <td>{u?.status}</td>
                  <th>
                    
                    {
                      u.status !== "active" ? <button onClick={()=>handleStatusChange(u?.email,"active")} className="btn text-white m-1 btn-success btn-sm w-24 justify-center">Activate</button>
                      : <button onClick={()=>handleStatusChange(u?.email,"block")} className="btn text-white m-1 btn-error btn-sm w-24 justify-center">Blocked</button>
                    }

                    
                    
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

import React, { useState, useEffect } from 'react';
import { Droplets, Clock, AlertCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const VolunteerDashBoardHome = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const{user} = useContext(AuthContext);

  useEffect(() => {
    axiosSecure.get('/all-request-count')
      .then(res => {
       setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        setRequests(err);
        setLoading(false);
      });
  }, [axiosSecure]);

  // Volunteers focus on what needs to be done NOW
  const pendingRequests = requests
    .filter(r => r.donation_status === "pending" || r.donation_status === "inprogress")
    .slice(0, 5);

  const stats = [
    {
      id: 1,
      label: "Pending Tasks",
      value: requests.filter(r => r.donation_status === "pending").length,
      icon: <Clock className="text-orange-500" />,
      color: "bg-orange-50",
    },
    {
      id: 2,
      label: "In Progress",
      value: requests.filter(r => r.donation_status === "inprogress").length,
      icon: <Droplets className="text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      id: 3,
      label: "Requests Today",
      value: requests?.filter(r => r.req_date === new Date().toISOString().split('T')[0]).length,
      icon: <AlertCircle className="text-red-500" />,
      color: "bg-red-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Volunteer Panel</h1>
        <p className="text-gray-600 text-lg flex items-center gap-2">
          Welcome back,
          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg font-bold text-2xl shadow-sm">
            {user?.displayName || "Hero"}
          </span>
          !
          <span className="text-gray-400 text-sm ml-2">
            Here is what's happening today.
          </span>
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(stat => (
          <div key={stat.id} className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm">
             <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
             <div>
               <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
               <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Coordination Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-semibold text-gray-700">Needs Coordination (Recent)</h2>
          <Link to="/dashboard/all-request" className="text-sm text-blue-600 hover:underline font-medium">
            View All Requests
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Recipient</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">Blood Group</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingRequests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-800">{req.rec_name}</p>
                    <p className="text-xs text-gray-500">{req.req_date}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {req.hospital}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                      {req.rec_blood}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      req.donation_status === 'Pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {req.donation_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      to={`/dashboard/all-request`} 
                      className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-red-600 transition-colors"
                    >
                      Manage <ChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {pendingRequests.length === 0 && !loading && (
            <div className="p-8 text-center text-gray-400 text-sm">
              All caught up! No pending requests need coordination right now.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashBoardHome;
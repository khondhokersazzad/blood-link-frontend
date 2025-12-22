import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router';

const BloodDonationRequest = () => {
  const [request,setRequest] = useState();
  const axiosInstance = useAxios();
  useEffect(()=>{
    axiosInstance.get('/all-blood-request')
    .then(res=> setRequest(res.data))
  },[axiosInstance])
  return (
    <div>
      <h2 className='text-center py-10 text-red-500 font-semibold capitalize text-3xl'>All Blood Donation Request</h2>
      <div className="w-11/12 py-4 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {request?.map((b) => {
        return (
          <div className="max-w-md rounded  2xl border border-red-100 bg-white p-5 shadow-sm hover:shadow-md transition">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Blood Request
              </h3>
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold uppercase">
                {b?.donation_status}
              </span>
            </div>

            {/* Body */}
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium text-gray-900">Recipient:</span>{" "}
                {b.rec_name}
              </p>
              <p>
                <span className="font-medium text-gray-900">Blood Group:</span>
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-red-50 text-red-600 font-semibold">
                 {b.rec_blood}
                </span>
              </p>
              <p>
                <span className="font-medium text-gray-900">Hospital:</span>{" "}
                {b.hospital}
              </p>
              <p>
                <span className="font-medium text-gray-900">Upazilla:</span>{" "}
                {b.rec_upazilla}Upazilla
              </p>
              <p>
                <span className="font-medium text-gray-900">District:</span>{" "}
                {b.rec_district}
              </p>
              <p>
                <span className="font-medium text-gray-900">Request Time:</span>{" "}
                {b.req_date}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-5">
              <Link  to={`/request-details/${b._id}`} className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition">
                View Details
              </Link>
            </div>
          </div>
        );
      })}
      </div>
    </div>

    
  );
};

export default BloodDonationRequest;
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllRequest = () => {
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequest, setMyRequest] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/all-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequest(res.data.request || []);
        setTotalRequest(res.data.totalRequest || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ALL REQUEST ERROR:", err.response?.status);
        setLoading(false);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numOfPage = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numOfPage).keys()].map((e) => e + 1);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Blood Requests</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Recipient</th>
              <th>Blood</th>
              <th>Location</th>
              <th>Hospital</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // SKELETON LOADING ROWS
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td><div className="skeleton h-4 w-4"></div></td>
                  <td><div className="skeleton h-4 w-24"></div></td>
                  <td><div className="skeleton h-6 w-12 rounded-full"></div></td>
                  <td><div className="skeleton h-4 w-32"></div></td>
                  <td><div className="skeleton h-4 w-28"></div></td>
                  <td><div className="skeleton h-4 w-20"></div></td>
                  <td><div className="skeleton h-6 w-16 rounded-full"></div></td>
                  <td className="flex gap-2 justify-center">
                    <div className="skeleton h-8 w-12"></div>
                    <div className="skeleton h-8 w-12"></div>
                  </td>
                </tr>
              ))
            ) : myRequest.length > 0 ? (
              myRequest.map((req, index) => (
                <tr key={req._id} className="hover">
                  <td>{(currentPage - 1) * itemsPerPage + (index + 1)}</td>
                  <td>{req.rec_name}</td>
                  <td><span className="badge badge-error badge-outline font-bold">{req.rec_blood}</span></td>
                  <td className="text-xs">{req.rec_district}, {req.rec_upazilla}</td>
                  <td>
                    <div className="text-sm">
                      <p className="font-semibold">{req.hospital}</p>
                      <p className="text-gray-500 text-xs">{req.address}</p>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">
                      <p>{req.req_date}</p>
                      <p className="text-gray-500 text-xs">{req.req_time}</p>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-sm ${req.donation_status === "inprogress" ? "badge-info" : "badge-warning"} text-white`}>
                      {req.donation_status || "pending"}
                    </span>
                  </td>
                  <td className="flex gap-2 justify-center">
                    <button className="btn btn-xs btn-info btn-outline">View</button>
                    <button className="btn btn-xs btn-success btn-outline">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-500">No requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-4">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="btn">Prev</button>
        {pages.map((p) => (
          <button 
            key={p} 
            className={`btn ${p === currentPage ? "bg-[#435585] text-white" : ""}`}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </button>
        ))}
        <button onClick={() => setCurrentPage(p => Math.min(pages.length, p + 1))} className="btn">Next</button>
      </div>
    </div>
  );
};

export default AllRequest;
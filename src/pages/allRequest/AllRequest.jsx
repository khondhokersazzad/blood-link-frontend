import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const AllRequest = () => {
  const { role } = useContext(AuthContext);
  // console.log("this is from firebase", role);
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequest, setMyRequest] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortStatus, setSortStatus] = useState();
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Fetch all requests based on pagination
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

  // Handle Deletion
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/request/delete/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              const filterData = myRequest.filter(
                (request) => request._id !== id
              );
              setMyRequest(filterData);
              Swal.fire(
                "Deleted!",
                "Your request has been deleted.",
                "success"
              );
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Could not delete the request.", "error");
          });
      }
    });
  };

  useEffect(() => {
    axiosSecure
      .get(`/sort-request?donation_status=${sortStatus}`)
      .then((res) => setMyRequest(res.data));
  }, [axiosSecure, sortStatus]);

  // Handle Status Change (Start, Done, Cancel)
  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosSecure.patch(
        `/request-details/${id}?donation_status=${status}`
      );

      if (res.data.modifiedCount > 0) {
        // Update the local state so the UI reflects the change immediately
        setMyRequest((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, donation_status: status } : req
          )
        );
        Swal.fire("Success", `Status updated to ${status}`, "success");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        All Blood Requests
      </h2>

      <select
        onChange={(e) => {
          setSortStatus(e.target.value);
          
        }}
        defaultValue="All Status"
        className="select m-5"
      >
        <option value="" disabled={false}>
          All status
        </option>
        <option>completed</option>
        <option>pending</option>
        <option>canceled</option>
        <option>inprogress</option>
      </select>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="table w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Recipient</th>
              <th>Blood</th>
              <th>Hospital</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td colSpan="7">
                    <div className="skeleton h-12 w-full mb-2"></div>
                  </td>
                </tr>
              ))
            ) : myRequest.length > 0 ? (
              myRequest.map((req, index) => (
                <tr key={req._id} className="hover">
                  <td>{(currentPage - 1) * itemsPerPage + (index + 1)}</td>
                  <td>{req.rec_name}</td>
                  <td>
                    <span className="badge badge-error badge-outline font-bold">
                      {req.rec_blood}
                    </span>
                  </td>
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
                    <span
                      className={`badge badge-sm text-white ${
                        req.donation_status === "inprogress"
                          ? "badge-info"
                          : req.donation_status === "completed"
                          ? "badge-success"
                          : req.donation_status === "canceled"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {req.donation_status || "pending"}
                    </span>
                  </td>
                  <td className="flex gap-2 justify-center items-center">
                    <Link
                      to={`/request-details/${req._id}`}
                      className="btn btn-xs btn-info btn-outline"
                    >
                      View
                    </Link>
                    {role === "admin" && (
                      <>
                        <Link
                          to={`/update-request-details/${req._id}`}
                          className="btn btn-xs btn-success btn-outline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="btn btn-xs btn-error btn-outline"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {/* Status Toggle Buttons */}
                    {req.donation_status === "pending" && (
                      <button
                        onClick={() =>
                          handleStatusChange(req._id, "inprogress")
                        }
                        className="btn btn-xs btn-warning"
                      >
                        Start
                      </button>
                    )}
                    {req.donation_status === "inprogress" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "completed")
                          }
                          className="btn btn-xs btn-success"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(req._id, "canceled")
                          }
                          className="btn btn-xs btn-error"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="btn"
        >
          Prev
        </button>
        {pages.map((p) => (
          <button
            key={p}
            className={`btn ${
              p === currentPage ? "bg-[#435585] text-white" : ""
            }`}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </button>
        ))}
        <button
          disabled={currentPage === pages.length}
          onClick={() => setCurrentPage((p) => Math.min(pages.length, p + 1))}
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllRequest;

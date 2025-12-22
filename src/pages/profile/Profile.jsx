import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const Profile = () => {
  const [user, setUser] = useState(null);

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get("/users/data").then((res) => setUser(res.data));
  }, [axiosSecure]);
  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">My Profile</h2>

          {/* Edit button (UI only) */}
          <Link
            to="/dashboard/update-profile"
            className="btn btn-sm btn-outline"
          >
            Edit Profile
          </Link>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 rounded-full border overflow-hidden">
              <img
                src={user?.photoUrl}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={user?.name}
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            {/* Email (never editable) */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={user?.email}
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <input
                type="text"
                value={user?.bloodgrp}
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            {/* District */}
            <div>
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <input
                type="text"
                value={user?.district}
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            {/* Upazila */}
            <div className="md:col-span-2">
              <label className="label">
                <span className="label-text">Upazila</span>
              </label>
              <input
                type="text"
                value={user?.upazilla}
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

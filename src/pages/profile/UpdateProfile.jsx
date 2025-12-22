import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

const UpdateProfile = () => {
  const [user, setUser] = useState(null);

  const [upazila, setUpazila] = useState([]);
  const [district, setDistrict] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    axios
      .get("/upazilla.json")
      .then((res) => setUpazila(res.data.upazilas))
      .catch((err) => console.log(err));

    axios
      .get("/district.json")
      .then((res) => setDistrict(res.data.districts))
      .catch((err) => console.log(err));
  }, []);

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get("/users/data").then((res) => setUser(res.data));
  }, [axiosSecure]);
  

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const bloodgrp = e.target.bloodgrp.value;
    const upazilla = e.target.upazilla.value;
    const district = e.target.district.value;
    const formData = { name, bloodgrp, upazilla, district };

    axiosSecure
      .put("/users/data", formData)
      .then((res) => {
        //console.log(res.data);
        navigation("/dashboard/profile");
      })
      .catch((errr) => console.log(errr));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Update Profile
          </h2>
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
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                defaultValue={user?.name}
                name="name"
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
                defaultValue={user?.email}
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Blood Group */}
            <div>
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                name="bloodgrp"
                defaultValue={user?.bloodgrp}
                className="select"
              >
                <option disabled={true}>{user?.bloodgrp}</option>

                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* District */}
            <div>
              <label className="label">
                <span className="label-text">Upazilla</span>
              </label>
              <select
                name="upazilla"
                defaultValue={user?.upazilla}
                className="select"
              >
                <option disabled={true}>{user?.upazilla}</option>

                {upazila.map((u) => (
                  <option value={u?.name} key={u?.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Upazila */}
            <div className="md:col-span-2">
              <label className="label block">
                <span className="label-text">District</span>
              </label>
              <select
                name="district"
                defaultValue={user?.district}
                className="select"
              >
                <option disabled={true}>{user?.district}</option>

                {district.map((d) => (
                  <option value={d?.name} key={d?.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-sm btn-outline ">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

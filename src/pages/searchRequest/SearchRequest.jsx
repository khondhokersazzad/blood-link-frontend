import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";

const SearchRequest = () => {
  const [upazila, setUpazila] = useState([]);
  const [district, setDistrict] = useState([]);
  const [bloodReq, setBloodReq] = useState([]);

  const axiosInstance = useAxios();

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
  const handleSearch = (e) => {
    e.preventDefault();

    const bloodgrp = e.target.bloodgrp.value;
    const upazilla = e.target.upazilla.value;
    const district = e.target.district.value;

    const params = new URLSearchParams();

    if (bloodgrp) params.append("bloodgrp", bloodgrp);
    if (upazilla) params.append("upazilla", upazilla);
    if (district) params.append("district", district);

    axiosInstance.get(`/search-request?${params.toString()}`).then((res) => {
      setBloodReq(res.data);
    });
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="card-body">
        <fieldset className="fieldset     ">
          <div className="w-11/12 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="label">Choose Your Blood Group</label>
              <select name="bloodgrp" defaultValue="" className="select">
                <option value="" disabled={false}>
                  Select Blood Group
                </option>

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

            <div>
              <label className="label">Choose Your Upazilla</label>
              <select name="upazilla" defaultValue="" className="select">
                <option value="" disabled={false}>
                  Select Your Upazilla
                </option>

                {upazila.map((u) => (
                  <option value={u?.name} key={u?.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Choose Your District</label>
              <select name="district" defaultValue="" className="select">
                <option value="" disabled={false}>
                  Select Your District
                </option>

                {district.map((d) => (
                  <option value={d?.name} key={d?.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-center mx-auto">
            <br />
            <button className="btn btn-outline">Submit</button>
          </div>
        </fieldset>
      </form>

      {/* card  */}

      <div className="w-11/12 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {bloodReq.map((b) => {
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
                  <span className="font-medium text-gray-900">
                    Blood Group:
                  </span>
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
                  <span className="font-medium text-gray-900">
                    Request Time:
                  </span>{" "}
                  {b.req_date}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-5">
                <Link
                  to={`/request-details/${b._id}`}
                  className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
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

export default SearchRequest;

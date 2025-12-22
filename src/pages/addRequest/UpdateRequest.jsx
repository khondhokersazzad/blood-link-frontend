import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

const UpdateRequest = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const navigation = useNavigate();

  const axiosSecure = useAxiosSecure();

  const [upazila, setUpazila] = useState([]);
  const [district, setDistrict] = useState([]);
  const [bloodReq, setBloodReq] = useState([]);

  //Fetch data for District and upazilla
  useEffect(() => {
    axios
      .get("/upazilla.json")
      .then((res) => setUpazila(res.data.upazilas))
      .catch((err) => console.log(err));

    axios
      .get("/district.json")
      .then((res) => setDistrict(res.data.districts))
      .catch((err) => console.log(err));

    axiosSecure
      .get(`/update-request-details/${id}`)
      .then((res) => {
        setBloodReq(res.data);
      })
      .catch((err) => console.log(err));
  }, [axiosSecure, id]);

  const handleUpdateRequest = (e) => {
    e.preventDefault();
    const req_name = e.target.req_name.value;
    const req_email = e.target.req_email.value;
    const rec_name = e.target.rec_name.value;
    const rec_blood = e.target.rec_blood.value;
    const rec_district = e.target.rec_district.value;
    const rec_upazilla = e.target.rec_upazilla.value;
    const address = e.target.address.value;

    const hospital = e.target.hospital.value;
    const req_date = e.target.req_date.value;
    const req_time = e.target.req_time.value;

    const formData = {
      req_name,
      req_email,
      rec_name,
      rec_blood,
      rec_district,
      rec_upazilla,
      address,
      hospital,
      req_date,
      req_time,
    };

    axiosSecure
      .put(`/update-request-details/${bloodReq?._id}`, formData)
      .then((res) => {
        setBloodReq(res.data);
        toast.success("Successfully Updated Request");
        navigation("/dashboard/all-request");
      })
      .catch((errr) => console.log(errr));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl my-2 text-center font-semibold text-red-600">
            Update Blood Donation Request
          </h2>
          <p className="text-sm text-center text-gray-500">
            BloodLink · Linking Lives Through Blood
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdateRequest} className="space-y-6">
          {/* Requester Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requester Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                value={user?.displayName}
                name="req_name"
                readOnly
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Requester Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={user?.email}
                name="req_email"
                readOnly
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Recipient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Name
              </label>
              <input
                type="text"
                name="rec_name"
                defaultValue={bloodReq?.rec_name}
                placeholder="Recipient Full Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <select
                name="rec_blood"
                defaultValue={bloodReq?.rec_blood}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option disabled={true}>Select Blood Group</option>
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
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient District
              </label>
              <select
                name="rec_upazilla"
                defaultValue={bloodReq?.rec_upazilla}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option disabled={true}>Select Your Upazilla</option>

                {upazila.map((u) => (
                  <option value={u?.name} key={u?.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Upazila
              </label>
              <select
                name="rec_district"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                defaultValue={bloodReq?.rec_district}
              >
                <option disabled={true}>Select Your District</option>

                {district.map((d) => (
                  <option value={d?.name} key={d?.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hospital & Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hospital Name
            </label>
            <input
              name="hospital"
              type="text"
              defaultValue={bloodReq?.hospital}
              placeholder="Dhaka Medical College Hospital"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Address
            </label>
            <input
              name="address"
              type="text"
              defaultValue={bloodReq?.address}
              placeholder="Zahir Raihan Rd, Dhaka"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donation Date
              </label>
              <input
                type="date"
                name="req_date"
                defaultValue={bloodReq?.req_date}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donation Time
              </label>
              <input
                type="time"
                name="req_time"
                defaultValue={bloodReq?.req_time}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Request Message
            </label>
            <textarea
              name="message"
              rows="4"
              defaultValue={bloodReq?.message}
              placeholder="Explain why blood is needed..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            ></textarea>
          </div>

          {/* Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition"
            >
              Update Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRequest;

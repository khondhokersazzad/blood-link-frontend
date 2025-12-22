import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestDetails = () => {
  const [details, setDetails] = useState();
  const [donor, setDonor] = useState();

  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  useEffect(() => {
    axiosSecure
      .get(`/request-details/${id}`)
      .then((res) => setDetails(res.data))
      .catch((err) => console.log(err));
  }, [axiosSecure, id]);

  useEffect(() => {
    axiosSecure
      .get("/users/data")
      .then((res) => setDonor(res.data))
      .catch((err) => console.log(err));
  }, [axiosSecure]);

  const handleStatusChange = async (status) => {
    try {
      const res = await axiosSecure.patch(
        `/request-details/${id}?donation_status=${status}`
      );

      if (res.data.modifiedCount > 0) {
        setDetails((prev) => ({
          ...prev,
          donation_status: status,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      {/* 8. Blood Donation Request Details Page Container */}
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        {/* Header Section */}
        <div className="bg-red-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wide">
            Blood Request Details
          </h1>
          <p className="mt-2 opacity-90">Every donation is a gift of life.</p>
        </div>

        {/* Details Grid  */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <label className="text-sm font-semibold text-gray-400 uppercase">
              Recipient Name
            </label>
            <p className="text-lg font-medium">{details?.rec_name}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-400 uppercase">
              Blood Group
            </label>
            <p className="text-lg font-bold text-red-600">
              {details?.rec_blood}
            </p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-400 uppercase">
              Location
            </label>
            <p className="text-lg">
              {details?.rec_district}, {details?.rec_upazilla}
            </p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-400 uppercase">
              Donation Status
            </label>
            <p className="text-lg">{details?.donation_status} </p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-400 uppercase">
              Date & Time
            </label>
            <p className="text-lg">
              {details?.req_date} at {details?.req_time}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-400 uppercase">
              Hospital Information
            </label>
            <p className="text-lg font-medium">{details?.hospital}</p>
            <p className="text-sm text-gray-500 italic">{details?.address}</p>
          </div>
          <div className="md:col-span-2 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <label className="text-sm font-semibold text-red-600 uppercase">
              Detailed Message
            </label>
            <p className="mt-1 text-gray-700 leading-relaxed">
              Looking for a hero! 🩸 We urgently need {details?.rec_blood} blood
              donors for a patient at {details?.hospital}.Please msg me at{" "}
              {details?.req_email}
            </p>
          </div>
        </div>

        {/* Footer Action  */}
        <div className="p-6 bg-gray-50 flex justify-center">
          {details?.donation_status === "pending" ? (
            <button
              type="button"
              onClick={() =>
                document.getElementById("donation_modal").showModal()
              }
              className="btn btn-wide bg-red-600 hover:bg-red-700 text-white border-none text-lg shadow-lg transition-transform active:scale-95"
            >
              Donate Now
            </button>
          ) : (
            <button
              disabled
              className="btn btn-wide btn-disabled bg-gray-200 text-gray-500 border-none text-lg"
            >
              ✅ Donation {details?.donation_status}
            </button>
          )}
        </div>
      </div>

      {/* Donation Modal  */}
      <dialog
        id="donation_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-red-600 mb-4">
            Confirm Donation
          </h3>
          <p className="text-gray-600 mb-6 italic">
            Please verify your information before confirming.
          </p>

          <div className="space-y-4">
            {/* Donor Name - Read Only */}
            <div className="form-control">
              <label className="label px-3">
                <span className="label-text font-semibold">Donor Name:</span>
              </label>
              <input
                type="text"
                value={donor?.name}
                readOnly
                className="input input-bordered bg-gray-100"
              />
            </div>
            {/* Donor Email - Read Only  */}
            <div className="form-control">
              <label className="label px-3">
                <span className="label-text font-semibold">Donor Email:</span>
              </label>
              <input
                type="email"
                value={donor?.email}
                readOnly
                className="input input-bordered bg-gray-100"
              />
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button className="btn btn-outline border-gray-300">
                Cancel
              </button>
              <button
                onClick={() => handleStatusChange("inprogress")}
                className="btn bg-red-600 text-white border-none hover:bg-red-700"
              >
                Confirm Donation
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestDetails;

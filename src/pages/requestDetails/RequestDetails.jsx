import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const RequestDetails = () => {

  const [details,setDetails] = useState();
  const axiosSecure = useAxiosSecure();
  const {id} = useParams();
  const demoRequest = {
    recipient_name: "John Doe",
    recipient_district: "Dhaka",
    recipient_upazila: "Dhanmondi",
    hospital_name: "Dhaka Medical College Hospital",
    full_address: "Zahir Raihan Rd, Dhaka",
    blood_group: "O+",
    donation_date: "2024-06-15",
    donation_time: "10:30 AM",
    request_message: "Urgent need for O+ blood for a major surgery scheduled tomorrow morning. Please help if you are nearby."
  };

  const loggedInUser = {
    name: "Alex Smith",
    email: "alex@example.com"
  };

  useEffect(()=>{
    axiosSecure.get(`/request-details/${id}`)
    .then(res => setDetails(res.data))
    .catch(err => console.log(err));
    
  },[axiosSecure, id])

  console.log(details);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      {/* 8. Blood Donation Request Details Page Container [cite: 224] */}
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-red-600 p-6 text-white text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wide">Blood Request Details</h1>
          <p className="mt-2 opacity-90">Every donation is a gift of life.</p>
        </div>

        {/* Details Grid  */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <label className="text-sm font-semibold text-gray-400 uppercase">Recipient Name</label>
            <p className="text-lg font-medium">{details?.rec_name}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-400 uppercase">Blood Group</label>
            <p className="text-lg font-bold text-red-600">{details?.rec_blood}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-400 uppercase">Location</label>
            <p className="text-lg">{details?.rec_district}, {details?.rec_upazilla}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-400 uppercase">Date & Time</label>
            <p className="text-lg">{details?.req_date} at {details?.req_time}</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-400 uppercase">Hospital Information</label>
            <p className="text-lg font-medium">{details?.hospital}</p>
            <p className="text-sm text-gray-500 italic">{details?.address}</p>
          </div>
          <div className="md:col-span-2 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <label className="text-sm font-semibold text-red-600 uppercase">Detailed Message</label>
            <p className="mt-1 text-gray-700 leading-relaxed">Looking for a hero! 🩸 We urgently need {details?.rec_blood} blood donors for a patient at {details?.hospital}.Please msg me at {details?.req_email}</p>
          </div>
        </div>

        {/* Footer Action  */}
        <div className="p-6 bg-gray-50 flex justify-center">
          <button 
            onClick={() => document.getElementById('donation_modal').showModal()}
            className="btn btn-wide bg-red-600 hover:bg-red-700 text-white border-none text-lg"
          >
            Donate Now
          </button>
        </div>
      </div>

      {/* Donation Modal  */}
      <dialog id="donation_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-red-600 mb-4">Confirm Donation</h3>
          <p className="text-gray-600 mb-6 italic">Please verify your information before confirming. [cite: 233]</p>
          
          <div className="space-y-4">
            {/* Donor Name - Read Only [cite: 230] */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Donor Name</span></label>
              <input type="text" value={loggedInUser.name} readOnly className="input input-bordered bg-gray-100" />
            </div>
            {/* Donor Email - Read Only [cite: 231] */}
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Donor Email</span></label>
              <input type="email" value={loggedInUser.email} readOnly className="input input-bordered bg-gray-100" />
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button className="btn btn-outline border-gray-300">Cancel</button>
              <button className="btn bg-red-600 text-white border-none hover:bg-red-700">Confirm Donation</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestDetails;
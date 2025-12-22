import React from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const ContactSection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-500 mt-2 text-lg">
            Have questions? Call us at <span className="text-red-600 font-bold"> BLOOD-LINK</span>
          </p>
        </div>

        {/* Simple Form */}
        <form onSubmit={(e) => {
          e.preventDefault();
          toast.success("Successfully Submitted");
          navigate('/');
        }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
          
          <input 
            type="text" 
            placeholder="Subject" 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          />
          
          <textarea 
            rows="4" 
            placeholder="Your Message" 
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          ></textarea>

          <button 
            type="submit" 
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
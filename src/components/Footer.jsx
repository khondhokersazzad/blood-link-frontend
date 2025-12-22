import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="shadow-sm bg-gradient-to-r from-sky-100 via-purple-100 to-emerald-100 border-t border-gray-200 py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand Logo */}
          <div className="text-2xl font-bold text-gray-900">
            blood<span className="text-red-600">Link</span>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} bloodLink. All rights reserved.
          </p>

          {/* Social Links (Simple Icons) */}
          <div className="flex gap-6 text-gray-400">
            <Link to="#" className="hover:text-red-600 transition-colors">Facebook</Link>
            <Link to="#" className="hover:text-red-600 transition-colors">Twitter</Link>
            <Link to="#" className="hover:text-red-600 transition-colors">Instagram</Link>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
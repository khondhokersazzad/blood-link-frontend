import React from "react";
import { Link } from "react-router";

const Aside2 = () => {
  return (
    <div>
      <aside className="w-64 min-h-screen bg-gray-900 text-gray-200 flex flex-col">
        {/* Logo / Project Name */}
        <div className="px-6 py-5 border-b border-gray-800">
          <Link to='/' className="text-2xl font-bold text-red-500">BloodLink</Link>
          <p className="text-xs text-gray-400 mt-1">
            Linking Lives Through Blood
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer">
            Dashboard
          </div>

          <Link className="px-4 py-2 block rounded-lg hover:bg-gray-800 cursor-pointer">
            Profile
          </Link>

          <Link to='/dashboard/add-request' className="px-4 py-2 rounded-lg hover:bg-gray-800 block cursor-pointer">
            Blood Requests
          </Link>

          <Link to='/dashboard/users' className="px-4 py-2 rounded-lg hover:bg-gray-800 block cursor-pointer">
            All Users
          </Link>

          <div className="px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer">
            Reports
          </div>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 text-sm text-gray-400">
          © 2025 BloodLink
        </div>
      </aside>
    </div>
  );
};

export default Aside2;

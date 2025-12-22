import React, { useContext, useState } from "react";
import BloodLink from "../assets/bloodlink.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

const NavBar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [open,setOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div>
      <div className="flex justify-center items-center py-5 bg-gradient-to-br from-amber-100 via-orange-100 to-slate-100">
        <img src={BloodLink} alt="" height="120" width="120" />
      </div>
      <div
        className="navbar shadow-sm bg-gradient-to-r from-sky-100 via-purple-100 to-emerald-100


"
      >
        <div className="navbar-start">
          <NavLink className="btn btn-ghost text-xl text-blue-500" to="/">
            BloodLink
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex font-semibold text-[16px]">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-700 font-bold underline underline-offset-4"
                    : "hover:text-purple-700"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-700 font-bold underline underline-offset-4"
                    : "hover:text-purple-700"
                }
                to="/blood-donation-request"
              >
                Donation Requests
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-700 font-bold underline underline-offset-4"
                    : "hover:text-purple-700"
                }
                to="/search-request"
              >
                Search
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-purple-700 font-bold underline underline-offset-4"
                    : "hover:text-purple-700"
                }
                to="/funding"
              >
                Funding
              </NavLink>
            </li>

            
          </ul>
        </div>
        <div className="navbar-end">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white/80 backdrop-blur-md rounded-box mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-purple-700 font-bold" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/all-products"
                  className={({ isActive }) =>
                    isActive ? "text-purple-700 font-bold" : ""
                  }
                >
                  Pets & Supplies Page
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-purple-700 font-bold underline underline-offset-4"
                          : "hover:text-purple-700"
                      }
                      to="/profile"
                    >
                      My Profile
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-purple-700 font-bold underline underline-offset-4"
                          : "hover:text-purple-700"
                      }
                      to="/add-listing"
                    >
                      Add Listing
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-purple-700 font-bold underline underline-offset-4"
                          : "hover:text-purple-700"
                      }
                      to="/my-listing"
                    >
                      My Listing
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-purple-700 font-bold underline underline-offset-4"
                          : "hover:text-purple-700"
                      }
                      to="/my-orders"
                    >
                      My Orders
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {user?.uid ? (
            <div className="relative mr-5">
              <button className="avatar cursor-pointer" onClick={()=> setOpen(!open)}>
                <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2">
                  <img src={user?.photoURL} alt="avatar" />
                </div>
              </button>

              {/* DropDown  */}
              {
                open && 
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-lg z-50">

                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
              }
              
            </div>
          ) : (
            <Link className="btn" to="/auth/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

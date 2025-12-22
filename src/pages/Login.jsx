import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { user, setUser, handleGoogleSignIn } = useContext(AuthContext);

  const location = useLocation();

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log({ email, password });

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);
        // navigate(location.state);
        //navigate('/profile');
        navigate("/");
        toast.success("Sign in successfull");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then((res) => {
        const user = res.user;
        setUser(user);
        navigate("/profile");
        toast.success("Sign in successfull");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleForget = () => {
    navigate(`/auth/forget/${userEmail}`);
  };

  return (
    <div>
      <title>Login</title>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col w-full">
          <h1 className="text-5xl font-bold">Login now!</h1>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                  onChange={(e) => {
                    return setUserEmail(e.target.value);
                  }}
                />
                <div className="relative">
                  <label className="label">Password</label>
                  <input
                    type={show ? "text" : "password"}
                    className="input"
                    placeholder="Password"
                    name="password"
                    required
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-6 top-8 cursor-pointer"
                  >
                    {show ? <FaEye /> : <IoEyeOff />}
                  </span>
                </div>
                <div>
                  <button
                    onClick={handleForget}
                    type="button"
                    className="link link-hover "
                  >
                    Forgot password?
                  </button>
                </div>
                <button type="submit" className="btn btn-neutral mt-4">
                  Login
                </button>

                <button
                  type="button"
                  onClick={googleSignIn}
                  className="btn bg-white text-black border-[#e5e5e5]"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>
              </fieldset>
              <h1 className="text-center text-lg mt-4 text-gray-600">
                New here?{" "}
                <Link
                  to="/auth/register"
                  className="text-blue-600 font-semibold hover:underline hover:text-blue-800 transition"
                >
                  Register
                </Link>{" "}
              </h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

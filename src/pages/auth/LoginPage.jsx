import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuEye, LuEyeOff } from "react-icons/lu";
import AuthServices2 from "../../services/AuthServices2";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [errors, setErrors] = useState({ email: "", password: "" });
  const validateEmail = (email) => {
    if (!email) {
      return "Enter your email.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }

    return "";
  };
  const validatePassword = (password) => {
    if (!password) {
      return "Enter your password.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Enter you email.");
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    }
    if (!password) {
      setPasswordError("Enter your password");
    }

    if (email && password) {
      try {
        const data = await AuthServices2.login(email, password);
        console.log("login data >> ", data);
        toast.success(data.message);
        Cookies.set("token", data.accessToken);
        Cookies.set("adminEmail", data.profile.email);
        Cookies.set("adminName", data.profile.name);
        navigate("/");
      } catch (error) {
        console.error("Login error:", error.message);
        toast.error(error.message);
      }
    } else {
      console.log("ofinefoenfioefiu");
    }
  };

  useEffect(() => {
    document.title = "TRTPEP Admin Dashboard - Login";
  }, []);

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="max-h-screen overflow-hidden flex fle-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full min-h-screen">
          <div className="p-6 lg:p-10 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] w-full h-full flex justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 w-[95%] lg:w-[75%]"
            >
              <div className="mb-6">
                <h3 className="text-4xl font-normal">Hello,</h3>
                <h3 className="text-5xl font-extrabold">Welcome!,</h3>
                <p className="text-sm mt-4 text-red-600">{error}</p>
              </div>
              <div>
                <label className="text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    // autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm border border-gray-300 px-4 py-4 rounded outline-none"
                    placeholder="Enter email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="10"
                      cy="7"
                      r="6"
                      data-original="#000000"
                    ></circle>
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
                {emailError && (
                  <p className="text-xs text-red-600">{emailError}</p>
                )}
              </div>
              <div>
                <label className="text-sm mb-1 block">Password</label>
                <div className="relative flex items-center border justify-start border-gray-300 rounded px-4">
                  <input
                    name="password"
                    type={showPass ? "text" : "password"}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm py-4 outline-none"
                    placeholder="Enter password"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <LuEye className="text-lg text-gray-400" />
                    ) : (
                      <LuEyeOff className="text-lg text-gray-400" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-red-600">{passwordError}</p>
                )}
              </div>
              <div className="text-sm text-end">
                <Link
                  to="/verify-email"
                  className="text-[#9f9fa0] hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="!mt-4">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3.5 px-4 text-sm font-semibold rounded-md text-white bg-red-500 hover:bg-opacity-85 focus:outline-none"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
          <div className="bg-gray-200 h-full hidden md:block">
            <img
              src="/login-mockup.svg"
              alt="login-screen-mockup"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

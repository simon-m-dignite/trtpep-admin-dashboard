import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("new-patients");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const navigateTo = (title, url) => {
    navigate(url);
    setActiveLink(title);
  };

  return (
    <div className="w-full flex flex-col items-start text-start gap-2 pt-10 px-14">
      <Link to="/" className="mx-auto mb-6">
        <img src="/TRTPEP-LOGO.png" alt="trtpep-loog" className="w-20" />
      </Link>

      <button
        type="button"
        onClick={() => navigateTo("new-patients", "/")}
        className={`w-full ${
          activeLink === "new-patients"
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        } py-2.5 px-4 lg:px-6 text-sm rounded-lg text-start`}
      >
        New Patients
      </button>
      <button
        type="button"
        onClick={() => navigateTo("lab-orders", "/lab-orders")}
        className={`w-full ${
          activeLink === "lab-orders"
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        } py-2.5 px-4 lg:px-6 text-sm rounded-lg text-start`}
      >
        Lab Orders
      </button>
      <button
        type="button"
        onClick={() => navigateTo("enrolled-patients", "/enrolled-patients")}
        className={`w-full ${
          activeLink === "enrolled-patients"
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        } py-2.5 px-4 lg:px-6 text-sm rounded-lg text-start`}
      >
        Enrolled Patients
      </button>
      <button
        onClick={handleLogout}
        className="w-full text-black py-2.5 px-4 lg:px-6 text-sm text-start rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

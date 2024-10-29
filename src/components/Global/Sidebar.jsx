import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MdKeyboardArrowDown } from "react-icons/md";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("new-patients");
  const navigate = useNavigate();
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const navigateTo = (title, url) => {
    navigate(url);
    setActiveLink(title);
  };

  const togglePoliciesDropdown = () => {
    setIsPoliciesOpen(!isPoliciesOpen);
  };

  return (
    <div className="w-full h-full overflow-y-scroll flex flex-col items-start text-start gap-2 pt-10 px-7 xl:px-10 sidebar">
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
        Therapy Orders
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
        Only Lab Orders
      </button>
      <button
        type="button"
        onClick={() => navigateTo("customers", "/customers")}
        className={`w-full ${
          activeLink === "customers"
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        } py-2.5 px-4 lg:px-6 text-sm rounded-lg text-start`}
      >
        Customers
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
        type="button"
        onClick={() => navigateTo("products", "/products")}
        className={`w-full ${
          activeLink === "products"
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        } py-2.5 px-4 lg:px-6 text-sm rounded-lg text-start`}
      >
        Products
      </button>
      <button
        type="button"
        onClick={() => navigateTo("faqs", "/faqs")}
        className={`w-full ${
          activeLink === "faqs"
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        } py-2.5 px-4 lg:px-6 text-sm rounded-lg text-start`}
      >
        FAQs
      </button>
      <button
        type="button"
        onClick={() => navigateTo("blogs", "/blogs")}
        className={`w-full ${
          activeLink === "blogs"
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        } py-2.5 px-4 lg:px-6 text-sm rounded-lg text-start`}
      >
        Blogs
      </button>

      <div className="w-full">
        <button
          type="button"
          onClick={togglePoliciesDropdown}
          className={`w-full ${
            activeLink === "policies"
              ? "bg-red-500 text-white"
              : "bg-white text-black"
          } py-2.5 px-4 lg:px-6 text-sm rounded-lg text-start flex justify-between`}
        >
          Policies
          <span>
            <MdKeyboardArrowDown
              className={`text-lg ${
                isPoliciesOpen ? "rotate-180" : "rotate-0"
              } transition-all duration-300`}
            />
          </span>{" "}
          {/* Dropdown Arrow */}
        </button>
        {isPoliciesOpen && (
          <div className="ml-4 pl-2 flex flex-col gap-1">
            <button
              type="button"
              onClick={() =>
                navigateTo("privacy-policy", "/policy/privacy-policy")
              }
              className="w-full bg-white text-black py-2 px-4 lg:px-3 text-xs rounded-lg text-start"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() =>
                navigateTo("cancelation-policy", "/policy/cancelation-policy")
              }
              className="w-full bg-white text-black py-2 px-4 lg:px-3 text-xs rounded-lg text-start"
            >
              Cancelation Policy
            </button>
            <button
              type="button"
              onClick={() =>
                navigateTo("terms-conditions", "/policy/terms-of-service")
              }
              className="w-full bg-white text-black py-2 px-4 lg:px-3 text-xs rounded-lg text-start"
            >
              Terms of Service
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => navigateTo("prices", "/prices")}
        className={`w-full ${
          activeLink === "prices"
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        } py-2.5 px-4 lg:px-6 text-sm rounded-lg text-start`}
      >
        Prices
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

import React from "react";
import CustomerDetails from "../../components/Customers/CustomerDetails";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CustomerDetailsPage = () => {
  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="w-full flex items-center gap-3 mb-6">
        <Link to={"/customers"}>
          <FaArrowLeft className="text-xl" />
        </Link>
        <h2 className="text-xl font-semibold">Customer Detials</h2>
      </div>
      <CustomerDetails />
    </div>
  );
};

export default CustomerDetailsPage;

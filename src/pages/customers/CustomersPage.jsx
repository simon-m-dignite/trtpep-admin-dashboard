import React from "react";
import CustomersList from "../../components/Customers/CustomersList";

const CustomersPage = () => {
  return (
    <div className="w-full p-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">Customers</h2>

      <CustomersList />
    </div>
  );
};

export default CustomersPage;

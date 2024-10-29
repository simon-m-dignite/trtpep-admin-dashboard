import React from "react";
import EditPricesForm from "../../components/Prices/EditPricesForm";

const UpdatePricesPage = () => {
  return (
    <div className="bg-gray-50 p-6">
      <div className="w-full flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold">Update Prices</h1>
      </div>
      <EditPricesForm />
    </div>
  );
};

export default UpdatePricesPage;

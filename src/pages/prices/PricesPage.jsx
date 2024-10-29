import React from "react";
import PricesList from "../../components/Prices/PricesList";

const PricesPage = () => {
  return (
    <div className="bg-gray-50 p-6">
      <div className="w-full flex items-center justify-between mb-5">
        <h1 className="text-xl font-semibold">Prices</h1>
      </div>
      <PricesList />
    </div>
  );
};

export default PricesPage;

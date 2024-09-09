import React, { useEffect } from "react";
import LabOrdersList from "../../components/LabOrders/LabOrdersList";

const LabOrders = () => {
  useEffect(() => {
    document.title = "TRTPEP - Lab Orders";
  }, []);
  return (
    <div className="w-full bg-gray-50 p-6">
      <h1 className="font-semibold text-xl">Lab Orders</h1>

      <LabOrdersList />
    </div>
  );
};

export default LabOrders;

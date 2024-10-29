import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import labServices from "../../services/labServices";
import { FaArrowLeft } from "react-icons/fa";

const LabOrderdetailsPage = () => {
  const { id } = useParams();
  // console.log("id >> ", id);
  const [labOrderDetails, setLabOrderDetails] = useState(null);

  useEffect(() => {
    const fetchPatientInformation = async () => {
      try {
        const data = await labServices.fetchLabOrder(id);
        console.log("labOrderDetails >> ", data);
        setLabOrderDetails(data?.labOrder);
      } catch (error) {
        console.log("labOrderDetails error >> ", error);
      }
    };

    fetchPatientInformation();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  };
  return (
    <div className="w-full bg-gray-50 p-6 min-h-screen">
      <div className="flex items-center gap-3">
        <Link to={"/lab-orders"}>
          <FaArrowLeft className="text-xl" />
        </Link>
        <h1 className="font-semibold text-xl">Lab Order Details</h1>
      </div>

      <div className="w-full bg-white rounded-xl p-6 lg:p-8 mt-6">
        <div className="w-full flex items-start justify-between">
          <h2 className="font-medium text-lg mb-6">Patient Info:</h2>
          <a
            href={`http://localhost:8000${labOrderDetails?.invoicePath}`}
            target="_blank"
            className="text-sm underline text-red-500 font-semibold"
          >
            View Invoice
          </a>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          <div className="flex flex-col items-start gap-1">
            <p className="font-medium">Name:</p>
            <p className="text-sm font-medium secondary-text">
              {labOrderDetails?.firstName} {labOrderDetails?.lastName}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="font-medium">Phone No.</p>
            <p className="text-sm font-medium secondary-text">
              {labOrderDetails?.phone}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="font-medium">Phone No.</p>
            <p className="text-sm font-medium secondary-text">
              {labOrderDetails?.email}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="font-medium">Phone No.</p>
            <p className="text-sm font-medium secondary-text">
              {labOrderDetails?.date_of_birth}
            </p>
          </div>
        </div>

        <div className="w-full border my-10 border-gray-200" />

        <h2 className="font-medium text-lg mb-6">Billing Info:</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          <div className="flex flex-col items-start gap-1">
            <p className="font-medium">Street Address:</p>
            <p className="text-sm font-medium secondary-text">
              {labOrderDetails?.billingAddress}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="font-medium">Address Line 2:</p>
            <p className="text-sm font-medium secondary-text">
              {labOrderDetails?.billingAddressLine}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="font-medium">City:</p>
            <p className="text-sm font-medium secondary-text">
              {labOrderDetails?.city}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="font-medium">State</p>
            <p className="text-sm font-medium secondary-text">
              {labOrderDetails?.shippingState}
            </p>
          </div>
          <div className="flex flex-col items-start gap-1">
            <p className="font-medium">Zip Code:</p>
            <p className="text-sm font-medium secondary-text">
              {labOrderDetails?.zipCode}
            </p>
          </div>
        </div>

        <div className="w-full border my-10 border-gray-200" />

        <div className="flex flex-col items-start gap-1">
          <p className="font-medium text-lg">Amount:</p>
          <p className="text-sm font-medium secondary-text">
            ${labOrderDetails?.amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LabOrderdetailsPage;

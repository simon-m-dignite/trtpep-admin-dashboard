import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientServices from "../../services/patientServices";

const BookingDetailsPage = () => {
  const { id } = useParams();
  // console.log("id >> ", id);
  const [patientdetails, setPatientDetails] = useState(null);

  useEffect(() => {
    const fetchPatientInformation = async () => {
      try {
        const data = await patientServices.fetchPatient(id);
        console.log("patientInformation >> ", data);
        setPatientDetails(data?.patient);
      } catch (error) {
        console.log("patientInformation error >> ", error);
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
    <div className="w-full bg-gray-50 p-6">
      <h1 className="font-semibold text-xl">Booking Details</h1>

      <div className="w-full bg-white p-6 lg:p-10 rounded-xl mt-6">
        <h2 className="text-lg font-semibold">Patient Info:</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Name:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.patientInfo?.firstName}{" "}
              {patientdetails?.patientInfo?.lastName}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Email:</p>
            <p className="text-sm font-medium secondary-text text-wrap">
              {patientdetails?.patientInfo?.email}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Phone No.</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.patientInfo?.phoneNumber}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Date of Birth.</p>
            <p className="text-sm font-medium secondary-text">
              {formatDate(patientdetails?.patientInfo?.dob)}
            </p>
          </div>
        </div>
        <h2 className="text-lg font-semibold mt-16 pb-6">Therapy Details:</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Testosterone Therapy:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.therapyDetails?.testosterone?.title}
              {" - "}${patientdetails?.therapyDetails?.testosterone?.price}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Peptide Therapy:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.therapyDetails?.peptide?.title}
              {" - "}${patientdetails?.therapyDetails?.peptide?.price}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">HCG Therapy:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.therapyDetails?.hcg?.title}
              {" - "}${patientdetails?.therapyDetails?.hcg?.price}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Weightloss Therapy:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.therapyDetails?.weightLoss?.title}
              {" - "}${patientdetails?.therapyDetails?.weightLoss?.price}
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Lab Work Details:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.labWorkDetails?.bloodWorkForTestosterone?.title}
              {" - "}$
              {patientdetails?.labWorkDetails?.bloodWorkForTestosterone?.price}
            </p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mt-16 pb-6">Shipping Info:</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Street Address:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.shippingInfo?.shippingStreetAddress}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Address Line 2:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.shippingInfo?.shippingAddressLine}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">City:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.shippingInfo?.shippingCity}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">State:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.shippingInfo?.shippingState}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Zip Code:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.shippingInfo?.shippingZipCode}
            </p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mt-16 pb-6">Billing Info:</h2>
        {patientdetails?.isBillingSameAsShipping ? (
          <p className="text-sm font-medium secondary-text">
            Billing information is same as shipping information.
          </p>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">Street Address:</p>
              <p className="text-sm font-medium secondary-text">
                {patientdetails?.billingInfo?.billingStreetAddress}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">Address Line 2:</p>
              <p className="text-sm font-medium secondary-text">
                {patientdetails?.billingInfo?.billingAddressLine}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">City:</p>
              <p className="text-sm font-medium secondary-text">
                {patientdetails?.billingInfo?.billingCity}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">State:</p>
              <p className="text-sm font-medium secondary-text">
                {patientdetails?.billingInfo?.billingState}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">Zip Code:</p>
              <p className="text-sm font-medium secondary-text">
                {patientdetails?.billingInfo?.billingZipCode}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsPage;

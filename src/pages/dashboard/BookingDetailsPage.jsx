import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import patientServices from "../../services/patientServices";
import { FaArrowLeft } from "react-icons/fa6";

const BookingDetailsPage = () => {
  const { id } = useParams();
  // console.log("id >> ", id);
  const [patientdetails, setPatientDetails] = useState(null);

  useEffect(() => {
    const fetchPatientInformation = async () => {
      try {
        const data = await patientServices.fetchPatient(id);
        console.log("patientInformation >> ", data?.patient);
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
      <div className="w-full flex items-center gap-3">
        <Link to={"/"}>
          <FaArrowLeft className="text-xl" />
        </Link>
        <h1 className="font-semibold text-xl">Order Details</h1>
      </div>
      <div className="w-full bg-white p-6 lg:p-10 rounded-xl mt-6">
        <div className="w-full flex items-center justify-between mb-10">
          <h2 className="text-lg font-semibold">Patient Info:</h2>
          <div className="flex items-center justify-end gap-x-6">
            <p className="text-sm font-medium secondary-text">
              Order date: {formatDate(patientdetails?.createdAt)}
            </p>
            <a
              target="_blank"
              href={`http://localhost:8000${patientdetails?.invoicePath}`}
              className="text-sm font-semibold text-red-500 underline"
            >
              View Invoice
            </a>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Name:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.patient?.patientInfo?.firstName}{" "}
              {patientdetails?.patient?.patientInfo?.lastName}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Email:</p>
            <p className="text-sm font-medium secondary-text text-wrap">
              {patientdetails?.patient?.patientInfo?.email}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Phone No.</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.patient?.patientInfo?.phoneNumber}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Date of Birth.</p>
            <p className="text-sm font-medium secondary-text">
              {formatDate(patientdetails?.patient?.patientInfo?.dob)}
            </p>
          </div>
        </div>

        <div className="w-full border my-10 border-gray-200" />

        <h2 className="text-lg font-semibold pb-6">Ordered Therapies:</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
          {patientdetails?.selectedTherapies?.map((therapy, index) => {
            return (
              <div className="flex flex-col items-start gap-2" key={index}>
                <p className="font-medium">Testosterone Therapy:</p>
                <p className="text-sm font-medium secondary-text">
                  {therapy?.therapyName}
                  {" - "} {therapy?.selectedOptionName}
                </p>
              </div>
            );
          })}
          {/* <div className="flex flex-col items-start gap-2">
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
          </div> */}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 mt-16">
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Lab Work Details:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.labWorkDetails?.bloodWorkForTestosterone?.title}
              {" - "}$
              {patientdetails?.labWorkDetails?.bloodWorkForTestosterone?.price}
            </p>
          </div>
        </div>

        <div className="w-full border my-10 border-gray-200" />

        <h2 className="text-lg font-semibold pb-6">Shipping Info:</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Street Address:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.patient?.shippingInfo?.shippingStreetAddress}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Address Line 2:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.patient?.shippingInfo?.shippingAddressLine}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">City:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.patient?.shippingInfo?.shippingCity}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">State:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.patient?.shippingInfo?.shippingState}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="font-medium">Zip Code:</p>
            <p className="text-sm font-medium secondary-text">
              {patientdetails?.patient?.shippingInfo?.shippingZipCode}
            </p>
          </div>
        </div>

        <div className="w-full border my-10 border-gray-200" />

        <h2 className="text-lg font-semibold pb-6">Billing Info:</h2>
        {patientdetails?.patient?.isBillingSameAsShipping ? (
          <p className="text-sm font-medium secondary-text">
            Billing information is same as shipping information.
          </p>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">Street Address:</p>
              <p className="text-sm font-medium secondary-text">
                {patientdetails?.patient?.billingInfo?.billingStreetAddress}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">Address Line 2:</p>
              <p className="text-sm font-medium secondary-text">
                {patientdetails?.patient?.billingInfo?.billingAddressLine}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">City:</p>
              <p className="text-sm font-medium secondary-text">
                {patientdetails?.patient?.billingInfo?.billingCity}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">State:</p>
              <p className="text-sm font-medium secondary-text">
                {patientdetails?.patient?.billingInfo?.billingState}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">Zip Code:</p>
              <p className="text-sm font-medium secondary-text">
                {patientdetails?.patient?.billingInfo?.billingZipCode}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsPage;

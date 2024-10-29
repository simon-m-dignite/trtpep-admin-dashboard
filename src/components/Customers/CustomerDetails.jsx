import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customerServices from "../../services/customerServices";

const CustomerDetails = () => {
  const { _id } = useParams();
  // console.log(_id);
  const [customerOrders, setCustomerOrders] = useState([]);
  const navigate = useNavigate();

  // const handleNavigate = (id) => {
  //   navigate(`/lab-orders/${id}`);
  // };
  const handleNavigate = (order) => {
    const id = order._id;

    if (order.patient) {
      // If the order has a patient field, it is a NewPatient order
      navigate(`/bookings/${id}`);
    } else {
      // Otherwise, it's a LabOrder
      navigate(`/lab-orders/${id}`);
    }
  };

  const fetchCustomerOrders = async () => {
    try {
      const res = await customerServices.handleFetchCustomerOrdersById(_id);
      console.log("orders res >>", res);
      setCustomerOrders(res?.data);
    } catch (error) {
      console.log("orders err >>", error);
    }
  };

  useEffect(() => {
    fetchCustomerOrders();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  return (
    <div className="p-6 bg-white rounded-xl min-h-screen">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex items-center gap-1">
          <p className="font-medium text-sm">Name: </p>
          <p className="text-sm text-gray-600 font-medium">John Doe</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-medium text-sm">Email: </p>
          <p className="text-sm text-gray-600 font-medium">John Doe</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="font-medium text-sm">Phone No. </p>
          <p className="text-sm text-gray-600 font-medium">John Doe</p>
        </div>
      </div>
      <div className="w-full mt-10">
        <h2 className="font-semibold text-base">Customer Orders</h2>

        {customerOrders.length > 0 ? (
          <table className="mt-6 w-full">
            <thead>
              <tr className="border-b">
                <th className="font-medium text-sm text-start pb-4">Name</th>
                <th className="font-medium text-sm text-start pb-4">Email</th>
                <th className="font-medium text-sm text-start pb-4">Phone</th>
                <th className="font-medium text-sm text-start pb-4">City</th>
                <th className="font-medium text-sm text-start pb-4">Amount</th>
                <th className="font-medium text-sm text-start pb-4">
                  Order Type
                </th>
              </tr>
            </thead>
            <tbody>
              {customerOrders.length > 0 ? (
                customerOrders.map((order, index) => {
                  const isLabOrder = order?.patient == null; // Check if it's a LabOrder (no 'patient' field)
                  return (
                    <tr
                      key={index}
                      onClick={() => handleNavigate(order)}
                      className="text-xs text-gray-500 border-b hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                    >
                      <td className="py-3">
                        {isLabOrder
                          ? `${order?.firstName} ${order?.lastName}`
                          : `${order?.patient?.patientInfo?.firstName} ${order?.patient?.patientInfo?.lastName}`}
                      </td>
                      <td className="py-3">
                        {isLabOrder
                          ? order?.email
                          : order?.patient?.patientInfo?.email}
                      </td>
                      <td className="py-3">
                        {isLabOrder
                          ? order?.phone
                          : order?.patient?.patientInfo?.phoneNumber}
                      </td>
                      <td className="py-3">
                        {isLabOrder
                          ? order?.city
                          : order?.patient?.shippingInfo?.shippingCity}
                      </td>
                      <td className="py-3">${order?.amount}</td>
                      <td className="py-3">
                        {isLabOrder ? "Lab Order" : "New Patient"}
                        {/* Optional invoice link */}
                        {/* <a href={`http://localhost:8000${order?.invoicePath}`}>View Invoice</a> */}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="w-full">
            <h2 className="pt-20 text-sm text-center">
              Customer has not placed any order yet!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;

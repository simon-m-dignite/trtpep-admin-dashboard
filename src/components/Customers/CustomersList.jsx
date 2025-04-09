import React, { useEffect, useState } from "react";
import customerServices from "../../services/customerServices";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await customerServices.handleFetchCustomers();
        console.log("customers data >> ", res);
        setCustomers(res.data);
      } catch (error) {
        console.log("err >> ", error);
      }
    };

    fetchCustomers();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (_id) => {
    navigate(`/customers/customer-details/${_id}`);
  };

  const [email, setEmail] = useState("");
  const [state, setState] = useState(false);
  const handleSearchCustomer = async () => {
    try {
      if (email) {
        const res = await customerServices.searchPatientByEmail(email);
        console.log("searchPatientByEmail >>", res);
        setCustomers(res?.patient.reverse());
        // setEmail("");
        setState(false);
      } else {
        setState(true);
      }
    } catch (error) {
      console.log("searchPatientByEmail error >>", error);
      // setEmail("");
      toast.error(error?.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="bg-white rounded-xl p-6 w-full min-h-screen">
      <div className="">
        <div className="w-full flex items-center border rounded-md px-3 lg:w-[350px]">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Search by email"
            className="w-full border-none py-2 text-xs outline-none"
          />
          <button className="h-full" onClick={() => handleSearchCustomer()}>
            <IoSearchOutline className="text-xl text-gray-600" />
          </button>
        </div>
        {state && (
          <p className="text-xs text-red-500">Please enter an email address</p>
        )}
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="font-semibold text-sm py-4">Name</th>
            <th className="font-semibold text-sm py-4">Email</th>
            <th className="font-semibold text-sm py-4">Phone</th>
            <th className="font-semibold text-sm py-4">Amount</th>
            <th className="font-semibold text-sm py-4">Last Order Date</th>
            <th className="font-semibold text-sm py-4">Order Type</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer, index) => {
              return (
                <tr
                  className="border-b cursor-pointer hover:bg-gray-50 transition-all duration-200"
                  key={index}
                  onClick={() => handleNavigate(customer._id)}
                >
                  <td className="font-normal text-xs text-gray-600 text-center py-4">
                    {customer?.name}
                  </td>
                  <td className="font-normal text-xs text-gray-600 text-center py-4">
                    {customer?.email}
                  </td>
                  <td className="font-normal text-xs text-gray-600 text-center py-4">
                    {customer?.phone}
                  </td>
                  <td className="font-normal text-xs text-gray-600 text-center py-4">
                    ${customer?.orderAmount}
                  </td>
                  <td className="font-normal text-xs text-gray-600 text-center py-4">
                    {formatDate(customer?.lastOrderDate)}
                  </td>
                  <td className="font-normal text-xs text-gray-600 text-center py-4">
                    {customer?.orderType === "LabOrder"
                      ? "Only Lab Order"
                      : "Therapy Order"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersList;

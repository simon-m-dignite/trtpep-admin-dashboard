import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import labServices from "../../services/labServices";
import patientServices from "../../services/patientServices";
import EnrolledPatientModal from "./EnrolledPatientModal";
import { IoSearchOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const EnrolledPatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [state, setState] = useState(false);
  const [patientData, setPatientData] = useState(null);
  console.log("patientData >>", patientData);

  const handleModalState = () => {
    setState(!state);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await patientServices.fetchEnrolledPatients();
        console.log("enrolled patients data >> ", data);
        setPatients(data?.data);
      } catch (error) {
        console.log("error >> ", error);
      }
    };

    fetchData();
  }, []);

  const [email, setEmail] = useState("");
  const [state2, setState2] = useState(false);
  const handleSearchCustomer = async () => {
    // e.preventDefault();
    try {
      if (email) {
        const res = await patientServices.searchPatientByEmail(email);
        console.log("searchPatientByEmail >>", res.data);
        setPatients(res?.data);
        // setEmail("");
        setState2(false);
      } else {
        setState2(true);
      }
    } catch (error) {
      console.log("searchPatientByEmail error >>", error);
      // setEmail("");
      toast.error(error?.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl mt-6 min-h-screen">
      <div className="mb-6">
        <div
          // onSubmit={handleSearchCustomer}
          className="w-full flex items-center border rounded-md px-3 lg:w-[350px]"
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Search by email"
            className="w-full border-none py-2 text-xs outline-none"
          />
          <button
            type="submit"
            className="h-full"
            onClick={() => handleSearchCustomer()}
          >
            <IoSearchOutline className="text-xl text-gray-600" />
          </button>
        </div>
        {state && (
          <p className="text-xs text-red-500">Please enter an email address</p>
        )}
      </div>
      <table className="w-full">
        <thead className="border-b rounded-t-lg">
          <th className="font-medium text-xs py-4 px-4 text-start text-black">
            First Name
          </th>
          <th className="font-medium text-xs py-4 px-4 text-start text-black">
            Last Name
          </th>
          <th className="font-medium text-xs py-4 px-4 text-start text-black">
            Email
          </th>
          <th className="font-medium text-xs py-4 px-4 text-start text-black">
            Phone No.
          </th>

          {/* <th className="font-medium text-xs py-4 px-4 text-start">Action</th> */}
        </thead>
        <tbody>
          {patients?.length > 0 ? (
            <>
              {patients.map((order, index) => {
                return (
                  <tr className="border-b" key={index}>
                    <td className="text-xs font-normal py-4 px-4 secondary-text">
                      {order?.firstName}
                    </td>
                    <td className="text-xs font-normal py-4 px-4 secondary-text">
                      {order?.lastName}
                    </td>
                    <td className="text-xs font-normal py-4 px-4 secondary-text">
                      {order?.email}
                    </td>
                    <td className="text-xs font-normal py-4 px-4 secondary-text">
                      {order?.phoneNumber}
                    </td>

                    {/* <td className="text-[13.5px] underline text-color font-normal py-4 text-gray-600 px-4">
                      <Link to={`/lab-orders/${order?._id}`}>View Details</Link>
                      <button
                        type="button"
                        onClick={() => handlePatientInfo(order._id)}
                      >
                        View Details
                      </button>
                    </td> */}
                  </tr>
                );
              })}
            </>
          ) : (
            <div className="w-full min-h-screen flex items-center justify-center">
              <h1 className="text-xl font-semibold">No Orders Yet</h1>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EnrolledPatientsList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import labServices from "../../services/labServices";
import patientServices from "../../services/patientServices";
import EnrolledPatientModal from "./EnrolledPatientModal";

const EnrolledPatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [state, setState] = useState(false);
  const [patientData, setPatientData] = useState(null);
  console.log("patientData >>", patientData);

  const handleModalState = () => {
    setState(!state);
  };

  // const handlePatientInfo = async (id) => {
  //   const data = await fetch("http://localhost:8000/api/get-enrolled-patient", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id }),
  //   });

  //   const resp = await data.json();

  //   console.log("enrolled patient >> ", resp);
  //   setPatientData(resp.data);
  // };
  //   console.log("patients >> ", Orders);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl mt-6 min-h-screen">
      <table className="w-full">
        <thead className="border-b rounded-t-lg">
          <th className="font-medium text-sm py-4 px-4 text-start text-black">
            First Name
          </th>
          <th className="font-medium text-sm py-4 px-4 text-start text-black">
            Last Name
          </th>
          <th className="font-medium text-sm py-4 px-4 text-start text-black">
            Email
          </th>
          <th className="font-medium text-sm py-4 px-4 text-start text-black">
            Phone No.
          </th>

          {/* <th className="font-medium text-sm py-4 px-4 text-start">Action</th> */}
        </thead>
        <tbody>
          {patients?.length > 0 ? (
            <>
              {patients.map((order, index) => {
                return (
                  <tr className="border-b" key={index}>
                    <td className="text-sm font-normal py-4 px-4 secondary-text">
                      {order?.firstName}
                    </td>
                    <td className="text-sm font-normal py-4 px-4 secondary-text">
                      {order?.lastName}
                    </td>
                    <td className="text-sm font-normal py-4 px-4 secondary-text">
                      {order?.email}
                    </td>
                    <td className="text-sm font-normal py-4 px-4 secondary-text">
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

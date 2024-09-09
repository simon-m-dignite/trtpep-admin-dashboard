import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import patientServices from "../../services/patientServices";
import toast from "react-hot-toast";

const BookingList = () => {
  const [patients, setPatients] = useState([]);
  // console.log("patients >> ", patients);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await patientServices.fetchPatients();
      console.log("patients data >> ", data.patients);
      setPatients(data?.patients);
    } catch (error) {
      console.log("error >> ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  };

  const handleNavigate = (id) => {
    navigate(`/bookings/${id}`);
  };

  const handleStatusChange = async (patientId, newStatus) => {
    try {
      const response = await fetch(
        `https://backend.trtpep.com/api/update-order-status/${patientId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderStatus: newStatus }),
        }
      );

      if (!response.ok) {
        // console.log("object >> ", response);
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      // console.log("Status updated successfully:", data);

      fetchData();
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Status can not be updated");
    }
  };

  const getDateRange = (filter) => {
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (filter) {
      case "This Week":
        startDate = new Date(now.setDate(now.getDate() - now.getDay()));
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        break;
      case "This Month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case "Last 3 Months":
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        endDate = new Date();
        break;
      case "Last 6 Months":
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        endDate = new Date();
        break;
      case "Last 12 Months":
        startDate = new Date(now.setMonth(now.getMonth() - 12));
        endDate = new Date();
        break;
      default:
        return { startDate: null, endDate: null };
    }

    endDate.setHours(23, 59, 59, 999);
    console.log("startDate >> ", startDate);
    console.log("endDate >> ", endDate);

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  };

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    const { startDate, endDate } = getDateRange(selectedFilter);

    fetch(
      `https://backend.trtpep.com/api/filter-patients?startDate=${encodeURIComponent(
        startDate
      )}&endDate=${encodeURIComponent(endDate)}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Filtered patients:", data);
        setPatients(data);
      })
      .catch((error) => {
        console.error("Error fetching filtered patients:", error);
      });
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl mt-6 min-h-screen">
      <div className="w-full flex items-center justify-end gap-1 mb-5">
        {/* <button className="bg-[#c00000] text-white px-3 py-1 rounded-full text-xs font-medium">
          All
        </button>
        <button className="bg-[#c00000] text-white px-3 py-1 rounded-full text-xs font-medium">
          This Week
        </button>
        <button className="bg-[#c00000] text-white px-3 py-1 rounded-full text-xs font-medium">
          This Month
        </button>
        <button className="bg-[#c00000] text-white px-3 py-1 rounded-full text-xs font-medium">
          6 Months
        </button>
        <button className="bg-[#c00000] text-white px-3 py-1 rounded-full text-xs font-medium">
          12 Months
        </button> */}
        <select
          className="text-sm outline-none border-b border-gray-500 text-gray-500 pb-1"
          onChange={handleFilterChange}
        >
          <option value="">Apply filters</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="Last 3 Months">Last 3 Months</option>
          <option value="Last 6 Months">Last 6 Months</option>
          <option value="Last 12 Months">Last 12 Months</option>
        </select>
      </div>

      <table className="w-full">
        <thead className="border-b rounded-t-lg">
          <th className="font-medium text-sm py-4 px-4 text-start text-black">
            Name
          </th>
          <th className="font-medium text-sm py-4 px-4 text-start text-black">
            Email
          </th>
          <th className="font-medium text-sm py-4 px-4 text-start text-black">
            Phone No.
          </th>
          {/* <th className="font-medium text-sm py-4 px-4 text-start text-black">
            Dob
          </th> */}
          <th className="font-medium text-sm py-4 px-4 text-start text-black">
            City
          </th>
          <th className="font-medium text-sm py-4 px-4 text-start text-black">
            Amount Paid
          </th>
          <th className="font-medium text-sm py-4 px-4 text-start text-black">
            Order Status
          </th>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            <>
              {patients.map((patient, index) => {
                return (
                  <tr
                    className="border-b hover:bg-gray-50 transition-all duration-200"
                    key={index}
                  >
                    <td
                      className="text-sm font-normal py-4 px-4 cursor-pointer secondary-text"
                      onClick={() => handleNavigate(patient?._id)}
                    >
                      {patient?.patientInfo?.firstName}{" "}
                      {patient?.patientInfo?.lastName}
                    </td>
                    <td className="text-sm font-normal py-4 px-4 secondary-text">
                      {patient?.patientInfo?.email}
                    </td>
                    <td className="text-sm font-normal py-4 px-4 secondary-text">
                      {patient?.patientInfo?.phoneNumber}
                    </td>
                    {/* <td className="text-sm font-normal py-4 px-4">
                      {formatDate(patient?.patientInfo?.dob)}
                    </td> */}
                    <td className="text-sm font-normal py-4 px-4 secondary-text">
                      {patient?.shippingInfo?.shippingCity}
                    </td>
                    <td className="text-sm font-normal py-4 px-4 secondary-text">
                      ${patient?.amount}
                    </td>
                    <td
                      className={`text-sm py-4 px-4 font-normal secondary-text`}
                    >
                      <select
                        className="outline-none bg-transparent"
                        value={patient?.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(patient._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <div className="w-full min-h-screen flex items-center justify-center">
              <h1 className="text-xl font-semibold">No Patients Yet</h1>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;

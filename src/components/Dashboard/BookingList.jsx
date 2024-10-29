import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import patientServices from "../../services/patientServices";
import toast from "react-hot-toast";
import labServices from "../../services/labServices";
import { IoSearchOutline } from "react-icons/io5";
import newPatientServices from "../../services/newPatientServices";
import { BASE_URL } from "../../api/api";

const BookingList = () => {
  const [patients, setPatients] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]); // Assuming this contains all orders
  const navigate = useNavigate();

  const filterOrdersByStatus = (status) => {
    setSelectedStatus(status);
    setPatients((prevPatients) => {
      if (filteredOrders.length === 0) {
        return [];
      }
      if (status === "all") {
        return filteredOrders;
      } else {
        return filteredOrders.filter((order) => order.orderStatus === status);
      }
    });
  };

  const fetchData = async () => {
    try {
      const data = await patientServices.fetchPatients();
      // console.log("patients data >> ", data.patients);
      setPatients(data?.patients.reverse());
      setFilteredOrders(data?.patients.reverse());
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
        `${BASE_URL}/update-order-status/${patientId}`,
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

  const [email, setEmail] = useState("");
  const [state, setState] = useState(false);

  const handleSearchCustomer = async () => {
    try {
      if (email) {
        const res = await newPatientServices.searchPatientByEmail(email);
        console.log("searchPatientByEmail >>", res);
        setPatients(res?.patient.reverse());
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

  return (
    <div className="w-full bg-white p-6 rounded-xl mt-6 min-h-screen">
      <div className="w-full flex items-center justify-between gap-1 mb-5">
        <div className="w-full lg:w-[450px]">
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
            <p className="text-xs text-red-500">
              Please enter an email address
            </p>
          )}

          <div className="w-full mt-4 flex items-center gap-2">
            <button
              onClick={() => filterOrdersByStatus("all")}
              className={`text-xs font-medium px-4 py-2 rounded-full bg-slate-100`}
            >
              All
            </button>
            <button
              onClick={() => filterOrdersByStatus("Pending")}
              className={`text-xs font-medium px-4 py-2 rounded-full bg-slate-100`}
            >
              Pending
            </button>
            <button
              onClick={() => filterOrdersByStatus("Processing")}
              className={`text-xs font-medium px-4 py-2 rounded-full bg-slate-100`}
            >
              Processing
            </button>
            <button
              onClick={() => filterOrdersByStatus("Cancelled")}
              className={`text-xs font-medium px-4 py-2 rounded-full bg-slate-100`}
            >
              Cancelled
            </button>
            <button
              onClick={() => filterOrdersByStatus("Completed")}
              className={`text-xs font-medium px-4 py-2 rounded-full bg-slate-100`}
            >
              Completed
            </button>
          </div>
        </div>

        <select
          className="text-xs outline-none border-b border-gray-500 text-gray-500 pb-1"
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
          <th className="font-medium text-xs py-4 px-4 text-start text-black">
            Name
          </th>
          <th className="font-medium text-xs py-4 px-4 text-start text-black">
            Email
          </th>
          <th className="font-medium text-xs py-4 px-4 text-start text-black">
            Phone No.
          </th>
          <th className="font-medium text-xs py-4 px-4 text-start text-black">
            City
          </th>
          <th className="font-medium text-xs py-4 px-4 text-start text-black">
            Amount Paid
          </th>
          <th className="font-medium text-xs py-4 px-4 text-start text-black">
            Order Status
          </th>
          <th className="font-medium text-xs py-4 px-4 text-start text-black">
            Order Date
          </th>
          <th className="font-medium text-xs py-4 px-4 text-start text-black">
            Invoice
          </th>
        </thead>
        <tbody>
          {patients?.length > 0 ? (
            <>
              {patients?.map((patient, index) => {
                return (
                  <tr
                    className="border-b hover:bg-gray-50 transition-all duration-200"
                    key={index}
                  >
                    <td
                      className="text-xs font-normal py-4 px-4 secondary-text cursor-pointer"
                      onClick={() => handleNavigate(patient?._id)}
                    >
                      {patient?.patient?.patientInfo?.firstName}{" "}
                      {patient?.patient?.patientInfo?.lastName}
                    </td>
                    <td className="text-xs font-normal py-4 px-4 secondary-text">
                      {patient?.patient?.patientInfo?.email}
                    </td>
                    <td className="text-xs font-normal py-4 px-4 secondary-text">
                      {patient?.patient?.patientInfo?.phoneNumber}
                    </td>
                    <td className="text-xs font-normal py-4 px-4 secondary-text">
                      {patient?.patient?.shippingInfo?.shippingCity}
                    </td>
                    <td className="text-xs font-normal py-4 px-4 secondary-text">
                      ${patient?.amount.toFixed(3)}
                    </td>
                    <td
                      className={`text-xs py-4 px-4 font-normal secondary-text`}
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
                    <td className="text-xs font-normal py-4 px-4 secondary-text">
                      {formatDate(patient?.createdAt)}
                    </td>
                    <td className="text-xs font-normal py-4 px-4 secondary-text">
                      <a
                        href={`http://localhost:8000${patient?.invoicePath}`}
                        target="_blank"
                        className="text-xs font-medium"
                      >
                        View Invoice
                      </a>
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

import React, { useEffect, useState } from "react";
import labServices from "../../services/labServices";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const LabOrdersList = () => {
  const [Orders, setOrders] = useState([]);
  //   console.log("patients >> ", Orders);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await labServices.fetchLabOrders();
      console.log("lab orders data >> ", data);
      setOrders(data?.labOrders);
    } catch (error) {
      console.log("error >> ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigate = (id) => {
    navigate(`/lab-orders/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/lab-order-status/${orderId}`,
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
      `http://localhost:8000/api/filter-lab-orders?startDate=${encodeURIComponent(
        startDate
      )}&endDate=${encodeURIComponent(endDate)}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Filtered patients:", data);
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching filtered patients:", error);
      });
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl mt-6 min-h-screen">
      <div className="w-full flex justify-end">
        <div className="w-full flex items-center justify-end gap-1 mb-5">
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
          <th className="py-4 px-4"></th>
        </thead>
        <tbody>
          {Orders?.length > 0 ? (
            <>
              {Orders.map((order, index) => {
                return (
                  <tr className="border-b" key={index}>
                    <td
                      className="text-sm font-normal py-4 px-4 secondary-text"
                      onClick={() => handleNavigate(order?._id)}
                    >
                      {order?.firstName} {order?.lastName}
                    </td>
                    <td className="text-sm font-normal py-4 px-4 secondary-text">
                      {order?.email}
                    </td>
                    <td className="text-sm font-normal py-4 px-4 secondary-text">
                      {order?.phone}
                    </td>
                    {/* <td className="text-sm font-normal py-4 px-4">
                      {formatDate(order?.date_of_birth)}
                    </td> */}
                    <td className="text-sm font-normal py-4 px-4 secondary-text">
                      {order?.city}
                    </td>
                    <td className="text-sm font-normal py-4 px-4 secondary-text">
                      ${order?.amount}
                    </td>
                    {/* <td className="text-[13.5px] underline text-color font-normal py-4 px-4">
                      <Link to={`/lab-orders/${order?._id}`}>View Details</Link>
                    </td> */}
                    <td
                      className={`text-sm py-4 px-4 font-normal secondary-text`}
                    >
                      <select
                        className="outline-none bg-transparent"
                        value={order?.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="text-[13.5px] underline text-color font-normal py-4 px-4">
                      <Link to={`/lab-orders/${order?._id}`}>View Details</Link>
                    </td>
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

export default LabOrdersList;

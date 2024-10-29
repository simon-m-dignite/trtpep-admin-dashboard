import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import chargesServices from "../../services/chargesServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateSchedulerLink = ({ openSchedulerModal, onclick, data }) => {
  const [schedulerLink, setSchedulerLink] = useState("");
  const [loading, setLoading] = useState(false);

  // Check the incoming data
  useEffect(() => {
    console.log("Incoming data >>", data);
    if (data?.url) {
      setSchedulerLink(data.url); // Set the URL when the data is available
    }
  }, [data, openSchedulerModal]);

  const handleUpdateCharges = async () => {
    setLoading(true);
    try {
      const response = await chargesServices.updateSchedulerLinkById({
        _id: data?._id,
        url: schedulerLink,
      });
      // Call your update service here (uncomment the below line)
      // await chargesServices.handleUpdateCharges({ url: schedulerLink });
      console.log("Scheduler Link updated successfully", response);
      // toast.success("Scheduler link updated");
      onclick();
    } catch (error) {
      console.log("Error updating scheduler link:", error);
      // toast.error("An error occurred while updating scheduler link");
    } finally {
      setLoading(false);
    }
  };

  return (
    openSchedulerModal && (
      <div className="w-full h-screen fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
        <div className="w-[40%] h-1/2 bg-white flex flex-col items-center justify-center gap-5 relative">
          <button
            type="button"
            onClick={onclick}
            className="absolute right-4 top-4 w-5 h-5 rounded-full bg-gray-100 p-0.5"
          >
            <IoClose className="w-full h-full" />
          </button>
          <h2 className="text-xl font-semibold">Edit Scheduler Link</h2>

          <input
            type="text"
            value={schedulerLink}
            onChange={(e) => setSchedulerLink(e.target.value)}
            className="p-2 rounded border outline-none text-sm w-80"
            disabled={loading}
          />

          <button
            onClick={handleUpdateCharges}
            disabled={loading}
            className="bg-red-500 text-white py-2.5 px-4 rounded mt-4 text-sm font-semibold"
          >
            {loading ? "Updating..." : "Update Link"}
          </button>
        </div>
      </div>
    )
  );
};

export default UpdateSchedulerLink;

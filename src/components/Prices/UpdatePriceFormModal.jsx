import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import chargesServices from "../../services/chargesServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UpdatePriceFormModal = ({ openModal, onclick, priceId }) => {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCharges = async () => {
      if (openModal) {
        setLoading(true);
        try {
          const res = await chargesServices.fetchChargesById(priceId);
          // console.log("res >> ", res.data);
          setPrice(res.data.charges);
        } catch (error) {
          console.log("Error fetching charges:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCharges();
  }, [priceId, openModal]);

  const handleUpdateCharges = async () => {
    setLoading(true);
    try {
      await chargesServices.handleUpdateCharges(priceId, { charges: price });
      console.log("Price updated successfully");
      toast.success("Charges updated");
      onclick();
    } catch (error) {
      console.log("Error updating charges:", error);
      toast.error("An error occurred while updating charges");
    } finally {
      setLoading(false);
    }
  };

  return (
    openModal && (
      <div className="w-full h-screen fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
        <div className="w-[40%] h-1/2 bg-white flex flex-col items-center justify-center gap-5 relative">
          <button
            type="button"
            onClick={onclick}
            className="absolute right-4 top-4 w-5 h-5 rounded-full bg-gray-100 p-0.5"
          >
            <IoClose className="w-full h-full" />
          </button>
          <h2 className="text-xl font-semibold">Edit Price</h2>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 rounded border outline-none text-sm w-80"
            disabled={loading}
          />

          <button
            onClick={handleUpdateCharges}
            disabled={loading}
            className="bg-red-500 text-white py-2.5 px-4 rounded mt-4 text-sm font-semibold"
          >
            {loading ? "Updating..." : "Update Price"}
          </button>
        </div>
      </div>
    )
  );
};

export default UpdatePriceFormModal;

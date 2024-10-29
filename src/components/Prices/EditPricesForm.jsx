import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import chargesServices from "../../services/chargesServices";
import toast from "react-hot-toast";

const EditPricesForm = () => {
  const { _id } = useParams(); // Get the charge ID from the URL
  const [charges, setCharges] = useState(null);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false); // Add a loading state
  const [successMessage, setSuccessMessage] = useState(""); // To display success message
  const [errorMessage, setErrorMessage] = useState(""); // To display error message
  const navigate = useNavigate();

  const fetchCharges = async () => {
    try {
      const response = await chargesServices.fetchChargesById(_id);
      console.log("charges >>", response?.data);
      setCharges(response?.data);
      setPrice(response?.data.charges); // Set the initial price to the fetched price
    } catch (error) {
      console.log("error >> ", error);
    }
  };

  const handleUpdatePrice = async () => {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const updatedData = {
        charges: price,
      };

      const response = await chargesServices.handleUpdateCharges(
        _id,
        updatedData
      );
      console.log("update response >>", response);
      toast.success("Charges updated");
      navigate("/prices");
    } catch (error) {
      console.log("error >>", error);
      toast.error("An error occurred while updating charges");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharges();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl min-h-screen">
      <h2>Edit {charges?.name}</h2>
      <input
        type="number"
        value={price} // Use local price state
        onChange={(e) => setPrice(e.target.value)} // Update local state when user types
        className="p-2 rounded border outline-none text-sm w-80"
      />
      <button
        onClick={handleUpdatePrice}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        {loading ? "Updating..." : "Update Price"}
      </button>

      {/* Display success or error message */}
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default EditPricesForm;

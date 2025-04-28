import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PharmaciesList from "../../components/Pharmacies/PharmaciesList";

const PharmaciesPage = () => {
  useEffect(() => {
    document.title = "Blogs";
  }, []);
  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="w-full flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold mb-6">Pharmacies</h2>
        <Link
          to="/pharmacies/add-new-pharmacies"
          className="text-sm font-medium text-white bg-red-500 px-5 py-3 rounded-lg"
        >
          Add Pharmacies
        </Link>
      </div>

      <PharmaciesList />
    </div>
  );
};

export default PharmaciesPage;

import React from "react";
import FaqsList from "../../components/Faqs/FaqsList";
import { Link } from "react-router-dom";

const FaqsPage = () => {
  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="w-full flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">FAQs</h2>
        <Link
          to="/faqs/add-faqs"
          className="bg-red-500 text-white px-5 py-3 rounded-lg text-sm font-medium block"
        >
          Add FAQs
        </Link>
      </div>

      <FaqsList />
    </div>
  );
};

export default FaqsPage;

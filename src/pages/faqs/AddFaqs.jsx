import React from "react";
import AddFaqsForm from "../../components/Faqs/AddFaqsForm";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AddFaqs = () => {
  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="w-full mb-6 flex items-center gap-3">
        <Link to="/policy/privacy-policy">
          <FaArrowLeft className="text-2xl" />
        </Link>
        <h2 className="text-xl font-semibold">Add FAQs</h2>
      </div>
      <AddFaqsForm />
    </div>
  );
};

export default AddFaqs;

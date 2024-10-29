import React from "react";
import EditFaqsForm from "../../components/Faqs/EditFaqsForm";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const EditFaqs = () => {
  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="w-full mb-6 flex items-center justify-start gap-3">
        <Link to="/faqs">
          <FaArrowLeft className="text-2xl" />
        </Link>
        <h2 className="text-xl font-semibold">Update FAQ</h2>
      </div>

      <EditFaqsForm />
    </div>
  );
};

export default EditFaqs;

import React from "react";
import AddFaqsForm from "../../components/Faqs/AddFaqsForm";

const AddFaqs = () => {
  return (
    <div className="w-full p-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">Add FAQs</h2>
      <AddFaqsForm />
    </div>
  );
};

export default AddFaqs;

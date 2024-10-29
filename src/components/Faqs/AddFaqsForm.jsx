import axios from "axios";
import React, { useState } from "react";
import faqsServices from "../../services/faqsServices";
import toast from "react-hot-toast";

const AddFaqsForm = () => {
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  const handleChange = (index, e) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][e.target.name] = e.target.value;
    setFaqs(updatedFaqs);
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await faqsServices.addFaqs(faqs);
      // console.log("faqs >> ", response);
      toast.success("FAQ added successfully!");
      setFaqs([{ question: "", answer: "" }]);
    } catch (error) {
      // console.error("Error adding FAQs:", error);
      toast.error("An error occurred while adding FAQ");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="faq-form min-h-screen">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6 pb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`question-${index}`}
              >
                Question {index + 1}
              </label>
              <input
                type="text"
                id={`question-${index}`}
                name="question"
                value={faq.question}
                onChange={(e) => handleChange(index, e)}
                className="appearance-none border rounded w-full p-3 text-gray-700 outline-none leading-tight"
                required
              />
            </div>
            <div className="">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={`answer-${index}`}
              >
                Answer {index + 1}
              </label>
              <textarea
                id={`answer-${index}`}
                name="answer"
                value={faq.answer}
                onChange={(e) => handleChange(index, e)}
                className="appearance-none border rounded w-full p-3 text-gray-700 outline-none leading-tight"
                required
              />
            </div>
            {faqs.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveFaq(index)}
                className="text-red-500 text-sm underline"
              >
                Remove FAQ
              </button>
            )}
          </div>
        ))}
        <div className="w-full flex items-center justify-end">
          <button
            type="button"
            onClick={handleAddFaq}
            className="bg-gray-400 text-white font-medium py-3 px-4 rounded-lg text-sm"
          >
            Add Another FAQ
          </button>
          <button
            type="submit"
            className="bg-red-500 text-white font-medium py-3 px-4 rounded-lg text-sm ml-4"
          >
            Add FAQs
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFaqsForm;

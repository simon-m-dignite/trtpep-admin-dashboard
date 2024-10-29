import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import faqsServices from "../../services/faqsServices";
import { BsTrash3Fill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import toast from "react-hot-toast";

const FaqsList = () => {
  const [faqs, setFaqs] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      const res = await faqsServices.fetchFaqs();
      setFaqs(res?.data);
    };
    fetchFaqs();
  }, []);

  const handleDeleteFaq = async (id) => {
    try {
      const res = await faqsServices.deleteFaqs(id);
      toast.success("FAQ deleted successfully");
      setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== id));
    } catch (error) {
      toast.error("An error occurred while deleting FAQ.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl flex flex-col items-start gap-6">
      {faqs?.map((f) => {
        return (
          <div className="w-full" key={f._id}>
            <h3 className="font-semibold">{f.question}</h3>
            <p className="text-[15px] mt-1 text-gray-500">{f.answer}</p>
            <div className="w-full flex justify-end items-cener gap-4">
              <button onClick={() => handleDeleteFaq(f._id)}>
                <BsTrash3Fill className="text-red-500" />
              </button>
              <Link to={`/faqs/update-faq/${f._id}`}>
                <BsPencilSquare className="text-blue-600" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqsList;

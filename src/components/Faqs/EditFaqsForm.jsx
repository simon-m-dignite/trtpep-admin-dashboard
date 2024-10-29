import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import faqsServices from "../../services/faqsServices";
import toast from "react-hot-toast";

const EditFaqsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [faqData, setFaqData] = useState({
    question: "",
    answer: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await faqsServices.fetchSingleFaq(id);
        setFaqData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load FAQ data.");
        setLoading(false);
      }
    };

    fetchFaq();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaqData((prevFaqData) => ({
      ...prevFaqData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await faqsServices.updateFaqs(
        id,
        faqData.question,
        faqData.answer
      );
      console.log("update res >> ", res);
      toast.success("FAQ updated successfully");
      navigate("/faqs");
    } catch (err) {
      setError("Failed to update FAQ.");
      toast.error("AN error occurred while updating FAQ");
    }
  };

  if (loading) return <p>Loading FAQ data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={faqData.question}
            onChange={handleChange}
            required
            className="p-3 ronuded-lg border rounded-lg text-sm outline-none"
          />
        </div>

        <div className="w-full flex flex-col gap-2">
          <label htmlFor="answer">Answer:</label>
          <textarea
            id="answer"
            name="answer"
            value={faqData.answer}
            onChange={handleChange}
            required
            rows={3}
            className="p-3 ronuded-lg border rounded-lg text-sm outline-none"
          />
        </div>
        <div className="w-full flex justify-end mt-2">
          <button
            type="submit"
            className="bg-red-500 text-white text-sm font-medium px-5 py-3 rounded-lg max-w-40 float-end"
          >
            Update FAQ
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFaqsForm;

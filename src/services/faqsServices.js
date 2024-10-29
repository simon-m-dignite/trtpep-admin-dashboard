import axios from "axios";
import { BASE_URL } from "../api/api";

const handleResponse = (response) => {
  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 400
  ) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

const addFaqs = async (faqs) => {
  try {
    const response = await axios.post(`${BASE_URL}/faqs/add-faqs`, {
      faqs,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const fetchFaqs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/faqs/get-faqs`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const updateFaqs = async (id, question, answer) => {
  try {
    const response = await axios.put(`${BASE_URL}/faqs/update-faq/${id}`, {
      question,
      answer,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const fetchSingleFaq = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/faqs/get-faq/${id}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const deleteFaqs = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/faqs/delete-faq/${id}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export default { addFaqs, fetchFaqs, updateFaqs, fetchSingleFaq, deleteFaqs };

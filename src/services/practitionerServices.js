import { BASE_URL } from "../api/api";
// const BASE_URL = "http://localhost:8000/api";
import axios from "axios";
const handleResponse = async (response) => {
  try {
    if (response.status === 200) {
      return response?.data;
    }
  } catch (error) {
    throw new Error(response?.statusText);
  }
};

const addNewPractitioner = async (content, title) => {
  console.log(content, "contentss");

  try {
    const response = await axios.post(`${BASE_URL}/practitioner/create`, {
      title,
      content,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || error?.message || "Something went wrong"
    );
  }
};

const fetchPractitioner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/practitioner/get`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(
        error.message ? error.response.data.message : error.message
      );
    }
  };
const fetchPractitionerById = async (_id) => {
    try {
      const response = await axios.get(`${BASE_URL}/practitioner/get/${_id}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(
        error.message ? error.response.data.message : error.message
      );
    }
  };
  

  const handleUpdatePractitioner = async (_id, content) => {
    try {
      const response = await axios.put(`${BASE_URL}/practitioner/update/${_id}`, {
        content: content,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(
        error.message ? error.response.data.message : error.message
      );
    }
  };
  
  const handleDeletePractitioner = async (_id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/practitioner/delete/${_id}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(
        error.message ? error.response.data.message : error.message
      );
    }
  };

export { addNewPractitioner,fetchPractitioner,fetchPractitionerById,handleUpdatePractitioner,handleDeletePractitioner };

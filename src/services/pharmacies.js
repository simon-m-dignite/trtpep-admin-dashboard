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

const addNewPharmacies = async (content, title) => {

  try {
    const response = await axios.post(`${BASE_URL}/pharmacies/create`, {
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

const  fetchPharmacies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/pharmacies/get`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(
        error.message ? error.response.data.message : error.message
      );
    }
  };
const fetchPharmaciesById = async (_id) => {
    try {
      const response = await axios.get(`${BASE_URL}/pharmacies/get/${_id}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(
        error.message ? error.response.data.message : error.message
      );
    }
  };
  

  const handleUpdatePharmacies = async (_id, content) => {
    try {
      const response = await axios.put(`${BASE_URL}/pharmacies/update/${_id}`, {
        content: content,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(
        error.message ? error.response.data.message : error.message
      );
    }
  };
  
  const handleDeletePharmacies = async (_id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/pharmacies/delete/${_id}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(
        error.message ? error.response.data.message : error.message
      );
    }
  };

export { addNewPharmacies,fetchPharmacies,fetchPharmaciesById,handleUpdatePharmacies,handleDeletePharmacies };

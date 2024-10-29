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

const fetchCharges = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/charges/get-charges`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const fetchChargesById = async (_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/charges/get-charges/${_id}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const handleUpdateCharges = async (_id, charges) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/charges/update-charges/${_id}`,
      charges
    );
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response && error.response.data
        ? error.response.data.message
        : error.message
    );
  }
};

const updateSchedulerLinkById = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/scheduler/update-link`, data);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export default {
  fetchCharges,
  fetchChargesById,
  handleUpdateCharges,
  updateSchedulerLinkById,
};

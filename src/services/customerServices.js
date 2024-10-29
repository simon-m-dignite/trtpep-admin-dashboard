import axios from "axios";
import { BASE_URL } from "../api/api";

const handleResponse = async (response) => {
  try {
    if (
      response &&
      (response.status === 200 ||
        response.status === 201 ||
        response.status === 400)
    ) {
      return response.data;
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    throw new Error(response ? response.statusText : "No response from server");
  }
};

const handleFetchCustomers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/customers/get-customers`);
    return await handleResponse(response);
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error occurred");
    } else {
      throw new Error(error.message || "Network error occurred");
    }
  }
};

const handleFetchCustomerOrdersById = async (_id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/customers/customer-orders/${_id}`
    );
    return await handleResponse(response);
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || "Server error occurred");
    } else {
      throw new Error(error.message || "Network error occurred");
    }
  }
};

const searchPatientByEmail = async (email) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/customers/customer-info/${email}`
    );
    return await handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

export default {
  handleFetchCustomers,
  handleFetchCustomerOrdersById,
  searchPatientByEmail,
};

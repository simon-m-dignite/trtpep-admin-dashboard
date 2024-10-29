import axios from "axios";
import { BASE_URL } from "../api/api";

const handleResponse = (response) => {
  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 400 ||
    response.status === 401
  ) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

const fetchLabOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-lab-orders`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const fetchLabOrder = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-lab-order/${id}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const fethcCustomerOrdersByEmail = async (email) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/lab/get-customer-orders/${email}`
    );
    return await handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

export default {
  fetchLabOrders,
  fetchLabOrder,
  fethcCustomerOrdersByEmail,
};

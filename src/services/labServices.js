import axios from "axios";

const API_BASE_URL = "https://backend.trtpep.com/api";

const handleResponse = (response) => {
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

const fetchLabOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-lab-orders`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const fetchLabOrder = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-lab-order/${id}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export default {
  fetchLabOrders,
  fetchLabOrder,
};

import axios from "axios";
import { BASE_URL } from "../api/api";

const handleResponse = (response) => {
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products/get-products`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export default { fetchProducts };

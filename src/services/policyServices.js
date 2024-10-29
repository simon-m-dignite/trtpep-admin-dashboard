import axios from "axios";
import { BASE_URL } from "../api/api";

const handleResponse = async (response) => {
  if (response.status == 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

const handleCreatePolicy = async (title, content, type) => {
  try {
    const response = await axios.post(`${BASE_URL}/policy/create-policy`, {
      content,
      title,
      type,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

const fetchPrivacyPolicy = async (type) => {
  try {
    const response = await axios.get(`${BASE_URL}/policy/get-policy/${type}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const handleUpdatePolicy = async (type, title, content) => {
  console.log(type);
  try {
    const response = await axios.put(
      `${BASE_URL}/policy/update-policy/${type}`,
      {
        type,
        title,
        content,
      }
    );
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

export default {
  handleCreatePolicy,
  fetchPrivacyPolicy,
  handleUpdatePolicy,
};

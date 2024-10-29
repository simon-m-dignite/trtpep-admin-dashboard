import axios from "axios";
import { BASE_URL } from "../api/api";

const handleResponse = (response) => {
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const verifyEmail = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-email`, {
      email,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const verifyCode = async (email, code) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
      email,
      code,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const resetPassword = async (password, email) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
      email,
      password,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const resendOtp = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/request-new-otp`, {
      email,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export default {
  login,
  verifyEmail,
  verifyCode,
  resetPassword,
  resendOtp,
};

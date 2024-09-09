// authService.js
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "https://backend.trtpep.com/api";

export const signUp = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error signing up:", error.response.data);
      throw new Error(error.response.data.message || "Sign up failed");
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network error");
    }
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    console.log("login res >> ", response);
    Cookies.set("token", response.data.accessToken);
    console.log("login response >> ", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error logging in:", error.response.data);
      throw new Error(error.response.data.message || "Login failed");
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network error");
    }
  }
};

export const verifyEmail = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, {
      email,
    });
    localStorage.setItem("verifyEmail", email);
    console.log("Email verification response data >> ", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error verifying email:", error.response.data);
      throw new Error(
        error.response.data.message || "Email verification failed"
      );
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network error");
    }
  }
};

export const verifyOtp = async (code) => {
  try {
    const email = localStorage.getItem("verifyEmail");
    const response = await axios.post(`${API_URL}/auth/verify-otp`, {
      email,
      code,
    });
    console.log("otp verification response data >> ", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error verifying otp:", error.response.data);
      throw new Error(error.response.data.message || "OTP verification failed");
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network error");
    }
  }
};

export const resetPassword = async (password) => {
  try {
    const email = localStorage.getItem("verifyEmail");
    const resp = await axios.post(`${API_URL}/auth/reset-password`, {
      email,
      password,
    });

    return resp.data;
  } catch (error) {
    console.log("error >> ", error);
    return error;
    // if (error.response) {
    //   console.error("Error verifying email:", error.response.data);
    //   throw new Error(
    //     error.response.data.message || "Email verification failed"
    //   );
    // } else {
    //   console.error("Network error:", error.message);
    //   throw new Error("Network error");
    // }
  }
};

export const logout = () => {
  Cookies.remove("token");
};

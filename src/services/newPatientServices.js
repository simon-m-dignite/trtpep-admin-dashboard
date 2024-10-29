import axios from "axios";
import { BASE_URL } from "../api/api";

const handleResponse = async (response) => {
  if (response.status == 200) {
    return await response.data;
  } else {
    throw new Error(response.statusText);
  }
};

const searchPatientByEmail = async (email) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/patient/patient-info/${email}`
    );
    return await handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

export default {
  searchPatientByEmail,
};

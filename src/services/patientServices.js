import axios from "axios";

const API_BASE_URL = "https://backend.trtpep.com/api";

const handleResponse = (response) => {
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

const fetchPatients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-patients`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const fetchPatient = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-patient/${id}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const fetchEnrolledPatients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/get-enrolled-patients`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export default {
  fetchPatients,
  fetchPatient,
  fetchEnrolledPatients,
};

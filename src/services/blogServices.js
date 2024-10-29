import axios from "axios";
import { BASE_URL } from "../api/api";

const handleResponse = async (response) => {
  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(response.statusText);
  }
};

const addNewBlog = async (content) => {
  try {
    const response = await axios.post(`${BASE_URL}/blogs/add-new-blog`, {
      content,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blogs/fetch-blogs`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

const fetchBlog = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/blogs/blog/${id}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

const handleUpdateBlog = async (_id, content) => {
  try {
    const response = await axios.put(`${BASE_URL}/blogs/update-blog/${_id}`, {
      content: content,
    });
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

const handleDeleteBlog = async (_id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/blogs/delete-blog/${_id}`);
    return handleResponse(response);
  } catch (error) {
    throw new Error(
      error.message ? error.response.data.message : error.message
    );
  }
};

export default {
  addNewBlog,
  fetchBlogs,
  fetchBlog,
  handleUpdateBlog,
  handleDeleteBlog,
};

import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

export const loginApi = async (credentials) => {
  return axios.post(`${API_BASE_URL}/auth/login`, credentials);
};

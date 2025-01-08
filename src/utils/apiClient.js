import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Ensure `authToken` exists in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

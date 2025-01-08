// src/config/apiConfig.js
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

export const API_ENDPOINTS = {
    MY_TICKETS: `${API_BASE_URL}/tickets/my-tickets`,
};

export default API_BASE_URL;

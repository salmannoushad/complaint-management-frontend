// src/api/auth.js
import apiClient from "../utils/apiClient";
import { API_ENDPOINTS } from "../config/apiConfig";

export const loginApi = async (credentials) => {
    try {
        const response = await apiClient.post(API_ENDPOINTS.AUTH_LOGIN, credentials);
        return response;
    } catch (error) {
        console.error("login error:", error);
        throw error;
    }
};

export const registerApi = async (userData) => {
    try {
        const response = await apiClient.post(API_ENDPOINTS.AUTH_REGISTER, userData);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};

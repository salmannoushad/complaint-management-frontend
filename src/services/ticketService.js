import apiClient from "../utils/apiClient";
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";


export const getAllTickets = async () => {
    console.log('apiClient', apiClient);
    
    try {
        const response = await apiClient.get("/tickets/");
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error;
    }
};


// Function to create a ticket
export const createTicket = async (ticketData) => {
    try {
        const response = await apiClient.post("/tickets", ticketData);
        return response.data;
    } catch (error) {
        console.error("Error creating ticket:", error.response || error.message);
        throw error;
    }
};

export const fetchTickets = async () => {
    try {
        const response = await apiClient.get("/tickets/my-tickets");
        console.log('my tickets response', response );
        
        return response.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error;
    }
};


// Update ticket
export const updateTicket = async (ticketId, updatedTicket) => {
    try {
        const response = await apiClient.patch(`/tickets/${ticketId}`, updatedTicket);
        return response.data;
    } catch (error) {
        console.error("Failed to update ticket", error);
        throw error;
    }
};

// Delete ticket
export const deleteTicket = async (ticketId) => {
    try {
        const response = await apiClient.delete(`/tickets/${ticketId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete ticket", error);
        throw error;
    }
};
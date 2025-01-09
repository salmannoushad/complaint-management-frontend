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

export const fetchTicketReplies = async (ticketId) => {
    try {
        const response = await apiClient.get(`/tickets/${ticketId}/replies`);
        console.log('ticket replies', response);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching ticket replies:", error);
        throw error; 
    }
};


export const ticketReplies = async (ticketId, replyMessage) => {
    try {
        // Use POST to send a reply for the ticket
        const response = await apiClient.post(`/tickets/${ticketId}/reply`, { message: replyMessage });
        return response.data; // This could return a success message or the updated replies
    } catch (error) {
        console.error("Error sending ticket reply:", error);
        throw error;
    }
};


export const changeTicketStatus = async (ticketId, status) => {
    try {
        const response = await apiClient.patch(`/tickets/${ticketId}/status`, { status });
        console.log('response change status', response);
        
        return response.data; // This could return the updated ticket data or a success message
    } catch (error) {
        console.error("Error changing ticket status:", error);
        throw error;
    }
};
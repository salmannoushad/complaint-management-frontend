// src/api/tickets.js
import apiClient from "../utils/apiClient";
import { API_ENDPOINTS } from "../config/apiConfig";

export const getAllTickets = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.TICKETS);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const createTicket = async (ticketData) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.TICKETS, ticketData);
    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};

export const deleteTicket = async (ticketId) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.DELETE_TICKET(ticketId));
      return response.data;
    } catch (error) {
      console.error("Failed to delete ticket:", error);
      throw error;
    }
  };

export const fetchTickets = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.MY_TICKETS);
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const fetchTicketReplies = async (ticketId) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.TICKET_REPLIES(ticketId));
    return response.data;
  } catch (error) {
    console.error("Error fetching ticket replies:", error);
    throw error;
  }
};

export const ticketReplies = async (ticketId, replyMessage) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.TICKET_REPLY(ticketId), {
      message: replyMessage,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending ticket reply:", error);
    throw error;
  }
};

export const changeTicketStatus = async (ticketId, status) => {
  try {
    const response = await apiClient.patch(API_ENDPOINTS.TICKET_STATUS(ticketId), { status });
    return response.data;
  } catch (error) {
    console.error("Error changing ticket status:", error);
    throw error;
  }
};

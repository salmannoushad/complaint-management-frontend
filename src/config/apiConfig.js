const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

export const API_ENDPOINTS = {
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  TICKETS: `${API_BASE_URL}/tickets`,
  MY_TICKETS: `${API_BASE_URL}/tickets/my-tickets`,
  TICKET_REPLIES: (ticketId) => `${API_BASE_URL}/tickets/${ticketId}/replies`,
  TICKET_REPLY: (ticketId) => `${API_BASE_URL}/tickets/${ticketId}/reply`,
  TICKET_STATUS: (ticketId) => `${API_BASE_URL}/tickets/${ticketId}/status`,
  DELETE_TICKET: (ticketId) => `${API_BASE_URL}/tickets/${ticketId}`,
};

export default API_BASE_URL;

import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import TicketList from "../Tickets/TicketList";
import TicketForm from "../Tickets/TicketForm";
import { mockTickets } from "../../data/mockData"; // Importing mock data

const CustomerDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [editingTicket, setEditingTicket] = useState(null);

    useEffect(() => {
        setTickets(mockTickets); // Load mock data
    }, []);

    const handleCreateTicket = (newTicket) => {
        newTicket.id = tickets.length + 1;
        newTicket.status = "Open";
        newTicket.customer = "John Doe";
        newTicket.executive = "Admin";
        setTickets([...tickets, newTicket]);
    };

    const handleUpdateTicket = (updatedTicket) => {
        setTickets(
            tickets.map((ticket) =>
                ticket.id === updatedTicket.id ? updatedTicket : ticket
            )
        );
        setEditingTicket(null);
    };

    const handleDeleteTicket = (ticketId) => {
        setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
    };

    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4" align="center" gutterBottom>
                    Customer Dashboard
                </Typography>
                <TicketForm
                    onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
                    ticket={editingTicket}
                    onCancel={() => setEditingTicket(null)}
                />
                <Box mt={4}>
                    <Typography variant="h6">Your Tickets</Typography>
                    <TicketList
                        tickets={tickets}
                        onEdit={(ticket) => setEditingTicket(ticket)}
                        onDelete={handleDeleteTicket}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default CustomerDashboard;

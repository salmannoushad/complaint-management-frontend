import React, { useState } from "react";
import { Container, Grid, Button, Typography, Box, Paper, Divider } from "@mui/material";
import TicketCard from "../Tickets/TicketCard";
import ReplyForm from "../Tickets/ReplyForm";
import { styled } from "@mui/system";

const AdminDashboard = ({ tickets, onReply }) => {
    const [selectedTicket, setSelectedTicket] = useState(null);

    const handleReplyClick = (ticket) => {
        setSelectedTicket(ticket);
    };

    return (
        <AdminDashboardContainer>
            <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: "#1a73e8", marginBottom: 3 }}>
                Admin Dashboard
            </Typography>
            <Grid container spacing={3}>
                {/* Display all tickets */}
                {tickets.map((ticket) => (
                    <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                        <Paper elevation={3} sx={{ padding: 2, display: "flex", flexDirection: "column", borderRadius: "8px", transition: "transform 0.3s", '&:hover': { transform: 'scale(1.05)' } }}>
                            <TicketCard
                                ticket={ticket}
                                onEdit={() => { }}
                                onDelete={() => { }}
                                onReply={handleReplyClick}
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Display reply form when a ticket is selected */}
            {selectedTicket && (
                <ReplyFormBox>
                    <Typography variant="h6" gutterBottom>
                        <span style={{ color: "#1a73e8", fontWeight: 600 }}>Reply to Ticket:</span> {selectedTicket.subject}
                    </Typography>
                    <ReplyForm
                        ticket={selectedTicket}
                        onReply={(replyMessage) => {
                            onReply(selectedTicket.id, replyMessage);
                            setSelectedTicket(null); // Close reply form after submission
                        }}
                    />
                </ReplyFormBox>
            )}
        </AdminDashboardContainer>
    );
};

const AdminDashboardContainer = styled(Container)(({ theme }) => ({
    backgroundColor: "#f4f6f9",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    minHeight: "100vh",
}));

const ReplyFormBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: theme.spacing(4),
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginTop: theme.spacing(4),
    maxWidth: "800px",
    marginLeft: "auto",
    marginRight: "auto",
    transition: "transform 0.3s",
    '&:hover': { transform: 'scale(1.05)' },
}));

export default AdminDashboard;

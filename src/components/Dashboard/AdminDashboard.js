import React, { useState } from "react";
import { Container, Grid, Button, Typography, Box, Paper, Divider } from "@mui/material";
import TicketCard from "../Tickets/TicketCard";
import ReplyForm from "../Tickets/ReplyForm";
import { styled } from "@mui/system";

const AdminDashboard = ({ tickets }) => {
    const [ticketList, setTicketList] = useState(tickets);
  
    const handleStatusChange = (ticketId, newStatus) => {
      setTicketList((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    };
  
    const handleReply = (ticketId, message) => {
      console.log(`Reply sent to ticket ${ticketId}: ${message}`);
      // Optionally update a reply history in your ticketList state
    };
  
    return (
      <AdminDashboardContainer>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 600, color: "#1a73e8", marginBottom: 3 }}
        >
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          {ticketList.map((ticket) => (
            <Grid item xs={12} sm={6} md={4} key={ticket.id}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "8px",
                  transition: "transform 0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <TicketCard
                  ticket={ticket}
                  onStatusChange={handleStatusChange}
                  onReply={handleReply}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </AdminDashboardContainer>
    );
  };
  
const AdminDashboardContainer = styled(Container)(({ theme }) => ({
    backgroundColor: "#f4f6f9",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    minHeight: "100vh",
}));

export default AdminDashboard;

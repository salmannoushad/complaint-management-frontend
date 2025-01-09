import React, { useState, useEffect } from "react";
import {
    Container, Typography, Box, Button, Grid, Paper, Card, CardContent, Divider, Dialog, DialogActions, DialogContent, DialogTitle, List,
    ListItem,
} from "@mui/material";
import TicketForm from "../Tickets/TicketForm";
import { fetchTickets, deleteTicket, fetchTicketReplies } from "../../api/tickets";

const CustomerDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [editingTicket, setEditingTicket] = useState(null);
    const [openShowMessageDialog, setOpenShowMessageDialog] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [noRepliesSnackbar, setNoRepliesSnackbar] = useState(false);

    // Fetch tickets from backend
    useEffect(() => {
        const loadTickets = async () => {
            try {
                const data = await fetchTickets();
                setTickets(data);
            } catch (error) {
                console.error("Failed to load tickets", error);
            }
        };

        loadTickets();
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

    const handleDeleteTicket = async (ticketId) => {
        try {
            await deleteTicket(ticketId);
            setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
        } catch (error) {
            console.error("Failed to delete ticket", error);
        }
    };

    const handleShowMessages = async (ticket) => {
        try {
            const replies = await fetchTicketReplies(ticket.id);
            if (replies.length === 0) {
                setNoRepliesSnackbar(true);
            } else {
                setSelectedTicket({ ...ticket, replies });
                setOpenShowMessageDialog(true);
            }
        } catch (error) {
            console.error("Error loading messages:", error);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box my={5}>
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        color: "#1976d2",
                        fontWeight: "bold",
                        mb: 4,
                        fontSize: "2.5rem",
                        textTransform: "uppercase",
                    }}
                >
                    Customer Dashboard
                </Typography>

                <Paper
                    sx={{
                        p: 3,
                        bgcolor: "#f5f5f5",
                        borderRadius: 2,
                        boxShadow: 5,
                        transition: "all 0.3s ease",
                        "&:hover": {
                            boxShadow: 12,
                        },
                    }}
                >
                    <TicketForm
                        onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
                        ticket={editingTicket}
                        onCancel={() => setEditingTicket(null)}
                    />
                </Paper>

                <Box mt={5}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            color: "#333",
                            mb: 2,
                        }}
                    >
                        Your Tickets
                    </Typography>

                    <Grid container spacing={3}>
                        {tickets.map((ticket) => (
                            <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                                <Card
                                    sx={{
                                        boxShadow: 4,
                                        borderRadius: 2,
                                        bgcolor: "#ffffff",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            boxShadow: 12,
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                            {ticket.subject}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#555",
                                                mb: 2,
                                            }}
                                        >
                                            Status: <strong>{ticket.status}</strong>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#777",
                                                mb: 2,
                                            }}
                                        >
                                            Executive: {ticket.executive}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "#555",
                                                fontStyle: "italic",
                                                mb: 2,
                                            }}
                                        >
                                            Description: {ticket.description}
                                        </Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Button
                                                onClick={() => setEditingTicket(ticket)}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => handleDeleteTicket(ticket.id)}
                                                variant="outlined"
                                                color="error"
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                onClick={() => handleShowMessages(ticket)}
                                                variant="outlined"
                                            >
                                                Show Message
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>


            {/* Show Message Dialog */}
            {selectedTicket && (
                <Dialog
                    open={openShowMessageDialog}
                    onClose={() => setOpenShowMessageDialog(false)}
                    maxWidth="md"
                    fullWidth
                    PaperProps={{
                        sx: {
                            borderRadius: 5,
                            boxShadow: 12,
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            bgcolor: "#009688",
                            color: "white",
                            fontWeight: "bold",
                            textAlign: "center",
                            fontSize: "1.5rem",
                            padding: "20px 40px",
                        }}
                    >
                        Ticket Messages: {selectedTicket.subject}
                    </DialogTitle>
                    <DialogContent
                        sx={{
                            px: 4,
                            py: 2,
                            bgcolor: "#f9fafb",
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            maxHeight: "400px",
                            overflowY: "auto",
                        }}
                    >
                        <List>
                            {selectedTicket.replies.map((reply) => (
                                <ListItem
                                    key={reply.id}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        bgcolor: "#e0f7fa",
                                        borderRadius: "8px",
                                        mb: 2,
                                        p: 2,
                                        boxShadow: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            bgcolor: "#00796b",
                                            color: "white",
                                            mr: 2,
                                        }}
                                    >
                                        <i className="fas fa-user-tie" />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#00796b" }}>
                                            {reply?.admin_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {reply.message}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: "text.secondary",
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {new Date(reply.created_at).toLocaleString()}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            px: 4,
                            py: 2,
                            bgcolor: "#f9fafb",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button
                            onClick={() => setOpenShowMessageDialog(false)}
                            variant="outlined"
                            color="error"
                            sx={{
                                textTransform: "none",
                                borderRadius: "10px",
                            }}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Container>
    );
};

export default CustomerDashboard;

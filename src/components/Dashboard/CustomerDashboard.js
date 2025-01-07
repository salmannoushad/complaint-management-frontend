import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Grid, Paper, Card, CardContent, Divider, Dialog, DialogActions, DialogContent, DialogTitle, TextField,    List,
    ListItem, } from "@mui/material";
import TicketForm from "../Tickets/TicketForm";
import { mockTickets } from "../../data/mockData"; // Importing mock data

const CustomerDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [editingTicket, setEditingTicket] = useState(null);
    const [openReplyDialog, setOpenReplyDialog] = useState(false);
    const [openShowMessageDialog, setOpenShowMessageDialog] = useState(false);
    // const [openMessagesDialog, setOpenMessagesDialog] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");

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

    const handleReplySubmit = () => {
        // Add the reply to the selected ticket
        const updatedTickets = tickets.map((ticket) =>
            ticket.id === selectedTicket.id
                ? {
                      ...ticket,
                      replies: [
                          ...ticket.replies,
                          {
                              role: "customer",
                              message: replyMessage,
                              time: new Date().toISOString(),
                          },
                      ],
                  }
                : ticket
        );
        setTickets(updatedTickets);
        setReplyMessage(""); // Clear the reply field
        setOpenReplyDialog(false); // Close the dialog
    };

    const handleShowMessages = (ticket) => {
        setSelectedTicket(ticket);
        setOpenShowMessageDialog(true);
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
                                                // sx={{
                                                //     textTransform: "none",
                                                //     borderRadius: 5,
                                                //     padding: "6px 16px",
                                                //     fontWeight: "bold",
                                                // }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                onClick={() => handleDeleteTicket(ticket.id)}
                                                variant="outlined"
                                                color="error"
                                                // sx={{
                                                //     textTransform: "none",
                                                //     borderRadius: 5,
                                                //     padding: "6px 16px",
                                                // }}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                onClick={() => handleShowMessages(ticket)}
                                                variant="outlined"
                                                // sx={{
                                                //     textTransform: "none",
                                                //     borderRadius: 5,
                                                //     padding: "6px 16px",
                                                // }}
                                            >
                                                Show Message
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setSelectedTicket(ticket);
                                                    setOpenReplyDialog(true);
                                                }}
                                                variant="contained"
                                                color="secondary"
                                                // sx={{
                                                //     textTransform: "none",
                                                //     borderRadius: 5,
                                                //     padding: "6px 16px",
                                                // }}
                                            >
                                                Reply
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            {/* Reply Dialog */}
            {/* <Dialog open={openReplyDialog} onClose={() => setOpenReplyDialog(false)}>
                <DialogTitle>Reply to Ticket</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Reply Message"
                        fullWidth
                        multiline
                        rows={4}
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenReplyDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleReplySubmit} color="primary">
                        Submit Reply
                    </Button>
                </DialogActions>
            </Dialog> */}
{/* Customer Reply Popup Dialog */}
<Dialog
    open={openReplyDialog}
    onClose={() => setOpenReplyDialog(false)}
    maxWidth="sm"
    fullWidth
    PaperProps={{
        sx: {
            borderRadius: 3,
            boxShadow: 10,
        },
    }}
>
    <DialogTitle
        sx={{
            bgcolor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "1.2rem",
        }}
    >
        Reply to Ticket
    </DialogTitle>
    <DialogContent
        sx={{
            px: 4,
            py: 2,
            bgcolor: "#f9fafb",
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}
    >
        <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
        >
            Provide your reply below. Make sure your response is clear and concise.
        </Typography>
        <TextField
            label="Reply Message"
            multiline
            rows={5}
            fullWidth
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            variant="outlined"
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                },
            }}
        />
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
            onClick={() => setOpenReplyDialog(false)}
            variant="outlined"
            color="error"
            sx={{
                textTransform: "none",
                borderRadius: "10px",
            }}
        >
            Cancel
        </Button>
        <Button
            onClick={handleReplySubmit}
            variant="contained"
            sx={{
                bgcolor: "#1976d2",
                textTransform: "none",
                borderRadius: "10px",
                "&:hover": {
                    bgcolor: "#115293",
                },
            }}
        >
            Submit Reply
        </Button>
    </DialogActions>
</Dialog>

            {/* Show Message Dialog */}
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
        Ticket Messages: {selectedTicket?.subject}
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
            {selectedTicket?.replies.map((reply, index) => (
                <React.Fragment key={index}>
                    <ListItem
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            bgcolor: reply.role === "admin" ? "#e0f7fa" : "#fff3e0",
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
                                bgcolor: reply.role === "admin" ? "#00796b" : "#ff9800",
                                color: "white",
                                mr: 2,
                            }}
                        >
                            {reply.role === "admin" ? (
                                <i className="fas fa-user-tie" />
                            ) : (
                                <i className="fas fa-user-circle" />
                            )}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: "bold",
                                    color: reply.role === "admin" ? "#00796b" : "#ff9800",
                                }}
                            >
                                {reply.role === "admin" ? "Admin" : "Customer"}
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
                            {new Date(reply.time).toLocaleString()}
                        </Typography>
                    </ListItem>
                    {index < selectedTicket.replies.length - 1 && <Divider />}
                </React.Fragment>
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

        </Container>
    );
};

export default CustomerDashboard;

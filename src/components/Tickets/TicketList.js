import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Box } from "@mui/material";

const TicketList = ({ tickets, onEdit, onDelete }) => {
    return (
        <Box>
            {tickets.map((ticket) => (
                <Card
                    key={ticket.id}
                    sx={{
                        mb: 2,
                        boxShadow: 4,
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                            boxShadow: 12,
                            transform: "scale(1.02)",
                        },
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                color: "#1976d2",
                                mb: 1,
                                fontSize: "1.1rem",
                            }}
                        >
                            {ticket.subject}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                            sx={{
                                fontStyle: "italic",
                                color: "#555",
                                mb: 1,
                            }}
                        >
                            {ticket.description}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#333", mb: 0.5 }}>
                            <strong>Status:</strong> {ticket.status}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#333" }}>
                            <strong>Customer:</strong> {ticket.customer}
                        </Typography>
                    </CardContent>
                    <CardActions
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "8px 16px",
                            bgcolor: "#f5f5f5",
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 8,
                        }}
                    >
                        <Button
                            size="small"
                            onClick={() => onEdit(ticket)}
                            variant="contained"
                            color="primary"
                            sx={{
                                textTransform: "none",
                                borderRadius: 5,
                                fontWeight: "bold",
                                padding: "6px 16px",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    backgroundColor: "#1565c0",
                                },
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            size="small"
                            onClick={() => onDelete(ticket.id)}
                            color="error"
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                borderRadius: 5,
                                padding: "6px 16px",
                                fontWeight: "bold",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    backgroundColor: "#ff1744",
                                    color: "#fff",
                                },
                            }}
                        >
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
};

export default TicketList;

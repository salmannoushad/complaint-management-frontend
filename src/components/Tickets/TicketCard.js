import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Box, Divider } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const getStatusColor = (status) => {
    switch (status) {
        case "Open":
            return "#f44336"; // Red for Open
        case "Resolved":
            return "#4caf50"; // Green for Resolved
        case "Closed":
            return "#9e9e9e"; // Grey for Closed
        default:
            return "#2196f3"; // Blue for default status
    }
};

const TicketCard = ({ ticket, onEdit, onDelete, onReply }) => {
    return (
        <Card sx={{ mb: 2, border: `1px solid ${getStatusColor(ticket.status)}`, boxShadow: 3 }}>
            <CardContent sx={{ position: "relative" }}>
                {/* Status Indicator */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: getStatusColor(ticket.status),
                        color: "white",
                        padding: "2px 10px",
                        borderRadius: "10px",
                        fontWeight: "bold",
                    }}
                >
                    {ticket.status}
                </Box>

                {/* Ticket Title and Description */}
                <Typography variant="h6" gutterBottom>
                    {ticket.subject}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {ticket.description}
                </Typography>
                <Typography variant="body2">Customer: {ticket.customer}</Typography>
            </CardContent>

            {/* Replies */}
            <CardContent>
                {/* {ticket.replies.map((reply, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: reply.role === "admin" ? "bold" : "normal",
                color: reply.role === "admin" ? "blue" : "black",
              }}
            >
              {reply.role === "admin" ? "Admin: " : "You: "}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: "italic", mb: 1 }}>
              {reply.message}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(reply.time).toLocaleString()}
            </Typography>
          </Box>
        ))} */}

                {ticket.replies.map((reply, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: reply.role === "admin" ? "bold" : "normal",
                                color: reply.role === "admin" ? "blue" : "black",
                            }}
                        >
                            {reply.role === "admin" ? "Admin: " : "You: "}
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: "italic", mb: 1 }}>
                            {reply.message && typeof reply.message === "string" ? reply.message : "Invalid message"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(reply.time).toLocaleString()}
                        </Typography>
                    </Box>
                ))}

            </CardContent>

            {/* Actions */}
            <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                    size="small"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(ticket)}
                    sx={{ textTransform: "none" }}
                >
                    Edit
                </Button>
                <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(ticket.id)}
                    sx={{ textTransform: "none" }}
                >
                    Delete
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onReply(ticket)}
                    sx={{ textTransform: "none" }}
                >
                    Reply
                </Button>
            </CardActions>
        </Card>
    );
};

export default TicketCard;

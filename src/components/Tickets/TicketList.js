import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Box } from "@mui/material";
import TicketCard from "./TicketCard";

const TicketList = ({ tickets, onEdit, onDelete }) => {
    return (
        <Box>
            {tickets.map((ticket) => (
                <Card key={ticket.id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{ticket.subject}</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {ticket.description}
                        </Typography>
                        <Typography variant="body2">Status: {ticket.status}</Typography>
                        <Typography variant="body2">Customer: {ticket.customer}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => onEdit(ticket)}>
                            Edit
                        </Button>
                        <Button size="small" onClick={() => onDelete(ticket.id)} color="error">
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
};

export default TicketList;

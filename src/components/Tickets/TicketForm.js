import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Grid, Typography, Alert } from "@mui/material";
import { createTicket, fetchTickets } from "../../api/tickets";
import { Navigate } from "react-router-dom";

const TicketForm = ({ onSubmit, ticket, onCancel }) => {

    const [subject, setSubject] = useState(ticket ? ticket.subject : "");
    const [description, setDescription] = useState(ticket ? ticket.description : "");
    const [error, setError] = useState(null); 
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        if (ticket) {
            setSubject(ticket.subject);
            setDescription(ticket.description);
        }
    }, [ticket]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     onSubmit({ id: ticket?.id, subject, description, status: ticket?.status || "Open" });
    //     setSubject("");
    //     setDescription("");
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const ticketData = {
                subject,
                description,
                status: ticket?.status || "Open",
            };
    
            if (ticket) {
                // Update logic
                onSubmit({ ...ticket, ...ticketData });
            } else {
                if (onSubmit) onSubmit(ticketData);
                const newTicket = await createTicket(ticketData);
                console.log("Ticket created successfully:", newTicket);
                if (onSubmit) onSubmit(newTicket);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                setSubject("");
                setDescription("");
            }
        } catch (err) {
            console.error("Error creating ticket:", err);
            setError("Failed to create the ticket. Please try again.");
            setTimeout(() => setError(null), 5000);
        }
    };
    

    return (
        <Box component="form" onSubmit={handleSubmit} mb={4}>
            <Typography variant="h6" gutterBottom>
                {ticket ? "Update Your Ticket" : "Create a New Ticket"}
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">Ticket created successfully!</Alert>}

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ticket Subject"
                        variant="outlined"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ticket Description"
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" type="submit" color="primary" sx={{ mr: 2 }}>
                        {ticket ? "Update Ticket" : "Create Ticket"}
                    </Button>
                    {ticket && (
                        <Button variant="outlined" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default TicketForm;

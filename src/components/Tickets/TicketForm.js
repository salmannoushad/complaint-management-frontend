import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";

const TicketForm = ({ onSubmit, ticket, onCancel }) => {
    const [subject, setSubject] = useState(ticket ? ticket.subject : "");
    const [description, setDescription] = useState(ticket ? ticket.description : "");

    useEffect(() => {
        if (ticket) {
            setSubject(ticket.subject);
            setDescription(ticket.description);
        }
    }, [ticket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ id: ticket?.id, subject, description, status: ticket?.status || "Open" });
        setSubject("");
        setDescription("");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} mb={4}>
            <Typography variant="h6" gutterBottom>
                {ticket ? "Update Your Ticket" : "Create a New Ticket"}
            </Typography>
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

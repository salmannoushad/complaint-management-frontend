import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const ReplyForm = ({ ticket, onReply }) => {
    const [reply, setReply] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reply) {
            // Create a new reply object with admin role and add to ticket's replies
            const newReply = {
                role: "admin",
                message: reply,
                time: new Date().toISOString(),
            };
            onReply(newReply);
            setReply(""); // Clear the form after submission
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Your Reply"
                    variant="outlined"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit Reply
            </Button>
        </form>
    );
};

export default ReplyForm;

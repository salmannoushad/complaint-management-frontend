import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Select,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";

import { fetchTicketReplies, ticketReplies, changeTicketStatus } from "../../services/ticketService";

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

const TicketCard = ({ ticket, onStatusChange, onReply }) => {
    const [openChangeStatusDialog, setOpenChangeStatusDialog] = useState(false);
    const [openReplyDialog, setOpenReplyDialog] = useState(false);
    const [openMessagesDialog, setOpenMessagesDialog] = useState(false);
    const [replies, setReplies] = useState([]);
    const [loadingReplies, setLoadingReplies] = useState(false);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(ticket.status);
    const [replyMessage, setReplyMessage] = useState("");
    const [loadingReply, setLoadingReply] = useState(false);

    // Status change logic
    const handleChangeStatus = () => setOpenChangeStatusDialog(true);
    const handleCloseChangeStatus = () => setOpenChangeStatusDialog(false);

    const handleApplyStatusChange = async () => {
        try {
            // Call the service function to change the status
            await changeTicketStatus(ticket.id, selectedStatus);
            // Pass the status change to the parent (AdminDashboard)
            onStatusChange(ticket.id, selectedStatus);
            setOpenChangeStatusDialog(false); // Close the dialog after successful update
        } catch (error) {
            console.error("Error applying status change:", error);
            // Optionally, handle errors (e.g., show an alert or message to the user)
        }
    };


    // Reply logic
    const handleOpenReplyDialog = () => setOpenReplyDialog(true);
    const handleCloseReplyDialog = () => setOpenReplyDialog(false);

    // Send reply logic
    const handleSendReply = async () => {
        setLoadingReply(true);
        try {
            await ticketReplies(ticket.id, replyMessage); // Send the reply to the backend
            onReply(ticket.id, replyMessage); // Optionally update the ticket's state in AdminDashboard
            setReplyMessage(""); // Clear the message after sending
            setOpenReplyDialog(false); // Close the reply dialog
        } catch (err) {
            setError("Failed to send reply");
        } finally {
            setLoadingReply(false);
        }
    };

    // Messages logic
    // Open "Show Messages" dialog and fetch replies
    const handleOpenMessagesDialog = async () => {
        setOpenMessagesDialog(true);
        setLoadingReplies(true);
        setError(null);
        try {
            const fetchedReplies = await fetchTicketReplies(ticket.id);
            setReplies(fetchedReplies);
        } catch (err) {
            setError("Failed to load messages.");
        } finally {
            setLoadingReplies(false);
        }
    };

    // Close "Show Messages" dialog
    const handleCloseMessagesDialog = () => {
        setOpenMessagesDialog(false);
        setReplies([]);
    };


    // const replies = fetchTicketReplies(ticket.id);
    // console.log('replies', replies);
    return (
        <>
            <Card
                sx={{
                    mb: 2,
                    border: `1px solid ${getStatusColor(ticket.status)}`,
                    boxShadow: 3,
                }}
            >
                <CardContent sx={{ position: "relative" }}>
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
                    <Typography variant="h6" gutterBottom>
                      {ticket.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        description: {ticket.description}
                    </Typography>
                    <Typography variant="body2">Customer: {ticket.customer_name}</Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between" }}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleOpenReplyDialog}
                        sx={{ textTransform: "none" }}
                    >
                        Reply
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleChangeStatus}
                        sx={{ textTransform: "none" }}
                    >
                        Change Status
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleOpenMessagesDialog}
                        sx={{ textTransform: "none" }}
                    >
                        Show Messages
                    </Button>
                </CardActions>
            </Card>


            {/* Change Status Dialog */}
            <Dialog
                open={openChangeStatusDialog}
                onClose={handleCloseChangeStatus}
                maxWidth="sm"
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
                        bgcolor: "#1976d2",
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "1.5rem",
                        padding: "20px 40px",
                    }}
                >
                    Change Ticket Status
                </DialogTitle>
                <DialogContent
                    sx={{
                        px: 4,
                        py: 3,
                        bgcolor: "#f9fafb",
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                >
                    {/* Ticket Title Section */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            color: "#333",
                            borderBottom: "2px solid #1976d2",
                            paddingBottom: "10px",
                        }}
                    >
                        {ticket.subject} {/* Displaying the ticket title */}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Update the status of this ticket. Select the new status from the dropdown below.
                    </Typography>
                    <Select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        fullWidth
                        sx={{
                            bgcolor: "#ffffff",
                            borderRadius: 2,
                            boxShadow: 1,
                            padding: "8px 12px",
                            "& .MuiSelect-icon": {
                                color: "#1976d2",
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "#1976d2",
                                },
                            },
                        }}
                    >
                        <MenuItem value="Open">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        bgcolor: "#f44336",
                                        mr: 2,
                                    }}
                                />
                                Open
                            </Box>
                        </MenuItem>
                        <MenuItem value="Resolved">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        bgcolor: "#4caf50",
                                        mr: 2,
                                    }}
                                />
                                Resolved
                            </Box>
                        </MenuItem>
                        <MenuItem value="Closed">
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        bgcolor: "#9e9e9e",
                                        mr: 2,
                                    }}
                                />
                                Closed
                            </Box>
                        </MenuItem>
                    </Select>
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
                        onClick={handleCloseChangeStatus}
                        variant="outlined"
                        color="error"
                        sx={{
                            textTransform: "none",
                            borderRadius: "10px",
                            width: "120px",
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        onClick={handleApplyStatusChange}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            borderRadius: "10px",
                            width: "150px",
                        }}
                    >
                        Apply Changes
                    </Button>
                </DialogActions>
            </Dialog>


            {/* Reply Dialog */}
            <Dialog
                open={openReplyDialog}
                onClose={handleCloseReplyDialog}
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
                    Reply to: {ticket.subject}
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
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        label="Type your reply"
                        multiline
                        rows={5}
                        fullWidth
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
                        onClick={handleCloseReplyDialog}
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
                        onClick={handleSendReply}
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
                        {loadingReply ? "Sending..." : "Send Reply"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Show Messages Dialog */}
            <Dialog
                open={openMessagesDialog}
                onClose={handleCloseMessagesDialog}
                maxWidth="lg"
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
                        bgcolor: "#1976d2",
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: "1.5rem",
                        padding: "20px 40px",
                    }}
                >
                    Messages for: {ticket.subject}
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
                    {loadingReplies && <Typography>Loading messages...</Typography>}
                    {error && <Typography color="error">{error}</Typography>}
                    {!loadingReplies && !error && ( 
                        <List>
                        {replies?.map((reply, index) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        bgcolor: reply.role === "admin" ? "#e3f2fd" : "#c8e6c9",
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
                                            bgcolor: reply.role === "admin" ? "#1a73e8" : "#4caf50",
                                            color: "white",
                                            mr: 2,
                                        }}
                                    >
                                        {reply.role === "admin" ? (
                                            <i className="fas fa-user-shield" />
                                        ) : (
                                            <i className="fas fa-user" />
                                        )}
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: "bold",
                                                color: reply.role === "admin" ? "#1a73e8" : "#4caf50",
                                            }}
                                        >
                                            {reply.admin_name}
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
                                        {reply.time}
                                    </Typography>
                                </ListItem>
                                {index < replies.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                    )}
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
                        onClick={handleCloseMessagesDialog}
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

        </>
    );
};

export default TicketCard;

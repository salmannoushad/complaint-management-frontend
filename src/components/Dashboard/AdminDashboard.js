import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Paper, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import TicketCard from "../Tickets/TicketCard";
import { getAllTickets } from "../../api/tickets";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

const AdminDashboard = () => {
    const [ticketList, setTicketList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
    const navigate = useNavigate(); // For navigation

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const data = await getAllTickets();
                setTicketList(data);
                console.log("data", data);
            } catch (err) {
                setError("Failed to fetch tickets");
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    const handleStatusChange = (ticketId, newStatus) => {
        setTicketList((prev) =>
            prev.map((ticket) =>
                ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
            )
        );
    };

    const handleReply = (ticketId, message) => {
        console.log(`Reply sent to ticket ${ticketId}: ${message}`);
    };

    // Dropdown menu handlers
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <AdminDashboardContainer>
            <Header>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, color: "#1a73e8" }}
                >
                    Admin Dashboard
                </Typography>
                <IconButton onClick={handleMenuOpen} sx={{ marginLeft: "auto" }}>
                    <Avatar sx={{ bgcolor: "#1a73e8" }}>A</Avatar>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Header>
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

const Header = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
}));

export default AdminDashboard;

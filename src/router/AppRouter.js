import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Login";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import CustomerDashboard from "../components/Dashboard/CustomerDashboard";
import ProtectedRoute from "../components/Auth/ProtectedRoute";


// const tickets = [
//     {
//       id: 1,
//       subject: "Issue with login",
//       description: "I can't log into my account.",
//       status: "Open",
//       customer: "John Doe",
//     },
//     {
//       id: 2,
//       subject: "Payment failure",
//       description: "I can't process payments.",
//       status: "Resolved",
//       customer: "Jane Smith",
//     },
//     {
//       id: 3,
//       subject: "Slow website",
//       description: "The website is loading very slowly.",
//       status: "Closed",
//       customer: "Tom Lee",
//     },
// ];

const AppRouter = () => {
    const [tickets, setTickets] = useState([
        {
            id: 1,
            subject: "Issue with login",
            description: "I can't log into my account.",
            status: "Open",
            customer: "John Doe",
            replies: [
                {
                    role: "customer",
                    message: "I can't log into my account, please help.",
                    time: "2025-01-01 10:00:00",
                },
            ],
        },
        {
            id: 2,
            subject: "Payment failure",
            description: "I can't process payments.",
            status: "Resolved",
            customer: "Jane Smith",
            replies: [
                {
                    role: "customer",
                    message: "My payment keeps failing, help!",
                    time: "2025-01-02 12:00:00",
                },
                {
                    role: "admin",
                    message: "We've resolved the issue, please try again.",
                    time: "2025-01-02 15:00:00",
                },
            ],
        },
    ]);

    const handleReply = (ticketId, replyMessage) => {
        const updatedTickets = tickets.map((ticket) =>
            ticket.id === ticketId
                ? {
                    ...ticket,
                    replies: [
                        ...ticket.replies,
                        {
                            role: "admin",
                            message: replyMessage,
                            time: new Date().toISOString(),
                        },
                    ],
                }
                : ticket
        );
        setTickets(updatedTickets);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/admin"
                    element={
                        // <ProtectedRoute role="Admin">
                        <AdminDashboard tickets={tickets} />
                        // </ProtectedRoute>
                    }
                />
                <Route
                    path="/customer"
                    element={
                        // <ProtectedRoute role="Customer">
                        <CustomerDashboard />
                        // </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;

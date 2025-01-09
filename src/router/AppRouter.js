import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Login";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import CustomerDashboard from "../components/Dashboard/CustomerDashboard";
import ProtectedRoute from "../components/Auth/ProtectedRoute";
import Register from "../pages/Register";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="Admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer"
        element={
          <ProtectedRoute role="Customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
};

export default AppRouter;

import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  TextField,
  Button,
  Container,
  Typography,
  Alert,
  Box,
  Link,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth";

const Login = () => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await loginApi({ email, password });
      const { token } = response.data;

      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;

      setAuthData({ token, role });
      localStorage.setItem("authToken", token);

      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "Customer") {
        navigate("/customer");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "center" }}
      >
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box
        sx={{
          bgcolor: "#f9f9f9",
          borderRadius: 2,
          p: 4,
          boxShadow: 3,
          mt: 3,
        }}
      >
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{
            mt: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Login
        </Button>
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2">
            Don’t have an account?{" "}
            <Link
              href="#"
              underline="hover"
              onClick={() => navigate("/register")}
              sx={{ color: "#1976d2", fontWeight: "bold", cursor: "pointer" }}
            >
              Create New Account
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

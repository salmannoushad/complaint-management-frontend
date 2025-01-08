// import React, { useState } from "react";
// import { TextField, Button, Container, Typography } from "@mui/material";
// import { useAuth } from "../../context/AuthContext";

// const Login = () => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = () => {
//     if (email.includes("admin")) {
//       login("Admin");
//     } else {
//       login("Customer");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" gutterBottom>
//         Login
//       </Typography>
//       <TextField
//         label="Email"
//         fullWidth
//         margin="normal"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <TextField
//         label="Password"
//         fullWidth
//         margin="normal"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         fullWidth
//         onClick={handleSubmit}
//       >
//         Login
//       </Button>
//     </Container>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../services/apiService";

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

    // Decode the JWT token to extract the role
    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;

    console.log('response', role);
      // Save token and role in auth context or localStorage
      setAuthData({ token, role });
      localStorage.setItem("authToken", token);

      // Redirect based on role
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
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
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
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Login
      </Button>
    </Container>
  );
};

export default Login;

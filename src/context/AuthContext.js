import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    token: localStorage.getItem("authToken") || null,
    role: null,
  });

  // Validate token and set role
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          // Token expired
          logout();
        } else {
          setAuthData({ token, role: decodedToken.role });
        }
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    }
  }, []);

  // Logout function
  const logout = () => {
    setAuthData({ token: null, role: null });
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ ...authData, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

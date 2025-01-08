// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const ProtectedRoute = ({ role, children }) => {
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/" />;
//   }

//   if (role && user.role !== role) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { token, role: userRole } = useAuth();

  if (!token) {
    return <Navigate to="/" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

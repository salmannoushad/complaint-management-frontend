// import React, { createContext, useState, useContext } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (role) => {
//     setUser({ role });
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: localStorage.getItem("authToken") || null,
    role: null,
  });

  const logout = () => {
    setAuthData({ token: null, role: null });
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ ...authData, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

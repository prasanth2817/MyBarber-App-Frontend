import { createContext, useContext, useState, useEffect } from "react";

export const RoleContext = createContext();

export const useRoleContext = () => {
  return useContext(RoleContext);
};

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    const userRole = localStorage.getItem("User-token");
    return userRole || null; // Default to null if not set
  });

  useEffect(() => {
    const userRole = localStorage.getItem("User-token"); // Retrieve role when component mounts
    if (userRole) {
      setRole(userRole);
    }
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
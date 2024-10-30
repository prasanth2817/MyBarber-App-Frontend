import { jwtDecode } from "jwt-decode";

export const isTokenExpired = () => {
    const token = localStorage.getItem("User-token");
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; 
      return decoded.exp < currentTime; 
    }
    return true; 
  };
  
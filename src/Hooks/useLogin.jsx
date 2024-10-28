import { useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    const success = handleInputErrors(email, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      // Handle potential error response status
      if (data.error) {
        throw new Error(data.error);
      }
      if (res.status === 400) {
        toast.error(data.error || "Invalid login credentials.");
        return;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("User-token", data.token);

      // Decode the token and set the authUser
      const decodedToken = jwtDecode(data.token);
      setAuthUser(decodedToken);
      navigate("/home");

      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors(email, password) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const AxiosService = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosService.interceptors.request.use((config) => {
  const token = localStorage.getItem("User-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; 
    if (decoded.exp < currentTime) {
      localStorage.removeItem("User-token");
      window.location.href = "/login"; 
    }
  }
  return config;
});

AxiosService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("User-token"); 
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default AxiosService;

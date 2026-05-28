import { createContext, useState } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = async (formData) => {
    const response = await API.post("/auth/login", formData);
    const newToken = response.data.token;
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(response.data.user);
    return response.data;
  };

  const register = async (formData) => {
    const response = await API.post("/auth/register", formData);
    return response.data;
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

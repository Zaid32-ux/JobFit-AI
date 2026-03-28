import React, { createContext, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "@/stores/authStore";
import { request } from "@/utils/api";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { token, setUser, setSocket, logout } = useAuthStore();

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    let socket;

    async function getUser() {
      try {
        const res = await request({
          method: "GET",
          url: "/auth/profile",
        });

        setUser(res.user);

        // Connect socket
        socket = io(API_URL, {
          auth: { token },
        });

        socket.on("connect", () => {
          console.log("Connected:", socket.id);
          socket.emit("join", String(res.user.id));
        });

        setSocket(socket);
      } catch (error) {
        console.log("Error:", error);
        logout();
      }
    }

    getUser();

    //Cleanup
    return () => {
      if (socket) socket.disconnect();
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
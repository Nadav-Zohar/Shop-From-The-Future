/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from "react";
import { Router } from "../Router";
import Navbar from "../components/navbar/Navbar";
import CustomizedSnackbars from "../components/notification/Notification";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import Loader from "../components/loader/Loader";

export const GeneralContext = createContext();

function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState("error");
  const [loader, setLoader] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticationAndCleanToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("token");
          localStorage.removeItem("cart");
          sessionStorage.removeItem("cart");
          setIsAuthenticated(false);
        } else {
          sessionStorage.removeItem("cart");
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("cart");
        sessionStorage.removeItem("cart");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    checkAuthenticationAndCleanToken();
  }, []);

  const updateNotification = (newOpen, newIsSuccess, newMessage) => {
    setOpen(newOpen);
    setMessage(newMessage);
    setIsSuccess(newIsSuccess);
  };

  return (
    <GeneralContext.Provider
      value={{
        open,
        setOpen,
        message,
        setMessage,
        isSuccess,
        setIsSuccess,
        updateNotification,
        isAuthenticated,
        checkAuthenticationAndCleanToken,
        setLoader,
      }}
    >
      {loader ? <Loader /> : ""}
      <Navbar />
      <Router />
      <CustomizedSnackbars />
    </GeneralContext.Provider>
  );
}

export default App;

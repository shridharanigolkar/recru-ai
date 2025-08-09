'use client'
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const ToastContext = createContext(null);

const Toast = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "white",
        color: "var(--primary, #0070f3)",
        padding: "12px 20px",
        borderRadius: 6,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontWeight: "bold",
        zIndex: 9999,
        maxWidth: 320,
        wordWrap: "break-word",
      }}
    >
      {message}
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((msg) => {
    setToasts((prev) => [...prev, msg]);
  }, []);

  const removeToast = useCallback(() => {
    setToasts((prev) => prev.slice(1));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.length > 0 && (
        <Toast message={toasts[0]} onClose={removeToast} />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

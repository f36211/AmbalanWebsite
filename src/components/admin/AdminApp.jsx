import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";

const AdminApp = () => {
  // Simple check for authentication
  const isAuthenticated = localStorage.getItem("adminAuth") === "true";

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Dashboard />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      />
      <Route path="/login" element={<Login />} />
      {/* Catch-all to redirect to dashboard or login */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminApp;

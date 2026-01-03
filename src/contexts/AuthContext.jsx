import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // This effect can be used to verify user session on app load if needed
  useEffect(() => {
    // For now, we assume user is logged out on initial load.
    // A more advanced version could have an API endpoint to check the JWT cookie.
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await axios.post('/api/admin-login', { username, password });
    setUser(response.data);
    return response.data;
  };

  const logout = async () => {
    await axios.post('/api/admin-logout');
    setUser(null);
    navigate('/admin/login');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

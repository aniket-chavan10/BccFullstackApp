// src/components/ProtectedRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const [jwtDecode, setJwtDecode] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(true);

  useEffect(() => {
    // Dynamically import jwt-decode
    import('jwt-decode')
      .then((module) => {
        setJwtDecode(() => module.default);
      })
      .catch((error) => {
        console.error('Failed to load jwt-decode:', error);
        setIsTokenValid(false);
      });
  }, []);

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (jwtDecode) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds

      if (decodedToken.exp < currentTime) {
        // Token has expired
        localStorage.removeItem('token'); // Remove the expired token
        return <Navigate to="/login" />;
      }
    } catch (err) {
      // Handle error in token decoding
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;

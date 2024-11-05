// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth(); // Obtém o usuário do contexto

  return user ? children : <Navigate to="/" />; // Redireciona para o login se não estiver autenticado
};

export default PrivateRoute;

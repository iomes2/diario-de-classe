
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import RecuperacaoSenha from './components/Login/RecuperacaoSenha';
import Header from './components/Header/Header';
import Cadastro from './components/Cadastro/Cadastro';
import { AuthProvider } from './context/AuthContext'; // Importando o AuthProvider
import Home from './components/Home/Home';
import PrivateRoute from './components/PrivateRoute'; // Importando o PrivateRoute
import RealizarChamada from '.components/R'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/rec" element={<RecuperacaoSenha />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }         
          />
          <Route path="/RealizarChamada" element={<RealizarChamada />} />
          {/* Adicione outras rotas aqui */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

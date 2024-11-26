import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import RecuperacaoSenha from './components/Login/RecuperacaoSenha';
import Header from './components/Header/Header';
import Cadastro from './components/Cadastro/Cadastro';
import Home from './components/Home/Home';
import RealizarChamada from './components/Chamadas/RealizarChamada';
import RegistrarNotas from './components/Notas/RegistrarNotas';
import EditarNotas from './components/Notas/EditarNotas';
import GerarRelatoriosPresenca from './components/Relatorios/GerarRelatoriosPresenca';
import GerarRelatoriosNotas from './components/Relatorios/GerarRelatoriosNotas';
import NovaTurma from './components/Turmas/NovaTurma';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Header será exibido em todas as páginas */}
        <Header />
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/rec" element={<RecuperacaoSenha />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas privadas */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/realizar-chamada"
            element={
              <PrivateRoute>
                <RealizarChamada />
              </PrivateRoute>
            }
          />
          <Route
            path="/registrar-notas"
            element={
              <PrivateRoute>
                <RegistrarNotas />
              </PrivateRoute>
            }
          />
          <Route
            path="/editar-notas"
            element={
              <PrivateRoute>
                <EditarNotas />
              </PrivateRoute>
            }
          />
          <Route
            path="/gerar-relatorios-frequencias"
            element={
              <PrivateRoute>
                <GerarRelatoriosPresenca />
              </PrivateRoute>
            }
          />
          <Route
            path="/gerar-relatorios-notas"
            element={
              <PrivateRoute>
                <GerarRelatoriosNotas />
              </PrivateRoute>
            }
          />
          <Route
            path="/nova-turma"
            element={
              <PrivateRoute>
                <NovaTurma />
              </PrivateRoute>
            }
          />

          {/* Rota para página não encontrada */}
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

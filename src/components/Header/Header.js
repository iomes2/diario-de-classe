// src/components/Header/Header.js
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import { HeaderContainer, Title, Nav, NavLink, LogoutButton } from './style';

const Header = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate(); // Usando useNavigate aqui

  const handleLogout = async () => {
    await logout(); // Espera o logout ser completado
    navigate('/'); // Redireciona para a página de login
  };

  return (
    <HeaderContainer>
      <Title>Diário de Classe</Title>
      {user && ( 
        <Nav>
          <NavLink as={RouterLink} to="/realizar-chamada">Realizar Chamada</NavLink>
          <NavLink as={RouterLink} to="/registrar-notas">Registrar Notas</NavLink>
          <NavLink as={RouterLink} to="/editar-notas">Editar Notas</NavLink>
          <NavLink as={RouterLink} to="/gerar-relatorios-frequencias">Gerar Relatórios de Frequências</NavLink>
          <NavLink as={RouterLink} to="/gerar-relatorios-notas">Gerar Relatórios de Notas</NavLink>
          <LogoutButton onClick={handleLogout}>Sair</LogoutButton> {/* Botão de logout */}
        </Nav>
      )}
    </HeaderContainer>
  );
};

export default Header;

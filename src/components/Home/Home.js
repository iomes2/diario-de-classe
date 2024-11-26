// src/components/Home/Home.js
import React from 'react';
import Header from '../Header/Header'; // Certifique-se de que o caminho está correto
import { Container, Container1, Container2, MenuButton, Menu } from './style'; // Estilos para o componente

const Home = () => {
  return (
    <Container>
      <Header />

      <Container1>
        <img
            src="/logo.jpg"
            alt="logo"
            style={{ width: "300px", marginRight: "8px" }}
            />
        </Container1>
      <Container2>
      <Menu>
        <MenuButton to="/realizar-chamada">Realizar Chamada</MenuButton>
        <MenuButton to="/registrar-notas">Registrar Notas</MenuButton>
        <MenuButton to="/editar-notas">Editar Notas</MenuButton>
        <MenuButton to="/gerar-relatorios-frequencias">Gerar Relatórios de Frequências</MenuButton>
        <MenuButton to="/gerar-relatorios-notas">Gerar Relatórios de Notas</MenuButton>
        <MenuButton to="/nova-turma">Nova Turma</MenuButton>
        <MenuButton to="/gerar-relatorios-notas">Adicionar Aluno</MenuButton>
      </Menu>
      </Container2>

    </Container>
  );
};

export default Home;

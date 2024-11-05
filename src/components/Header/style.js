// src/components/Header/style.js
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const HeaderContainer = styled.header`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 20px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
`;
export const LogoutButton = styled.button`
  margin-left: 20px;
  padding: 10px 15px;
  background-color: #f44336; /* Vermelho para o botão de logout */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f; /* Cor ao passar o mouse */
  }
`;
export const Title = styled.h1`
  margin: 0;
  font-size: 2.2rem;
  font-weight: 100;
  border-top: thick double white;
  border-radius: 3px;
`;

export const Nav = styled.nav`
    padding: 0px 80px;
  display: block;
`;


export const NavLink = styled(RouterLink)`
  color: white;
  text-decoration: none;
  margin-left: 20px;
  padding: 8px 12px;
  border-radius: 4px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Um leve efeito de hover */
  }
`;

// src/components/Home/style.js
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Importando o Link do react-router-dom

export const Container = styled.div`
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 200px;
`;
export const Container1 = styled.div`
  align-self: center;
  padding: 0px;
`;
export const Container2 = styled.div`
  padding: 0px;
`;
export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const MenuButton = styled(Link)`
  display: block;
  width: 300px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: #45a049;
  }
`;

// src/components/Login/style.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Faz o container ocupar a altura total da tela */
`;
export const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Faz o container ocupar a altura total da tela */
`;
export const Container2 = styled.div`
  display: flex;
  margin-left: 6%;
`;

export const Title = styled.h1`
  color: #000;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  width: 300px; /* Largura do campo de entrada */
  display: block;
  border: none;
  border-bottom: 3px solid black;
  border-radius: 0px;
  outline: none; // Remove a borda ao focar
  &:focus {
    border-bottom: 3px solid black;

  }
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px; // Adicione uma margem inferior se necessário
`;
export const Button = styled.button`
  padding: 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%; /* Faz o botão ocupar toda a largura do container */
  
  &:hover {
    background-color: #ff8c00; /* Cor do botão ao passar o mouse */
  }
`;

export const Link = styled.a`
  margin-top: 10px;
  color: #000;

  &:hover {
    text-decoration: underline; /* Sublinha o link ao passar o mouse */
  }
`;

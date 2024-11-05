// src/components/Login/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../firebaseConfig'; // Certifique-se de que o caminho está correto
import { signInWithEmailAndPassword } from 'firebase/auth';
// import { useAuth } from '../../context/AuthContext'; // Importe o contexto de autenticação
import { Container, Container1, Container2, Title, Input, Button, Link, FormGroup } from './style'; // Certifique-se de que FormGroup está definido em style

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Usando useNavigate aqui

  const handleLogin = (e) => {
    e.preventDefault(); // Evita o recarregamento da página
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login bem-sucedido
        console.log('Usuário logado:', userCredential.user);
        setError(''); // Limpa a mensagem de erro
        navigate('/home') 
      })
      .catch((error) => {
        // Se ocorrer um erro
        setError(error.message);
      });
  };

  return (
    <Container>
      <Container1>
        <Title>Fazer Login</Title>
        <form onSubmit={handleLogin}>
          <FormGroup>
            <img
              src="/mail.svg"
              alt="Ícone de e-mail"
              style={{ width: "30px", marginRight: "8px" }}
            />
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <img
              src="/lock.svg"
              alt="Ícone de cadeado"
              style={{ width: "30px", marginRight: "8px" }}
            />
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="submit">Entrar</Button>
        </form>
        <Link href="/rec">Esqueci minha senha</Link>
        <Link href="/cadastro">Não sou cadastrado</Link>
      </Container1>
      <Container2>
        <img
          src="/logo.jpg"
          alt="logo"
          style={{ width: "300px", marginRight: "8px" }}
        />
      </Container2>
    </Container>
  );
};

export default Login;

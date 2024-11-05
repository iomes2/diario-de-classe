// src/components/Signup/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig'; // Certifique-se de que o caminho está correto
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Container, Container1, Container2, Title, Input, Button, Link, FormGroup } from './style'; // Certifique-se de que FormGroup está definido em style

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Usando useNavigate aqui

  const handleSignup = (e) => {
    e.preventDefault(); // Evita o recarregamento da página
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Cadastro bem-sucedido
        console.log('Usuário cadastrado:', userCredential.user);
        setError(''); // Limpa a mensagem de erro
        navigate('/home'); // Redireciona para a página inicial após o cadastro
      })
      .catch((error) => {
        // Se ocorrer um erro
        setError(error.message);
      });
  };

  return (
    <Container>
      <Container1>
        <Title>Criar Conta</Title>
        <form onSubmit={handleSignup}>
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
          <Button type="submit">Cadastrar</Button>
        </form>
        <Link href="/">Já possui uma conta? Faça login</Link>
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

export default Signup;

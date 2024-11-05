// src/components/RecuperacaoSenha/RecuperacaoSenha.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig'; // Certifique-se de que o caminho está correto
import { sendPasswordResetEmail } from 'firebase/auth'; // Importa a função para enviar o e-mail de redefinição de senha
import { Container, Container1, Container2, Title, Input, Button, Link, FormGroup } from './style'; // Certifique-se de que FormGroup está definido em style

const RecuperacaoSenha = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Usando useNavigate aqui

  const handleResetPassword = (e) => {
    e.preventDefault(); // Evita o recarregamento da página
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // E-mail de redefinição de senha enviado
        setSuccessMessage('E-mail de redefinição de senha enviado com sucesso!');
        setError(''); // Limpa a mensagem de erro
        setTimeout(() => {
          navigate('/'); // Redireciona para a página de login após 5 segundos
        }, 5000);
      })
      .catch((error) => {
        // Se ocorrer um erro
        setError(error.message);
        setSuccessMessage(''); // Limpa a mensagem de sucesso
      });
  };

  return (
    <Container>
      <Container1>
        <Title>Recuperar Senha</Title>
        <form onSubmit={handleResetPassword}>
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

          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          <Button type="submit">Enviar E-mail de Recuperação</Button>
        </form>
        <Link href="/">Voltar ao Login</Link>
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

export default RecuperacaoSenha;

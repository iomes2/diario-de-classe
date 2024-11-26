import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Container, Title, FormGroup, Input, Button } from './style';

const NovaTurma = () => {
  const [nome, setNome] = useState('');
  const [ano, setAno] = useState('');
  const [professor, setProfessor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCriarTurma = async () => {
    if (!nome || !ano || !professor) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'turmas'), {
        nome,
        ano,
        professor,
      });
      alert('Turma criada com sucesso!');
      setNome('');
      setAno('');
      setProfessor('');
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      alert('Erro ao criar turma. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Criar Nova Turma</Title>
      <FormGroup>
        <label>Nome da Turma:</label>
        <Input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome da turma"
        />
      </FormGroup>
      <FormGroup>
        <label>Ano:</label>
        <Input
          type="number"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          placeholder="Digite o ano"
        />
      </FormGroup>
      <FormGroup>
        <label>Nome do Professor:</label>
        <Input
          type="text"
          value={professor}
          onChange={(e) => setProfessor(e.target.value)}
          placeholder="Digite o nome do professor"
        />
      </FormGroup>
      <Button onClick={handleCriarTurma} disabled={loading}>
        {loading ? 'Criando...' : 'Criar Turma'}
      </Button>
    </Container>
  );
};

export default NovaTurma;

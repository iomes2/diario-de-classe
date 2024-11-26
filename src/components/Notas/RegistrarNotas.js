import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { Container, Title, FormGroup, Select, Table, TableRow, TableHeader, TableCell, Input, Button } from './style';

const RegistrarNotas = () => {
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState('');
  const [notas, setNotas] = useState({});
  const [loading, setLoading] = useState(false);

  // Buscar turmas no Firestore
  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'turmas'));
        const turmasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTurmas(turmasData);
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };

    fetchTurmas();
  }, []);

  // Buscar alunos da turma selecionada
  useEffect(() => {
    if (!selectedTurma) return;

    const fetchAlunos = async () => {
      try {
        const q = query(collection(db, 'alunos'), where('turmaId', '==', selectedTurma));
        const querySnapshot = await getDocs(q);
        const alunosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlunos(alunosData);

        // Inicializar notas com "0" ou vazio
        const initialNotas = {};
        alunosData.forEach((aluno) => {
          initialNotas[aluno.id] = ''; // Notas começam vazias
        });
        setNotas(initialNotas);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };

    fetchAlunos();
  }, [selectedTurma]);

  // Registrar notas no Firestore
  const handleRegistrarNotas = async () => {
    setLoading(true);
    try {
      // Percorre as notas e cria documentos no Firestore
      for (const alunoId in notas) {
        const nota = notas[alunoId];
        const notaRef = doc(collection(db, 'notas'));
        await setDoc(notaRef, {
          alunoId,
          turmaId: selectedTurma,
          nota: parseFloat(nota), // Converte para número
        });
      }
      alert('Notas registradas com sucesso!');
      setNotas({});
      setSelectedTurma('');
      setAlunos([]);
    } catch (error) {
      console.error('Erro ao registrar notas:', error);
      alert('Erro ao registrar notas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Atualizar nota de um aluno
  const handleNotaChange = (alunoId, valor) => {
    setNotas((prevNotas) => ({
      ...prevNotas,
      [alunoId]: valor,
    }));
  };

  return (
    <Container>
      <Title>Registrar Notas</Title>
      <FormGroup>
        <Select value={selectedTurma} onChange={(e) => setSelectedTurma(e.target.value)}>
          <option value="">Selecione uma turma</option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.nome}
            </option>
          ))}
        </Select>
      </FormGroup>
      {alunos.length > 0 && (
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Nome do Aluno</TableHeader>
              <TableHeader>Nota</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <TableRow key={aluno.id}>
                <TableCell>{aluno.nome}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={notas[aluno.id]}
                    onChange={(e) => handleNotaChange(aluno.id, e.target.value)}
                    placeholder="Digite a nota"
                  />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
      <Button onClick={handleRegistrarNotas} disabled={loading || !selectedTurma}>
        {loading ? 'Registrando...' : 'Registrar Notas'}
      </Button>
    </Container>
  );
};

export default RegistrarNotas;

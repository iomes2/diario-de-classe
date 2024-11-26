import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Container, Title, FormGroup, Select, Table, TableRow, TableHeader, TableCell, Button } from './style';

const GerarRelatoriosNotas = () => {
  const [turmas, setTurmas] = useState([]);
  const [notas, setNotas] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState('');
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

  // Buscar notas da turma selecionada
  const handleGerarRelatorio = async () => {
    if (!selectedTurma) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'notas'), where('turmaId', '==', selectedTurma));
      const querySnapshot = await getDocs(q);

      const notasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotas(notasData);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      alert('Erro ao gerar relatório de notas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Gerar Relatórios de Notas</Title>
      <FormGroup>
        <Select value={selectedTurma} onChange={(e) => setSelectedTurma(e.target.value)}>
          <option value="">Selecione uma turma</option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.nome}
            </option>
          ))}
        </Select>
        <Button onClick={handleGerarRelatorio} disabled={loading || !selectedTurma}>
          {loading ? 'Gerando Relatório...' : 'Gerar Relatório'}
        </Button>
      </FormGroup>
      {notas.length > 0 && (
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Aluno</TableHeader>
              <TableHeader>Nota</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {notas.map((nota) => (
              <TableRow key={nota.id}>
                <TableCell>{nota.alunoId}</TableCell>
                <TableCell>{nota.nota}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default GerarRelatoriosNotas;

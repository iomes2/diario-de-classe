import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Container, Title, FormGroup, Select, Table, TableRow, TableHeader, TableCell, Button } from './style';

const GerarRelatoriosPresenca = () => {
  const [turmas, setTurmas] = useState([]);
  const [presencas, setPresencas] = useState([]);
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

  // Buscar presenças da turma selecionada
  const handleGerarRelatorio = async () => {
    if (!selectedTurma) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'chamadas'), where('turmaId', '==', selectedTurma));
      const querySnapshot = await getDocs(q);

      const presencasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPresencas(presencasData);
    } catch (error) {
      console.error('Erro ao buscar presenças:', error);
      alert('Erro ao gerar relatório de presenças.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Gerar Relatórios de Presença</Title>
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
      {presencas.length > 0 && (
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Data</TableHeader>
              <TableHeader>Aluno</TableHeader>
              <TableHeader>Presença</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {presencas.map((chamada) =>
              Object.entries(chamada.presencas).map(([alunoId, presente]) => (
                <TableRow key={`${chamada.id}-${alunoId}`}>
                  <TableCell>{chamada.data}</TableCell>
                  <TableCell>{alunoId}</TableCell>
                  <TableCell>{presente ? 'Presente' : 'Ausente'}</TableCell>
                </TableRow>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default GerarRelatoriosPresenca;

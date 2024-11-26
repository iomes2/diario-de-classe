import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { Container, Title, Button, FormGroup, Select, Table, TableRow, TableHeader, TableCell, Checkbox } from './style';

const RealizarChamada = () => {
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [selectedTurma, setSelectedTurma] = useState('');
  const [presencas, setPresencas] = useState({});
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

        // Inicializar presenças com "false"
        const initialPresencas = {};
        alunosData.forEach((aluno) => {
          initialPresencas[aluno.id] = false;
        });
        setPresencas(initialPresencas);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };

    fetchAlunos();
  }, [selectedTurma]);

  // Registrar chamada no Firestore
  const handleRegistrarChamada = async () => {
    setLoading(true);
    try {
      const chamadaRef = doc(collection(db, 'chamadas'));
      await setDoc(chamadaRef, {
        turmaId: selectedTurma,
        data: new Date().toISOString().split('T')[0], // Data atual
        presencas,
      });
      alert('Chamada registrada com sucesso!');
      setPresencas({});
      setSelectedTurma('');
    } catch (error) {
      console.error('Erro ao registrar chamada:', error);
      alert('Erro ao registrar chamada. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Alterar presença de aluno
  const handlePresencaChange = (alunoId) => {
    setPresencas((prevPresencas) => ({
      ...prevPresencas,
      [alunoId]: !prevPresencas[alunoId],
    }));
  };

  return (
    <Container>
      <Title>Realizar Chamada</Title>
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
              <TableHeader>Presença</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <TableRow key={aluno.id}>
                <TableCell>{aluno.nome}</TableCell>
                <TableCell>
                  <Checkbox
                    type="checkbox"
                    checked={presencas[aluno.id]}
                    onChange={() => handlePresencaChange(aluno.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
      <Button onClick={handleRegistrarChamada} disabled={loading || !selectedTurma}>
        {loading ? 'Registrando...' : 'Registrar Chamada'}
      </Button>
    </Container>
  );
};

export default RealizarChamada;

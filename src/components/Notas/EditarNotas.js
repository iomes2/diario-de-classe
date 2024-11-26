import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Container, Title, FormGroup, Select, Table, TableRow, TableHeader, TableCell, Input, Button } from './style';

const EditarNotas = () => {
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [notas, setNotas] = useState({});
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

  // Buscar alunos e notas da turma selecionada
  useEffect(() => {
    if (!selectedTurma) return;

    const fetchAlunosENotas = async () => {
      try {
        // Busca alunos
        const alunosQuery = query(collection(db, 'alunos'), where('turmaId', '==', selectedTurma));
        const alunosSnapshot = await getDocs(alunosQuery);
        const alunosData = alunosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Busca notas
        const notasQuery = query(collection(db, 'notas'), where('turmaId', '==', selectedTurma));
        const notasSnapshot = await getDocs(notasQuery);
        const notasData = notasSnapshot.docs.reduce((acc, doc) => {
          acc[doc.data().alunoId] = doc.data().nota;
          return acc;
        }, {});

        setAlunos(alunosData);
        setNotas(notasData);
      } catch (error) {
        console.error('Erro ao buscar alunos e notas:', error);
      }
    };

    fetchAlunosENotas();
  }, [selectedTurma]);

  // Atualizar nota no estado
  const handleNotaChange = (alunoId, valor) => {
    setNotas((prevNotas) => ({
      ...prevNotas,
      [alunoId]: valor,
    }));
  };

  // Salvar notas atualizadas no Firestore
  const handleSalvarNotas = async () => {
    setLoading(true);
    try {
      for (const alunoId in notas) {
        const notaAtualizada = parseFloat(notas[alunoId]);
        const notaQuery = query(
          collection(db, 'notas'),
          where('alunoId', '==', alunoId),
          where('turmaId', '==', selectedTurma)
        );
        const notaSnapshot = await getDocs(notaQuery);

        if (!notaSnapshot.empty) {
          const notaDoc = notaSnapshot.docs[0].ref;
          await updateDoc(notaDoc, { nota: notaAtualizada });
        }
      }
      alert('Notas atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar notas:', error);
      alert('Erro ao atualizar notas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Editar Notas</Title>
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
                    value={notas[aluno.id] || ''}
                    onChange={(e) => handleNotaChange(aluno.id, e.target.value)}
                    placeholder="Digite a nova nota"
                  />
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
      <Button onClick={handleSalvarNotas} disabled={loading || !selectedTurma}>
        {loading ? 'Salvando...' : 'Salvar Notas'}
      </Button>
    </Container>
  );
};

export default EditarNotas;

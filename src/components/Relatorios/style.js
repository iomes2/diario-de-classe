import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Select = styled.select`
  width: 300px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    border-color: #4caf50;
  }
`;

export const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin: 20px 0;
  text-align: left;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #f9f9f9;
  }
`;

export const TableHeader = styled.th`
  padding: 10px;
  background-color: #4caf50;
  color: white;
`;

export const TableCell = styled.td`
  padding: 10px;
`;

export const Button = styled.button`
  display: block;
  width: 300px;
  margin: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

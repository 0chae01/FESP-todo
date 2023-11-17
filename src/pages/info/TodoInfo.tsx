import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

const TodoInfo = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [todoItem, setTodoItem] = useState<TodoItem | null>(null);
  const getTodoItem = async (_id: string) => {
    try {
      const response = await axios.get<TodoResponse>(`http://localhost:33088/api/todolist/${_id}`);
      setTodoItem(response.data.item);
    } catch (err) {
      console.error(err);
      return navigate('/error', { replace: true });
    }
  };

  const deleteTodoItem = async (_id: string) => {
    if (confirm('삭제하시겠습니까?')) {
      const response = await axios.delete<TodoResponse>(
        `http://localhost:33088/api/todolist/${_id}`
      );
      if (response.data.ok) {
        return navigate('/', { replace: true });
      }
      alert('삭제 실패했습니다.');
    }
  };

  const handleDelete = (_id: string | undefined) => {
    if (_id) {
      deleteTodoItem(_id);
    } else {
      return navigate('/error', { replace: true });
    }
  };

  useEffect(() => {
    if (!_id) {
      setTodoItem(null);
      return navigate('/error', { replace: true });
    }
    getTodoItem(_id);
  }, []);

  return (
    <DetailContainer>
      <DetailHeader id="header">
        <h2>{todoItem?.title}</h2>
        <p>{todoItem?.updatedAt}</p>
      </DetailHeader>
      <DetailMain id="main">
        <p>{todoItem?.content}</p>
      </DetailMain>
      <DetailFooter>
        <Link to={`/update/${todoItem?._id}`}>수정</Link>
        <button onClick={() => handleDelete(todoItem?._id.toString())}>삭제</button>
      </DetailFooter>
    </DetailContainer>
  );
};

export default TodoInfo;

const DetailContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  height: 670px;
  background-color: #555555;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const DetailHeader = styled.section`
  background-color: white;
  border-radius: 10px;
  padding: 10px 20px;

  & h2 {
    font-size: 26px;
    font-weight: 400;
  }

  & p {
    font-size: 10px;
  }
`;

const DetailMain = styled.section`
  background-color: white;
  flex: 1;
  max-height: 80%;
  overflow-y: auto;

  padding: 20px;
  border-radius: 10px;

  p {
    &:first-child {
      display: block;
      height: 95%;
    }
  }
`;

const DetailFooter = styled.section`
  display: flex;
  gap: 10px;
  justify-content: space-between;

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    flex: 1;
    border-radius: 7px;
    border: 0;
    font-size: 30px;
    font-weight: bold;
    background-color: white;
    color: black;

    cursor: pointer;

    &:visited {
      color: black;
    }
    &:hover {
      background-color: #555555;
      color: white;
      border: 1px solid white;
    }
  }

  & button {
    height: 50px;
    flex: 1;
    border-radius: 7px;
    border: 0;
    font-size: 30px;
    font-weight: bold;
    background-color: white;
    color: #b30000;
    cursor: pointer;

    &:focus {
      outline-style: none;
      box-shadow: none;
      border-color: transparent;
    }
    &:hover {
      background-color: #b30000;
      color: white;
      border: 1px solid white;
    }
  }
`;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useParams, useNavigate } from 'react-router-dom';

const TodoUpdate = () => {
  const [todo, setTodo] = useState({ title: '', content: '', updatedAt: '' });
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:33088/api/todolist/${_id}`);
        setTodo({
          title: response.data.item.title,
          content: response.data.item.content,
          updatedAt: response.data.item.updatedAt,
        });
      } catch (err) {
        console.error(err);
        alert('항목을 불러오는 데 실패했습니다.');
      }
    };
    fetchTodo();
  }, [_id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:33088/api/todolist/${_id}`, {
        title: todo.title,
        content: todo.content,
      });
      alert('수정되었습니다.');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('서버 오류!');
    }
  };
  return (
    <Content>
      <DetailForm id="detail" onSubmit={handleSubmit}>
        <DetailTitle
          autoFocus
          required
          value={todo.title}
          placeholder="제목을 입력해주세요."
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <DetailTextArea
          name="content"
          placeholder="내용을 입력해주세요."
          value={todo.content}
          onChange={(e) => setTodo({ ...todo, content: e.target.value })}
        />
        <DetailFooter>
          <button type="submit">수정하기</button>
          <Link to={`/info?_id=${_id}`}>돌아가기</Link>
        </DetailFooter>
      </DetailForm>
    </Content>
  );
};

export default TodoUpdate;

const Content = styled.div`
  width: 100%;
  padding: 10px;
  height: 670px;
  background-color: #555555;
  border-radius: 10px;
`;

const DetailForm = styled.form`
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 10px;
`;

const DetailTitle = styled.input`
  background-color: white;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  padding: 10px;
`;

const DetailTextArea = styled.textarea`
  width: 100%;
  resize: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  flex: 1;
  padding: 10px;
  border-radius: 10px;
`;

const DetailFooter = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;

  & > button,
  a {
    height: 50px;
    flex: 1;
    border-radius: 7px;
    border: 0;
    font-size: 30px;
    font-weight: bold;
    background-color: white;
    text-decoration: none;
    color: black;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > button:focus,
  a:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }

  & > button:hover,
  a:hover {
    background-color: #555;
    color: white;
    border: 1px solid white;
  }
`;

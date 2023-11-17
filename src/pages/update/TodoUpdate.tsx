import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useNavigate } from 'react-router-dom';
import instance from '@/api/instance';

const TodoUpdate = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  const fetchTodoItem = async (_id: string) => {
    try {
      const response = await instance.get<TodoResponse>(`/${_id}`);
      const { title, content } = response.data.item;
      setTitleInput(title);
      setContentInput(content);
    } catch (err) {
      console.error(err);
      alert('항목을 불러오는 데 실패했습니다.');
      return navigate('/', { replace: true });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      instance.patch<TodoResponse>(`/${_id}`, {
        title: titleInput,
        content: contentInput,
      });
      alert('수정되었습니다.');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    if (!_id) return navigate('/', { replace: true });
    fetchTodoItem(_id);
  }, []);

  return (
    <Content>
      <DetailForm id="detail" onSubmit={handleSubmit}>
        <DetailTitle
          autoFocus
          required
          value={titleInput}
          placeholder="제목을 입력해주세요."
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <DetailTextArea
          name="content"
          placeholder="내용을 입력해주세요."
          value={contentInput}
          onChange={(e) => setContentInput(e.target.value)}
        />
        <DetailFooter>
          <button type="submit">수정하기</button>
          <Link to={`/info/${_id}`}>돌아가기</Link>
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

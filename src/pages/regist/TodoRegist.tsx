import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import instance from '@/api/instance';

const TodoRegist = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await instance.post('', { title, content });
      alert('할일이 등록되었습니다!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('등록에 실패하였습니다.');
    }
  };

  return (
    <Content>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="제목을 입력해주세요."
          required
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="내용을 입력해주세요."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <SubmitButton type="submit">등록 완료</SubmitButton>
      </Form>
    </Content>
  );
};

export default TodoRegist;

const Content = styled.div`
  width: 100%;
  padding: 10px;
  height: 670px;
  background-color: #555555;
  border-radius: 10px;
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  border: 0;
  row-gap: 10px;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
`;

const Input = styled.input`
  font-size: 20px;
  width: 360px;
  height: 52px;
  border-radius: 10px;
  border: 0;
  padding-left: 15px;
  padding-right: 15px;
`;

const Textarea = styled.textarea`
  padding: 15px;
  width: 360px;
  height: 100%;
  border: 0;
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
`;

const SubmitButton = styled.button`
  width: 360px;
  height: 70px;
  border-radius: 10px;
  border: 0;
  font-size: 30px;
  font-weight: bold;
  color: #555555;
  cursor: pointer;
`;

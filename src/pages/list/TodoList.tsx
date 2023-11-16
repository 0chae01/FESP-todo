import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RedArrowIcon from '@/assets/RedArrowIcon';
import FilterButton from '@/components/FilterButton';
import { useRecoilValue } from 'recoil';
import { todoFilterAtom } from '@/recoil/atom';

const TodoList = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const filter = useRecoilValue(todoFilterAtom);

  const getTodoList = async () => {
    try {
      const response = await axios.get<TodoListResponse>('http://localhost:33088/api/todolist');
      setTodoList(response.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  const patchTodoList = async (_id: number, done: boolean) => {
    try {
      const response = await axios.patch<TodoResponse>(
        `http://localhost:33088/api/todolist/${_id}`,
        {
          done: !done,
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const toggleCheckbox = async (_id: number, done: boolean) => {
    const data = await patchTodoList(_id, done);
    if (data) {
      getTodoList();
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      <div>
        <FilterButton value={'All'} />
        <FilterButton value={'ing'} />
        <FilterButton value={'Done'} />
      </div>
      <TodoListContainer>
        <RegistButton to={'/regist'}>+</RegistButton>
        <ul>
          {todoList
            ?.filter((todoItem) => {
              if (filter === 'ing') return !todoItem.done;
              if (filter === 'Done') return todoItem.done;
              else return true;
            })
            .map((todoItem) => (
              <TodoItem key={todoItem._id} className={todoItem.done ? 'done' : ''}>
                <div onClick={() => toggleCheckbox(todoItem._id, todoItem.done)}>
                  <input type="checkbox" id="checkbox" className={todoItem.done ? 'done' : ''} />
                  {todoItem.done ? <RedArrowIcon /> : null}
                </div>
                <Link to={`/info?_id=${todoItem._id}`}>{todoItem.title}</Link>
              </TodoItem>
            ))}
        </ul>
      </TodoListContainer>
    </>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  width: 100%;
  height: 600px;
  padding: 10px;
  background-color: #555555;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  ul {
    margin: 0;
    padding: 0;
    overflow-y: scroll;
    height: 90%;
    border-radius: 5px;
  }
`;

const TodoItem = styled.li`
  width: 100%;
  height: 52px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding-left: 8px;
  margin-bottom: 15px;
  font-weight: 300;
  font-size: 18px;
  position: relative;

  input[type='checkbox'] {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #555;
    appearance: none;
    cursor: pointer;
    display: flex;
  }
  a {
    color: black;
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: auto;
    text-overflow: ellipsis;
    text-decoration: none;
    margin-left: 10px;
  }

  &.done > a {
    text-decoration: line-through;
    color: white;
    text-decoration-color: #9c0000;
  }

  &.done {
    background-color: #555555;
    border: 1px solid white;
  }
`;

const RegistButton = styled(Link)`
  width: 100%;
  padding-bottom: 6px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid white;
  font-size: 40px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #555555;
  background-color: #efefef;
  cursor: pointer;

  &:hover {
    background-color: #555555;
    color: white;
    border: 1px solid white;
  }

  &:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }
`;

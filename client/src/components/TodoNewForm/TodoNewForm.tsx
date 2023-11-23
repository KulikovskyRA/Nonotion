import { Button, Input } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useNewTodoMutation } from '../../redux/services/todoService';

const TodoNewForm = () => {
  const [newTodo] = useNewTodoMutation();
  const [innerValue, setInnerValue] = useState('');

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setInnerValue(event.target.value);
  }

  function createTodo() {
    newTodo({ inner: innerValue });
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        minWidth: 330,
      }}
    >
      <Input
        value={innerValue}
        placeholder="Суть задачи"
        onChange={changeHandler}
      />
      <Button type="primary" onClick={createTodo}>
        Создать
      </Button>
    </div>
  );
};

export default TodoNewForm;

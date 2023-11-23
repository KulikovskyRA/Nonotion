import React from 'react';
import { todoAPI } from '../../redux/todoService';

const TodoList = () => {
  const { data } = todoAPI.useAllMyTodosQuery();
  return <div>TodoList</div>;
};

export default TodoList;

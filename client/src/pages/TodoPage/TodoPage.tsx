import React from 'react';
import TodoList from '../../components/TodoList/TodoList';
import TodoNewForm from '../../components/TodoNewForm/TodoNewForm';
import { Layout } from 'antd';

const TodoPage = () => {
  return (
    <Layout
      style={{
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 30,
        paddingTop: 5,
      }}
    >
      <TodoNewForm />
      <TodoList />
    </Layout>
  );
};

export default TodoPage;

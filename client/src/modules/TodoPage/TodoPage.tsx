import TodoTabs from './components/TodoTabs/TodoTabs';
import TodoNewForm from './components/TodoNewForm/TodoNewForm';
import { Layout } from 'antd';

const TodoPage = () => {
  return (
    <Layout
      style={{
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        paddingTop: 31,
      }}
    >
      <TodoNewForm />
      <TodoTabs />
    </Layout>
  );
};

export default TodoPage;

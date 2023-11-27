import { todoAPI } from '../../redux/services/todoService';
import { Tabs, TabsProps } from 'antd';

import TodoList from '../TodoList/TodoList';

const TodoTabs = () => {
  const { data } = todoAPI.useAllMyTodosQuery();
  const { doneTodos, undoneTodos } = todoAPI.useAllMyTodosQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      doneTodos: data?.filter((todo) => todo.isDone),
      undoneTodos: data?.filter((todo) => !todo.isDone),
    }),
  });

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'All Todos',
      children: <TodoList todos={data} />,
    },
    {
      key: '2',
      label: 'Done',
      children: <TodoList todos={doneTodos} />,
    },
    {
      key: '3',
      label: 'Undone',
      children: <TodoList todos={undoneTodos} />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" centered items={items} />
    </>
  );
};

export default TodoTabs;

import { todoAPI } from '../../../../redux/services/todoService';
import { Tabs, TabsProps } from 'antd';

import TodoList from '../TodoList/TodoList';
import {
  CheckOutlined,
  CloseOutlined,
  FolderViewOutlined,
} from '@ant-design/icons';

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
      label: (
        <>
          <FolderViewOutlined />
          Все задачи
        </>
      ),
      children: <TodoList todos={data} />,
    },
    {
      key: '2',
      label: (
        <>
          <CheckOutlined />
          Выполненные
        </>
      ),
      children: <TodoList todos={doneTodos} />,
    },
    {
      key: '3',
      label: (
        <>
          <CloseOutlined />
          Не выполненные
        </>
      ),
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

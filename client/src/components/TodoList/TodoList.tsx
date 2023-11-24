import { todoAPI } from '../../redux/services/todoService';
import { List, Tabs, TabsProps } from 'antd';
import { ITodo } from '../../types/types';

const TodoList = () => {
  const { data } = todoAPI.useAllMyTodosQuery();
  const { doneTodos, undoneTodos } = todoAPI.useAllMyTodosQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      doneTodos: data?.filter((todo) => todo.isDone),
      undoneTodos: data?.filter((todo) => !todo.isDone),
    }),
  });

  // console.log('data--->', data);
  // console.log('done--->', doneTodos);
  // console.log('undone--->', undoneTodos);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'All Todos',
      children: (
        <List
          style={{ minWidth: 350 }}
          itemLayout="horizontal"
          dataSource={data}
          pagination={{
            align: 'center',
            position: 'bottom',
            pageSize: 8,
            hideOnSinglePage: true,
          }}
          renderItem={(todo: ITodo) => (
            <List.Item key={todo.id}>{todo.inner}</List.Item>
          )}
        />
      ),
    },
    {
      key: '2',
      label: 'Done',
      children: (
        <List
          style={{ minWidth: 350 }}
          itemLayout="horizontal"
          dataSource={doneTodos}
          pagination={{
            align: 'center',
            position: 'bottom',
            pageSize: 8,
            hideOnSinglePage: true,
          }}
          renderItem={(todo) => (
            <List.Item key={todo.id}>{todo.inner}</List.Item>
          )}
        />
      ),
    },
    {
      key: '3',
      label: 'Undone',
      children: (
        <List
          style={{ minWidth: 350 }}
          itemLayout="horizontal"
          dataSource={undoneTodos}
          pagination={{
            align: 'center',
            position: 'bottom',
            pageSize: 8,
            hideOnSinglePage: true,
          }}
          renderItem={(todo) => (
            <List.Item key={todo.id}>{todo.inner}</List.Item>
          )}
        />
      ),
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" centered items={items} />
    </>
  );
};

export default TodoList;

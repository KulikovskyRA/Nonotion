import { List, Checkbox } from 'antd';
import { ITodo, ITodosProps } from '../../types/types';
import { useUpdateTodoMutation } from '../../redux/services/todoService';

const TodoList = ({ todos }: ITodosProps) => {
  const [updateTodo] = useUpdateTodoMutation();
  const changeCheckBox = (todoId: number) => {
    updateTodo({ id: todoId });
  };

  return (
    <List
      style={{ minWidth: 350 }}
      itemLayout="horizontal"
      dataSource={todos}
      pagination={{
        align: 'center',
        position: 'bottom',
        pageSize: 8,
        hideOnSinglePage: true,
      }}
      renderItem={(todo: ITodo) => (
        <List.Item key={todo.id} style={{ paddingLeft: 10 }}>
          <Checkbox
            checked={todo.isDone}
            onChange={() => changeCheckBox(todo.id)}
          >
            {todo.inner}
          </Checkbox>
        </List.Item>
      )}
    />
  );
};

export default TodoList;

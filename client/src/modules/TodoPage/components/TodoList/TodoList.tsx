import { List, Checkbox, Button, Modal, Input } from 'antd';
import { IChangeTodo, ITodo, ITodosProps } from '../../../../types/types';
import {
  useDeleteTodoMutation,
  useUpdateTodoInnerMutation,
  useUpdateTodoStatusMutation,
} from '../../../../redux/services/todoService';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { ChangeEvent, useState } from 'react';

const TodoList = ({ todos }: ITodosProps) => {
  const [updateTodoStatus] = useUpdateTodoStatusMutation();
  const [updateTodoInner] = useUpdateTodoInnerMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const updateTodoStatusHandler = (todoId: number) => {
    updateTodoStatus({ id: todoId });
  };

  const deleteTodoHandler = (todoId: number) => {
    deleteTodo({ id: todoId });
  };

  const [modal, setModal] = useState({ id: 0, inner: '' });

  const modalHandler = (id: number, inner: string) => {
    setModal({ id, inner });
  };

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setModal((prev) => ({ ...prev, inner: event.target.value }));
  }

  const updateTodoInnerHandler = ({ id, inner }: IChangeTodo) => {
    updateTodoInner({ id, inner });
    setModal({ id: 0, inner: '' });
  };

  return (
    <List
      style={{ minWidth: 350 }}
      itemLayout="horizontal"
      dataSource={todos}
      pagination={{
        align: 'center',
        position: 'bottom',
        pageSize: 7,
        hideOnSinglePage: true,
      }}
      renderItem={(todo: ITodo) => (
        <>
          <List.Item
            key={todo.id}
            style={{ paddingLeft: 10, paddingRight: 10 }}
          >
            <Checkbox
              checked={todo.isDone}
              onChange={() => updateTodoStatusHandler(todo.id)}
            >
              {todo.inner}
            </Checkbox>
            <div>
              <Button
                onClick={() => modalHandler(todo.id, todo.inner)}
                type="link"
                icon={<EditFilled />}
                shape="circle"
              />
              <Button
                onClick={() => deleteTodoHandler(todo.id)}
                type="link"
                danger
                icon={<DeleteFilled />}
                shape="circle"
              />
            </div>
          </List.Item>
          <Modal
            closeIcon={false}
            style={{ maxWidth: 400 }}
            centered={true}
            footer={null}
            open={modal?.id !== 0}
            onCancel={() => modalHandler(0, '')}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                minWidth: 350,
              }}
            >
              <Input
                value={modal.inner}
                placeholder="Суть задачи"
                onChange={changeHandler}
                onPressEnter={() => updateTodoInnerHandler(modal)}
              />
              <Button
                type="primary"
                onClick={() => updateTodoInnerHandler(modal)}
              >
                Изменить
              </Button>
            </div>
          </Modal>
        </>
      )}
    />
  );
};

export default TodoList;

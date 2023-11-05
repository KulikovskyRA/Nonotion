import { Button, Flex, Form, Input } from 'antd';

// import { useState } from 'react';
import { IAccountModalHandlerProps } from '../../types/types';

const FormLogin = ({ accountModalHandler }: IAccountModalHandlerProps) => {
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Flex justify="center" gap="large">
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            onClick={() => accountModalHandler(true, 'register')}
            type="link"
          >
            Нет аккаунта?
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default FormLogin;

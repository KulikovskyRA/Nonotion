import { Alert, Button, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import {
  IAccountModalHandlerProps,
  ILoginFormValues,
} from '../../../../types/types';

import { useLoginMutation } from '../../../../redux/services/authService';
import { useState } from 'react';

const FormLogin = ({ accountModalHandler }: IAccountModalHandlerProps) => {
  console.log('---> FormLogin');

  const [errorAlert, setErrorAlert] = useState({
    status: false,
    errorInfo: '',
  });

  const [login] = useLoginMutation();

  function onFinish(values: ILoginFormValues) {
    setErrorAlert((prev) => ({ ...prev, status: false }));
    login(values)
      .unwrap()
      .then(() => accountModalHandler(false, 'login'))
      .catch((error) =>
        setErrorAlert({ status: true, errorInfo: error?.data?.type })
      );
  }

  return (
    <>
      {errorAlert.status && (
        <Alert
          style={{ marginBottom: '20px' }}
          message={errorAlert.errorInfo}
          type="error"
          showIcon
          data-testid="alert"
        />
      )}
      <Form
        data-testid="Form"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Введите свой псевдоним!' }]}
        >
          <Input
            data-testid="Login"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Логин"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password
            data-testid="Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Пароль"
          />
        </Form.Item>

        <Flex justify="center" gap="large">
          <Form.Item>
            <Button
              onClick={() => accountModalHandler(true, 'register')}
              type="link"
            >
              Нет аккаунта?
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </>
  );
};

export default FormLogin;

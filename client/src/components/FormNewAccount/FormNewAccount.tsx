import { Alert, Button, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  IAccountModalHandlerProps,
  IRegisterFormValues,
} from '../../types/types';
import { useNewAccMutation } from '../../services/authService';
import { useState } from 'react';

const FormNewAccount = ({ accountModalHandler }: IAccountModalHandlerProps) => {
  console.log('---> FormNewAccount');

  const [errorAlert, setErrorAlert] = useState({
    status: false,
    errorInfo: '',
  });
  const [newAcc] = useNewAccMutation();

  async function onFinish(values: IRegisterFormValues) {
    const result = await newAcc(values);
    if (result.error) {
      // console.log(result.error.data.type);
      setErrorAlert({ status: true, errorInfo: result.error.data.type });
    } else accountModalHandler(false, 'register');
  }
  return (
    <>
      {errorAlert.status && (
        <Alert
          style={{ marginBottom: '20px' }}
          message={errorAlert.errorInfo}
          type="error"
          showIcon
        />
      )}
      <Form
        name="basic"
        wrapperCol={{ span: 16 }}
        style={{ width: 500, maxWidth: 520 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Введите свой псевдоним!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Логин"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Повторите пароль!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают!'));
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Повторите пароль"
          />
        </Form.Item>

        <Flex justify="start" gap="large">
          <Form.Item>
            <Button
              onClick={() => accountModalHandler(true, 'login')}
              type="link"
            >
              Есть аккаунт?
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

export default FormNewAccount;

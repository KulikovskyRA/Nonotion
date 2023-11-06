import { Button, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { IAccountModalHandlerProps, ILoginFormValues } from '../../types/types';
import { useDispatch } from 'react-redux';
import { authReducer } from '../../redux/authSlice';

const FormLogin = ({ accountModalHandler }: IAccountModalHandlerProps) => {
  const dispatch = useDispatch();
  console.log('---> FormLogin');

  async function onFinish(values: ILoginFormValues) {
    try {
      const response: Response = await fetch(
        import.meta.env.VITE_URL + 'auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        accountModalHandler(false, 'login');
        const { user } = await response.json();

        dispatch(authReducer(user));
      }
    } catch (err) {
      console.log('Logout error:', err);
    }
  }

  return (
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

      <Flex justify="start" gap="large">
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
  );
};

export default FormLogin;

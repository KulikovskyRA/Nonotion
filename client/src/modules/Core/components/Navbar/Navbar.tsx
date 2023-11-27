import { Layout, Menu, Button, Modal } from 'antd';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { PoweroffOutlined } from '@ant-design/icons';
import FormLogin from '../FormLogin/FormLogin';
import FormNewAccount from '../FormNewAccount/FormNewAccount';

import type { MenuProps } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;
const { Header } = Layout;

import { capitalize } from 'lodash';

import {
  authAPI,
  useLogoutMutation,
} from '../../../../redux/services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const {
    data,
    // error, isLoading
  } = authAPI.useCheckAuthQuery();

  console.log('---> Navbar - рендеринг');

  //! мутации

  const [
    logout,
    // { isLoading: isUpdating }
  ] = useLogoutMutation();

  function logoutFunction(): void {
    logout('');
    //! //! //!
    navigate(0);
  }

  const location = useLocation();

  const [accountModal, setAccountModal] = useState({
    state: false,
    type: 'login',
  });

  function accountModalHandler(state: boolean, type: string) {
    setAccountModal({ state, type });
  }

  const items: MenuProps['items'] = [
    {
      label: <Link to="/">Home</Link>,
      key: '1',
    },
    {
      label: <Link to={`/users/${data?.user.id || 0}`}>Profile</Link>,
      key: '2',
    },
    {
      label: <Link to={`/mytodos`}>Todos</Link>,
      key: '3',
    },
  ];

  return (
    <>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: 'white',
        }}
      >
        <Menu
          theme="light"
          mode="horizontal"
          style={{ minWidth: '230px' }}
          // ! Если находимся на странице юзера, то дефолтный пункт меню будет там же
          defaultSelectedKeys={
            location.pathname.includes('mytodos')
              ? ['3']
              : location.pathname.includes('users')
              ? ['2']
              : ['1']
          }
          items={items}
        />

        {!data?.user?.id ? (
          <div data-testid="authNone" style={{ minWidth: '60px' }}>
            <Button
              onClick={() => accountModalHandler(true, 'login')}
              type="primary"
              style={{ marginRight: '10px' }}
            >
              Вход
            </Button>
            <Button onClick={() => accountModalHandler(true, 'register')}>
              Регистрация
            </Button>
          </div>
        ) : (
          <div data-testid="authYes" style={{ minWidth: '60px' }}>
            <Text
              style={{
                color: 'black',
                paddingRight: '10px',
              }}
            >
              {capitalize(data.user.name)}
            </Text>
            <Button
              type="link"
              onClick={() => logoutFunction()}
              icon={<PoweroffOutlined />}
            />
          </div>
        )}
      </Header>

      <Modal
        style={{ maxWidth: 400 }}
        centered={true}
        footer={null}
        title={
          accountModal.type === 'login'
            ? 'Войти в аккаунт!'
            : 'Зарегистрироваться'
        }
        open={accountModal.state}
        onCancel={() => accountModalHandler(false, 'login')}
      >
        {accountModal.type === 'login' ? (
          <FormLogin accountModalHandler={accountModalHandler} />
        ) : (
          <FormNewAccount accountModalHandler={accountModalHandler} />
        )}
      </Modal>
    </>
  );
};

export default Navbar;

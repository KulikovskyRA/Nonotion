import { Layout, Menu, Button, Modal } from 'antd';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { PoweroffOutlined } from '@ant-design/icons';
import FormLogin from '../FormLogin/FormLogin';
import FormNewAccount from '../FormNewAccount/FormNewAccount';

import type { MenuProps } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;
const { Header } = Layout;

import { capitalize } from 'lodash';
import { authAPI, useLogoutMutation } from '../../services/authService';

const Navbar = () => {
  const {
    data,
    // error, isLoading
  } = authAPI.useCheckAuthQuery('');

  console.log('---> Navbar');

  //! мутации

  const [
    logout,
    // { isLoading: isUpdating }
  ] = useLogoutMutation();

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
  ];

  return (
    <>
      <Layout>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            // ! Если находимся на странице юзера, то дефолтный пункт меню будет там же
            defaultSelectedKeys={
              location.pathname.includes('users') ? ['2'] : ['1']
            }
            items={items}
          />

          {!data?.user?.id ? (
            <div>
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
            <div>
              <Text
                style={{
                  color: 'white',
                  paddingRight: '10px ',
                }}
                strong
                italic
              >
                {capitalize(data.user.name)}
              </Text>
              <Button
                type="link"
                onClick={() => logout('')}
                icon={<PoweroffOutlined />}
              />
            </div>
          )}
        </Header>
      </Layout>

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
        // onOk={handleOk}
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

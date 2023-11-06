import { Layout, Menu, Button, Modal } from 'antd';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { PoweroffOutlined } from '@ant-design/icons';
import FormLogin from '../FormLogin/FormLogin';
import FormNewAccount from '../FormNewAccount/FormNewAccount';
import { useDispatch, useSelector } from 'react-redux';
import { authReducer } from '../../redux/authSlice';
import { RootState } from '../../redux/store';

import type { MenuProps } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;
const { Header } = Layout;

import { capitalize } from 'lodash';

const Navbar = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store: RootState) => store.authSlice);

  console.log('---> Navbar');

  const logoutHandler = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        import.meta.env.VITE_URL + 'auth/logout',
        {
          credentials: 'include',
        }
      );

      if (response.ok) {
        dispatch(authReducer({ id: 0, name: '' }));
      }
    } catch (err) {
      console.log('Logout error:', err);
    }
  };

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
      label: (
        <>
          <Link to="/">Home</Link>
        </>
      ),
      key: '1',
    },
    {
      label: <Link to={`/users/${userData.id || 0}`}>Profile</Link>,
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
          {!userData.id ? (
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
                {capitalize(userData.name)}
              </Text>
              <Button
                type="link"
                onClick={logoutHandler}
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

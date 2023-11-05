import { Layout, Menu, Button, Modal } from 'antd';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IUserDataProps } from '../../types/types';
import { PoweroffOutlined } from '@ant-design/icons';
import FormLogin from '../FormLogin/FormLogin';
import FormNewAccount from '../FormNewAccount/FormNewAccount';

const { Header } = Layout;

const Navbar = ({ userData }: IUserDataProps) => {
  // console.log('userDataNavbar', userData);

  const logoutHandler = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        import.meta.env.VITE_URL + 'auth/logout',
        {
          credentials: 'include',
        }
      );

      //? Возможно и так сработает удаление сессии
      // if (response.ok) {
      //   // window.location.href = '/';

      // }
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

  return (
    <>
      <Layout>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            // backgroundColor: 'white',
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            // ! Если находимся на странице юзера, то дефолтный пункт меню будет там же
            defaultSelectedKeys={
              location.pathname.includes('users') ? ['2'] : ['1']
            }
          >
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={`/users/${userData.id || 0}`}>Profile</Link>
            </Menu.Item>
          </Menu>

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
              <Button
                onClick={() => accountModalHandler(true, 'register')}
                type="primary"
                style={{ marginRight: '10px' }}
              >
                Sign in
              </Button>
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
          <FormNewAccount />
        )}
      </Modal>
    </>
  );
};

export default Navbar;

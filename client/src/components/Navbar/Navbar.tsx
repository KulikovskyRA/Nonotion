import { Layout, Menu, Button, Modal } from 'antd';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
  //! Потом сделаю айдишник человека
  const [number, setNumber] = useState(Math.round(Math.random() * 10));

  const location = useLocation();
  //   console.log(location);

  const [accountModal, setAccountModal] = useState({
    state: false,
    type: 'login',
  });

  //   setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }

  const accountModalHandler = () => {
    setAccountModal((prev) => ({ ...prev, state: !prev.state }));
    console.log(accountModal);
  };

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
            defaultSelectedKeys={
              location.pathname.includes('users') ? ['2'] : ['1']
            }
          >
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={`/users/${number}`}>Profile</Link>
            </Menu.Item>
          </Menu>
          <div>
            <Button
              onClick={accountModalHandler}
              type="primary"
              style={{ marginRight: '10px' }}
            >
              Sign in
            </Button>
            <Button>Sign up</Button>
          </div>
        </Header>
      </Layout>
      <Modal
        title="Basic Modal"
        open={accountModal.state}
        // onOk={handleOk}
        onCancel={accountModalHandler}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Navbar;

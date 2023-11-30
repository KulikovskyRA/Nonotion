import { useParams } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';
import NewNoteFolder from './components/NewNoteFolder/NewNoteFolder';

const { Sider, Content } = Layout;

const NotePage = () => {
  const { id } = useParams();

  console.log('---> ProfilePage - рендеринг', id);

  const items: MenuProps['items'] = [
    {
      label: 'Navigation One',
      key: 'mail',
    },
    {
      label: 'Navigation Two',
      key: 'app',

      disabled: true,
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'SubMenu',
    },
  ];

  return (
    <Layout style={{ height: '86vh', padding: 25 }}>
      <Sider
        //! Пока что тема светлая, возможно буду юзать mobx для темы
        theme="light"
        width={250}
      >
        <NewNoteFolder />
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          items={items}
        />
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          items={items}
        />
      </Sider>

      <Content style={{ margin: '0 16px' }}>
        <div style={{ padding: 24, minHeight: 360 }}>Bill is a cat.</div>
      </Content>
    </Layout>
  );
};

export default NotePage;

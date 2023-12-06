import { Layout, Menu, MenuProps } from 'antd';
import NewNoteFolder from './components/NewNoteFolder/NewNoteFolder';
import { folderAPI } from '../../redux/services/folderNoteService';
import { IFolder } from '../../types/types';
import { useState } from 'react';
import {
  BookOutlined,
  BorderOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import FolderContent from './components/FolderContent/FolderContent';

const { Sider, Content } = Layout;

const NotePage = () => {
  const { data } = folderAPI.useAllFoldersQuery('');

  const [folder, setFolder] = useState('all');

  const items: MenuProps['items'] = [
    { label: 'Все заметки', key: 'all', icon: <SnippetsOutlined /> },
    { label: 'Заметки вне папок', key: 'no', icon: <BorderOutlined /> },
  ].concat(
    data?.map((folder: IFolder) => ({
      label: <div>{folder.title}</div>,
      key: `${folder.id}`,
      icon: <BookOutlined />,
    }))
  );

  const chooseFolder: MenuProps['onClick'] = (e) => {
    setFolder(e.key);
  };

  return (
    <Layout style={{ height: '86vh', padding: 25 }}>
      <Sider theme="light" width={250}>
        <NewNoteFolder />
        <Menu
          mode="inline"
          items={items}
          style={{ height: '500px', overflow: 'auto' }}
          onClick={chooseFolder}
        />
      </Sider>

      <Content>
        <FolderContent articleProps={folder} />
      </Content>
    </Layout>
  );
};

export default NotePage;

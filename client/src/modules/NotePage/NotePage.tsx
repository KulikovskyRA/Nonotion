import { Layout, Menu, MenuProps } from 'antd';
import NewNoteFolder from './components/NewNoteFolder/NewNoteFolder';
import { folderAPI } from '../../redux/services/folderNoteService';
import { IFolder } from '../../types/types';
import { useState } from 'react';

const { Sider, Content } = Layout;

const NotePage = () => {
  const { data } = folderAPI.useAllFoldersQuery('');

  const [folder, setFolder] = useState('');

  const items: MenuProps['items'] = [
    { label: 'Все заметки', key: 'all' },
    { label: 'Заметки вне папок', key: 'no' },
  ].concat(
    data?.map((folder: IFolder) => ({
      label: <>{folder.title}</>,
      key: `${folder.id}`,
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

      <Content style={{ margin: '0 16px' }}></Content>
    </Layout>
  );
};

export default NotePage;

import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Input } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useNewFolderMutation } from '../../../../redux/services/folderNoteService';

const NewNoteFolder = () => {
  const [title, setTitle] = useState('');

  const [newFolder] = useNewFolderMutation();

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function createFolder() {
    newFolder({ title });
    setTitle('');
  }

  return (
    <>
      <Flex style={{ padding: 20 }} gap="small">
        <Input
          value={title}
          placeholder="Cоздать папку"
          onChange={changeHandler}
          onPressEnter={createFolder}
        />
        <Button
          type="default"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={createFolder}
        />
      </Flex>
      <Divider style={{ margin: 0, padding: 0 }} />
    </>
  );
};

export default NewNoteFolder;

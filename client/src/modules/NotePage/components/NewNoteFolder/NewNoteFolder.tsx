import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Input } from 'antd';

const NewNoteFolder = () => {
  return (
    <>
      <Flex style={{ padding: 20 }} gap="small">
        <Input
          // value={innerValue}
          placeholder="Cоздать папку"

          // onChange={changeHandler}
          // onPressEnter={createTodo}
        />
        <Button
          type="default"
          shape="circle"
          icon={<PlusOutlined />}
          //   onClick={createTodo}
        />
      </Flex>
      <Divider style={{ margin: 0, padding: 0 }} />
    </>
  );
};

export default NewNoteFolder;

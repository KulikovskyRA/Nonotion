import { Typography } from 'antd';

const { Title } = Typography;

import { Flex } from 'antd';

const PageNotAuth = () => {
  return (
    <Flex gap="small" justify="center" align="center" vertical>
      <Title style={{ fontSize: '210px', margin: 0 }}>403</Title>
      <Title style={{ marginTop: 0 }} level={2}>
        Вы не зарегистрированы, пожалуйста войдите в свой аккаунт или создайте
        новый
      </Title>
    </Flex>
  );
};

export default PageNotAuth;

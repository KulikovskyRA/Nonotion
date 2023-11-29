import { Typography } from 'antd';

import { Link } from 'react-router-dom';

const { Title } = Typography;

import { Flex } from 'antd';

const PageNotFound = () => {
  return (
    <Flex gap="small" justify="center" align="center" vertical>
      <Title style={{ margin: 0 }}>404</Title>
      <Title style={{ marginTop: 0 }} level={2}>
        Страница не существует или была удалена
      </Title>
      <Link to={`/`}>Вернуться на главную</Link>
    </Flex>
  );
};

export default PageNotFound;

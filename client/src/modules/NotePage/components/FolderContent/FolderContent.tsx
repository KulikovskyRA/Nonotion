import { Card, Flex, Spin } from 'antd';
import { folderAPI } from '../../../../redux/services/folderNoteService';
import { IArticle } from '../../../../types/types';

const FolderContent = ({ articleProps }: { articleProps: string }) => {
  const { data, isLoading } = folderAPI.useArticlesOfFolderQuery(articleProps);

  return (
    <Card
      title="Card title"
      bordered={false}
      style={{ marginLeft: 25, overflow: 'auto', maxHeight: '100%' }}
    >
      {isLoading ? (
        <Flex justify="center" align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      ) : (
        data?.map((article: IArticle) => (
          <Card.Grid key={article.id} style={{ textAlign: 'center' }}>
            {article.title}
          </Card.Grid>
        ))
      )}
    </Card>
  );
};

export default FolderContent;

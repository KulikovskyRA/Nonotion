import { Footer } from 'antd/lib/layout/layout';

const FooterComp = () => {
  console.log('Footer - rendering');
  return (
    <Footer
      data-testid="Footer"
      style={{
        backgroundColor: '#001529',
        textAlign: 'center',
        color: 'white',
        padding: 10,
      }}
    >
      Nonotion ©2023 Created by Kulikovsky
    </Footer>
  );
};

export default FooterComp;

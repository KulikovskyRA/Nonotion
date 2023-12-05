import { Footer } from 'antd/lib/layout/layout';

const FooterComp = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <Footer
      data-testid="Footer"
      style={{
        color: darkMode ? 'white' : 'black',
        backgroundColor: darkMode ? '#141414' : 'white',
        textAlign: 'center',
        padding: 8,
      }}
    >
      Nonotion ©2023 Created by Kulikovsky
    </Footer>
  );
};

export default FooterComp;

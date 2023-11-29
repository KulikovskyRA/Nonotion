import './App.scss';

import HomePage from './modules/HomePage/HomePage';

import ProfilePage from './modules/ProfilePage/ProfilePage';

import Navbar from './modules/Core/components/Navbar/Navbar';
import FooterComp from './modules/Core/components/FooterComp/FooterComp';
import { ConfigProvider, Layout, theme } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { Route, Routes } from 'react-router-dom';
import TodoPage from './modules/TodoPage/TodoPage';
import PageNotFound from './modules/Core/components/PageNotFound/PageNotFound';
import { useState } from 'react';
import { BgColorsOutlined } from '@ant-design/icons/lib/icons';

import { FloatButton } from 'antd';
import { authAPI } from './redux/services/authService';
import PageNotAuth from './modules/Core/components/PageNotAuth/PageNotAuth';

function App(): JSX.Element {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem('mode') || 'false')
  );
  function switchMode() {
    !darkMode
      ? localStorage.setItem('mode', 'true')
      : localStorage.setItem('mode', 'false');
    setDarkMode((prev: boolean) => !prev);
  }
  const {
    data,
    // error, isLoading
  } = authAPI.useCheckAuthQuery();
  return (
    <ConfigProvider
      theme={{
        algorithm:
          darkMode === true ? [theme.darkAlgorithm] : [theme.defaultAlgorithm],
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Navbar darkMode={darkMode} />
        <Content style={{ margin: '26px' }}>
          {!data?.user?.id ? (
            <Routes>
              <Route path="*" element={<PageNotAuth />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users/:id" element={<ProfilePage />} />
              <Route path="/mytodos" element={<TodoPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          )}
        </Content>
        <FloatButton onClick={switchMode} icon={<BgColorsOutlined />} />
        <FooterComp darkMode={darkMode} />
      </Layout>
    </ConfigProvider>
  );
}

export default App;

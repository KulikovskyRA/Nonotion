import './App.scss';

import HomePage from './modules/HomePage/HomePage';

import ProfilePage from './modules/ProfilePage/ProfilePage';

import Navbar from './modules/Core/components/Navbar/Navbar';
import FooterComp from './modules/Core/components/FooterComp/FooterComp';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { Route, Routes } from 'react-router-dom';
import TodoPage from './modules/TodoPage/TodoPage';

function App(): JSX.Element {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Navbar />
        <Content style={{ margin: '26px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users/:id" element={<ProfilePage />} />
            <Route path="/mytodos" element={<TodoPage />} />
          </Routes>
        </Content>
        <FooterComp />
      </Layout>
    </>
  );
}

export default App;

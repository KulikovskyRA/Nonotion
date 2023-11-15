import './App.scss';

import HomePage from './pages/HomePage/HomePage';

import ProfilePage from './pages/ProfilePage/ProfilePage';

import Navbar from './components/Navbar/Navbar';
import FooterComp from './components/FooterComp/FooterComp';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { Route, Routes } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Navbar />
        <Content style={{ margin: '26px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users/:id" element={<ProfilePage />} />
          </Routes>
        </Content>
        <FooterComp />
      </Layout>
    </>
  );
}

export default App;

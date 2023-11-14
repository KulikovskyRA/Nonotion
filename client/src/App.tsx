import './App.scss';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import ProfilePage from './pages/ProfilePage/ProfilePage';

import FooterComp from './components/FooterComp/FooterComp';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

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

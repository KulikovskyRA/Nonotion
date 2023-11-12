import './App.scss';
import { Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import Navbar from './components/Navbar/Navbar';
import ProfilePage from './components/ProfilePage/ProfilePage';

function App(): JSX.Element {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:id" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;

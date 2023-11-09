import './App.scss';
import { Route, Routes } from 'react-router-dom';

import MainPage from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';

function App(): JSX.Element {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/users/:id"
          element={<div>Здесь будет страница профиля</div>}
        />
      </Routes>
    </>
  );
}

export default App;

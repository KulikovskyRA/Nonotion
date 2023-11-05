import './App.scss';
import { Route, Routes } from 'react-router-dom';

import MainPage from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { IUserData } from './types/types';

function App(): JSX.Element {
  const [userData, setUserData] = useState<IUserData>({});

  useEffect(() => {
    (async function (): Promise<void> {
      const response: Response = await fetch(
        import.meta.env.VITE_URL + 'auth/',
        { credentials: 'include' }
      );
      if (response.ok) {
        const { user } = await response.json();
        console.log(user);
        setUserData(user);
      }
    })();
  }, []);

  return (
    <>
      <Navbar userData={userData} />

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

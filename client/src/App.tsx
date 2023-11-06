import './App.scss';
import { Route, Routes } from 'react-router-dom';

import MainPage from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { authReducer } from './redux/authSlice';
import { useCustomHook } from './hooks/useCustomHook';

function App(): JSX.Element {
  useCustomHook();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   (async function (): Promise<void> {
  //     const response: Response = await fetch(
  //       import.meta.env.VITE_URL + 'auth/',
  //       { credentials: 'include' }
  //     );
  //     if (response.ok) {
  //       const { user } = await response.json();

  //       dispatch(authReducer(user));
  //     }
  //     console.log('ЗАГРУЗКА');
  //   })();
  // }, []);

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

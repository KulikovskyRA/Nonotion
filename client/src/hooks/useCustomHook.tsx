import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authReducer } from '../redux/authSlice';

export const useCustomHook = () => {
  const dispatch = useDispatch();

  const [result, setResult] = useState({});

  useEffect(() => {
    (async function (): Promise<void> {
      const response: Response = await fetch(
        import.meta.env.VITE_URL + 'auth/',
        { credentials: 'include' }
      );
      if (response.ok) {
        const { user } = await response.json();

        dispatch(authReducer(user));
      }
      console.log('ЗАГРУЗКА');
    })();
  }, []);

  return;
};

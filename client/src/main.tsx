import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './main.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { store } from './redux/store.tsx';
// import { authAPI } from './services/authService.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <ApiProvider api={authAPI}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </ApiProvider> */}
  </Provider>
  // </React.StrictMode>
);
